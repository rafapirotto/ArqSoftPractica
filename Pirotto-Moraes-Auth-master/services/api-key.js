const ApiKeyRepository = require("../dataAccess/api-key");
const jwt = require("jsonwebtoken");

const apiKeyRepository = new ApiKeyRepository();

class ApiKeyService {
    constructor() {}

    async create(key, organization) {
        const keyObj = {
            key: key,
            organizationName: organization,
        };
        const token = jwt.sign(keyObj, process.env.ACCESS_TOKEN_SECRET);
        await apiKeyRepository.save(token);
        return token;
    }

    async getApiKey(key) {
        try {
            const apiKey = await apiKeyRepository.getApiKey(key);
            return apiKey;
        } catch (error) {
            throw Error(error);
        }
    }
}

module.exports = ApiKeyService;
