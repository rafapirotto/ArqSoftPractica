const User = require("./models/user");

class UserRepository {
    constructor() {}

    async getAll(organizationName) {
        try {
            return await User.find({
                organizationName: organizationName,
            });
        } catch (error) {
            throw Error(error);
        }
    }

    async getUserByEmail(email) {
        try {
            return await User.findOne({
                email: email,
            });
        } catch (error) {
            throw Error(error);
        }
    }

    async getUserById(id) {
        try {
            return await User.findOne({
                _id: id,
            });
        } catch (error) {
            throw Error(error);
        }
    }

    async editUserPreference(user) {
        try {
            await User.updateOne(
                {
                    _id: user.id,
                },
                {
                    $set: user,
                }
            );
            return this.getUserById(user.id);
        } catch (error) {
            throw Error(error);
        }
    }
}

module.exports = UserRepository;
