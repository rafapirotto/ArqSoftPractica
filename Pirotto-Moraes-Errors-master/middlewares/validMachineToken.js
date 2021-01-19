const jwt = require("jsonwebtoken");

const checkMachineToken = async (req, res, next) => {
    try {
        const machineToken = req.header("MachineToken");
        if (!machineToken) {
            console.log(
                "Se requiere un MachineToken para acceder a este endpoint."
            );
            res.status(401).send(
                "Se requiere un MachineToken para acceder a este endpoint."
            );
        } else {
            const decodedMachineToken = jwt.verify(
                machineToken,
                process.env.ACCESS_TOKEN_SECRET
            );
            const valid =
                decodedMachineToken.token === process.env.MACHINE_TOKEN;
            if (valid) {
                next();
            } else {
                console.log("Acceso no autorizado.");
                res.status(401).send("Acceso no autorizado.");
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
};

module.exports = checkMachineToken;
