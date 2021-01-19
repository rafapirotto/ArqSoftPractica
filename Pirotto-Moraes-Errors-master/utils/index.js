const jwt = require("jsonwebtoken");

const getGeneratedAuthenticationToken = (user) =>
    jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRATION,
        }
    );

const getGeneratedInvitationId = (email, organizationName, role) =>
    jwt.sign(
        {
            email,
            organizationName,
            role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRATION,
        }
    );

const getGeneratedMachineToken = (value) =>
    jwt.sign(
        {
            token: value,
        },
        process.env.ACCESS_TOKEN_SECRET
    );

const formatErrors = (errors) => {
    return errors.map((error) => {
        return { message: error.message, field: error.path };
    });
};

module.exports = {
    getGeneratedAuthenticationToken,
    getGeneratedInvitationId,
    formatErrors,
    getGeneratedMachineToken,
};
