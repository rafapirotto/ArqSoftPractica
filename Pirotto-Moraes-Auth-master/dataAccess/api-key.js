const Key = require("./models/key");

class ApiKeyRepository {
    constructor() {}

    async save(token) {
        const apiKey = new Key({
            key: token,
        });
        try {
            return await apiKey.save();
        } catch (error) {
            throw Error(error);
        }
    }
    async getApiKey(key) {
        try {
            return await Key.findOne({
                key: key,
            });
        } catch (error) {
            throw Error(error);
        }
    }
}

module.exports = ApiKeyRepository;
