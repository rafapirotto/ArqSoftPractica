const LoginRepository = require("../dataAccess/login");
const { getGeneratedAuthenticationToken } = require("../utils");

const loginRepository = new LoginRepository();

class LoginService {
    constructor() {}

    async login(user) {
        const loggedUser = await loginRepository.login(user);
        const token = getGeneratedAuthenticationToken(loggedUser);
        return { loggedUser, token };
    }
}

module.exports = LoginService;
