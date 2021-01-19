const jwt = require("jsonwebtoken");

const getGeneratedMachineToken = (value) =>
    jwt.sign(
        {
            token: value,
        },
        process.env.ACCESS_TOKEN_SECRET
    );

module.exports = {
    getGeneratedMachineToken,
};
