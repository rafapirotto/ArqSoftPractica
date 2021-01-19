const jwt = require("jsonwebtoken");
const axios = require("axios");

const { getGeneratedMachineToken } = require("../utils/index");

const checkAdminRole = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
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
            if (user.role === "ADMIN") {
                req.user = user;
                req.token = token;
            } else {
                console.log("Acceso no autorizado.");
                res.status(401).send("Acceso no autorizado.");
            }
            next();
        } else {
            console.log("Usuario no encontrado.");
            res.status(404).send("Usuario no encontrado.");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
};

module.exports = checkAdminRole;
