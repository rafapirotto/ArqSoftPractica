const OrganizationRepository = require("../dataAccess/organization");

const organizationRepository = new OrganizationRepository();

class OrganizationService {
    constructor() {}
    
    async getOne(name) {
        return await organizationRepository.getOne(name);
    }

    async getAll() {
        return await organizationRepository.getAll();
    }

    async add(name) {
        return await organizationRepository.add(name);
    }
}

module.exports = OrganizationService;
