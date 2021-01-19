const RegisterService = require("../services/register");
const RepeatedDatabaseObjects = require("../exceptions/repeatedDatabaseObjects");
const InvalidInputsError = require("../exceptions/invalidInputs");

const registerService = new RegisterService();

class RegisterController {
    constructor() {}

    async register(req, res) {
        const user = this.getUserFromRequest(req);
        try {
            const dbUser = await registerService.registerFromUI(user);
            res.status(200).send(dbUser);
        } catch (error) {
            if (
                error instanceof RepeatedDatabaseObjects ||
                error instanceof InvalidInputsError
            ) {
                console.log(error.errors);
                res.status(403).send(error.errors);
            } else {
                console.log(error.message);
                res.status(500).send(error.message);
            }
        }
    }

    async registerWithInvitation(req, res) {
        const user = this.getUserFromRequest(req);
        user.role = req.body.role;
        try {
            const dbUser = await registerService.registerWithInvitation(user);
            res.status(200).send(dbUser);
        } catch (error) {
            if (
                error instanceof RepeatedDatabaseObjects ||
                error instanceof InvalidInputsError
            ) {
                console.log(error.errors);
                res.status(403).send(error.errors);
            } else {
                console.log(error.message);
                res.status(500).send(error.message);
            }
        }
    }

    getUserFromRequest(req) {
        const {
            name,
            email,
            organizationName,
            password,
            nationality,
        } = req.body;
        const user = {
            name,
            email,
            organizationName,
            password,
            nationality,
        };
        return user;
    }
}

module.exports = RegisterController;
