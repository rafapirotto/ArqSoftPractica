const UserService = require("../services/user");

const userService = new UserService();

class UserController {
    constructor() {}

    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await userService.getUserById(id);
            res.status(200).send(user);
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    async getEmails(req, res) {
        const { organizationName } = req.params;
        try {
            const emails = await userService.getEmails(organizationName);
            res.status(200).send(emails);
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    async getUserByEmail(req, res) {
        const { email } = req.params;
        try {
            const user = await userService.getUserByEmail(email);
            res.status(200).send(user);
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    async editUserPreference(req, res) {
        const { preferences } = req.body;
        const { id } = req.user;
        try {
            const user = await userService.getUserById(id);
            user.preferences = preferences;
            const modifiedUser = await userService.editUserPreference(user);
            userService.scheduleByPreferences(modifiedUser);
            res.status(200).send(modifiedUser.preferences);
        } catch (error) {
            if (error instanceof RangeError) {
                console.log(error.message);
                res.status(403).send(error.message);
            } else {
                console.log(error.message);
                res.status(500).send(error.message);
            }
        }
    }

    async getUserPreferences(req, res) {
        const { id } = req.user;
        try {
            if (!id)
                res.status(403).send(
                    "Se requiere un Token para acceder a este endpoint."
                );
            else {
                const user = await userService.getUserById(id);
                res.status(200).send(user.preferences);
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }
}

module.exports = UserController;
