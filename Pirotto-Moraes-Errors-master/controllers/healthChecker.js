
const HealthCheckerService = require("../services/healthChecker");

const healthCheckerService = new HealthCheckerService();

class HealthCheckerController {
    constructor() {}

    async check(req, res) {
        try {
            const obj = await healthCheckerService.check();
            res.status(200).send(obj);
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }
}

module.exports = HealthCheckerController;