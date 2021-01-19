const ApiKeyService = require("../services/api-key");

const apiKeyService = new ApiKeyService();

class ApiKeyController {
    constructor() {}

    async create(req, res) {
        const body = req.body;
        const organizationName = req.user.organizationName;
        const { name } = body;
        try {
            const token = await apiKeyService.create(name, organizationName);
            res.status(200).send(token);
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    async getApiKey(req, res) {
        const { key } = req.params;
        try {
            const keyToken = await apiKeyService.getApiKey(key);
            res.status(200).send(keyToken);
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }
}

module.exports = ApiKeyController;
