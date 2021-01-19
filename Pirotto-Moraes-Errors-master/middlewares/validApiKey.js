const jwt = require("jsonwebtoken");
const axios = require("axios");

const { getGeneratedMachineToken } = require("../utils/index");

const checkValidApiKey = async (req, res, next) => {
    try {
        const key = req.header("Id");
        if (!key) {
            console.log(
                "Se requiere una API-Key para acceder a este endpoint."
            );
            res.status(401).send(
                "Se requiere una API-Key para acceder a este endpoint."
            );
        } else {
            const decodedKey = jwt.verify(key, process.env.ACCESS_TOKEN_SECRET);
            const machineToken = getGeneratedMachineToken(
                process.env.MACHINE_TOKEN
            );
            const { data: apiKey } = await axios.get(
                `${process.env.AUTH_URL}/api-keys/${key}`,
                {
                    headers: { MachineToken: machineToken },
                }
            );
            if (apiKey) {
                req.organizationName = decodedKey.organizationName;
                next();
            } else {
                console.log("API-key no encontrada.");
                res.status(404).send("API-key no encontrada.");
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
};

module.exports = checkValidApiKey;
