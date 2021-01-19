const LoginService = require("../services/login");

const loginService = new LoginService();

class LoginController {
    constructor() {}

    async login(req, res) {
        const body = req.body;
        const { email, password } = body;
        const user = {
            email,
            password,
        };
        try {
            const loggedUser = await loginService.login(user);
            res.status(200).send(loggedUser);
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }
}

module.exports = LoginController;
