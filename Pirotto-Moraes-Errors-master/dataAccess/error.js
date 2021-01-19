const ErrorSchema = require("./models/error");

class ErrorRepository {
    constructor() {}

    async add(errorToSave) {
        const error = new ErrorSchema(errorToSave);
        try {
            return await error.save();
        } catch (error) {
            throw Error(error);
        }
    }

    async edit(errorToEdit, id) {
        try {
            return await ErrorSchema.updateOne(
                {
                    _id: id,
                },
                {
                    $set: errorToEdit,
                }
            );
        } catch (error) {
            throw Error(error);
        }
    }

    async resolve(id) {
        try {
            return await ErrorSchema.updateOne(
                {
                    _id: id,
                },
                {
                    $set: {
                        status: "RESUELTO",
                        resolutionDate: Date.now(),
                    },
                }
            );
        } catch (error) {
            throw Error(error);
        }
    }

    async getOne(id) {
        try {
            return await ErrorSchema.findOne({
                _id: id,
            });
        } catch (error) {
            throw Error(error);
        }
    }

    async getAllWithSeverity(organization, status) {
        try {
            return await ErrorSchema.find({
                organizationName: organization,
                status: status,
                severity: { $ne: null },
            }).sort({
                severity: 1,
            });
        } catch (error) {
            throw Error(error);
        }
    }

    async getAllWithSeverityNull(organization, status) {
        try {
            return await ErrorSchema.find({
                organizationName: organization,
                status: status,
                severity: null,
            });
        } catch (error) {
            throw Error(error);
        }
    }

    async getAllUnassignedErrors() {
        try {
            return await ErrorSchema.find({
                status: "NO_RESUELTO",
                assignedDeveloper: { $ne: null },
            });
        } catch (error) {
            throw Error(error);
        }
    }

    async getBetweenTwoDates(from, to, organization) {
        try {
            return await ErrorSchema.find({
                organizationName: organization,
                creationDate: { $gte: from, $lt: to },
            });
        } catch (error) {
            throw Error(error);
        }
    }

    async getAssignedToday(from, to, email, severities) {
        try {
            return await ErrorSchema.find({
                assignedDeveloper: email,
                severity: { $in: severities },
                assignationDate: { $gte: from, $lt: to },
            });
        } catch (error) {
            throw Error(error);
        }
    }

    async getUnassignedErrors(organization) {
        try {
            return await ErrorSchema.find({
                organizationName: organization,
                assignedDeveloper: null,
            });
        } catch (error) {
            throw Error(error);
        }
    }
}

module.exports = ErrorRepository;
