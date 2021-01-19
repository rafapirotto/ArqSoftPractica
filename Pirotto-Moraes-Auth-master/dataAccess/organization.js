const Organization = require("./models/organization");

class OrganizationRepository {
    constructor() {}

    async getOne(name) {
        try {
            return await Organization.findOne({ organizationName: name });
        } catch (error) {
            throw Error(error);
        }
    }

    async getAll() {
        try {
            return await Organization.find();
        } catch (error) {
            throw Error(error);
        }
    }

    async add(name) {
        const organization = new Organization({
            organizationName: name,
        });
        try {
            return await organization.save();
        } catch (error) {
            throw Error(error);
        }
    }
}

module.exports = OrganizationRepository;
