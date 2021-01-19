const User = require("./models/user");

class RegisterRepository {
    constructor() {}

    async add(userToSave) {
        const user = new User(userToSave);
        try {
            return await user.save();
        } catch (error) {
            throw Error(error);
        }
    }
}

module.exports = RegisterRepository;
