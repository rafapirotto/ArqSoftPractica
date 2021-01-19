const jwt = require("jsonwebtoken");
const axios = require("axios");

const { getGeneratedMachineToken } = require("../utils/index");

const checkValidToken = async (req, res, next) => {
    try {
        const tokenHeader = req.header("Authorization");
        if (!tokenHeader) {
            const errorMessage =
                "Se requiere de un token en el header para ingresar a este endpoint";
            console.log(errorMessage);
            res.status(403).send(errorMessage);
        } else {
            const token = req.header("Authorization").replace("Bearer ", "");
            const decodedToken = jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET
            );
            const machineToken = getGeneratedMachineToken(
                process.env.MACHINE_TOKEN
            );
            const { data: user } = await axios.get(
                `${process.env.AUTH_URL}/users/${decodedToken.id}`,
                {
                    headers: { MachineToken: machineToken },
                }
            );
            if (user) {
                req.user = user;
                req.token = token;
                next();
            } else {
                console.log("Usuario no encontrado.");
                res.status(404).send("Usuario no encontrado.");
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
};

module.exports = checkValidToken;
