const OrganizationService = require("../services/organization");

const organizationService = new OrganizationService();

class OrganizationController {
    constructor() {}

    async getAll(req, res) {
        try {
            const organizations = await organizationService.getAll();
            res.status(200).send(organizations);
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }
}

module.exports = OrganizationController;
