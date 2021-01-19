const bcrypt = require("bcrypt");

const User = require("./models/user");

class LoginRepository {
    constructor() {}

    async login(userToLog) {
        const { email, password } = userToLog;
        try {
            const dbUser = await User.findOne({ email });
            if (!dbUser || !passwordsMatch(password, dbUser.password)) {
                throw Error("Credenciales inválidas");
            }
            return dbUser;
        } catch (error) {
            throw Error(error);
        }
    }
}

passwordsMatch = (requestPassword, dbPassword) =>
    bcrypt.compareSync(requestPassword, dbPassword);

module.exports = LoginRepository;
