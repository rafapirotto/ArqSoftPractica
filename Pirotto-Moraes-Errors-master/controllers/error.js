const ErrorService = require("../services/error");

const RepeatedDatabaseObjects = require("../exceptions/repeatedDatabaseObjects");
const InvalidInputsError = require("../exceptions/invalidInputs");

//cache
const NodeCache = require("node-cache");
const myCache = new NodeCache();

const errorService = new ErrorService();

class ErrorController {
    constructor() {}

    async add(req, res) {
        const organizationName = req.organizationName;
        const body = req.body;
        const { title, description, severity } = body;
        const error = {
            title,
            description,
            severity,
            organizationName,
        };
        error.status = "NO_RESUELTO";
        try {
            const dbError = await errorService.add(error);
            errorService.sendEmails(error);
            res.status(200).send(dbError);

            //cache
            const dbErrors = await errorService.getCritics(organizationName);
            myCache.del(organizationName);
            myCache.set(organizationName, dbErrors);
        } catch (err) {
            if (
                err instanceof RepeatedDatabaseObjects ||
                err instanceof InvalidInputsError
            ) {
                console.log(err.errors);
                res.status(403).send(err.errors);
            } else {
                console.log(err.message);
                res.status(500).send(err.message);
            }
        }
    }

    async getCritics(req, res) {
        const organizationName = req.organizationName;
        try {
            let errors = myCache.get(organizationName);
            if (!errors) {
                res.status(400).send(
                    "No hay errores ingresados en el sistema."
                );
            } else {
                res.status(200).send(errors);
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    async edit(req, res) {
        const { id } = req.params;
        const body = req.body;
        const userOrganizationName = req.user.organizationName;
        const { title, description, severity, assignedDeveloper } = body;
        const error = {
            title,
            description,
            severity,
            assignedDeveloper,
        };
        try {
            const dbError = await errorService.getOne(id);
            await errorService.edit(error, id, userOrganizationName);
            const assignedDeveloperChanged =
                assignedDeveloper &&
                dbError.assignedDeveloper !== assignedDeveloper;
            if (assignedDeveloperChanged) {
                errorService.notifyUserOfNewErrorAssigned(error);
            }
            res.status(200).send("Error editado con éxito.");
        } catch (err) {
            if (
                err instanceof RepeatedDatabaseObjects ||
                err instanceof InvalidInputsError
            ) {
                console.log(err.errors);
                res.status(403).send(err.errors);
            } else {
                console.log(err.message);
                res.status(500).send(err.message);
            }
        }
    }

    async resolve(req, res) {
        const organizationName = req.user.organizationName;
        const { id } = req.params;
        try {
            await errorService.resolve(id, organizationName);
            res.status(200).send("Error resuelto con exito.");
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    async getOne(req, res) {
        const organizationName = req.user.organizationName;
        const { id } = req.params;
        try {
            const dbError = await errorService.getOne(id, organizationName);
            res.status(200).send(dbError);
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    async getAll(req, res) {
        const organizationName = req.user.organizationName;
        let status = req.query.status;
        try {
            const dbErrors = await errorService.getAll(
                organizationName,
                status
            );
            res.status(200).send(dbErrors);
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    async getBetweenTwoDates(req, res) {
        const { organization } = req.params;
        const from = req.query.from;
        const to = req.query.to;
        try {
            const dbErrors = await errorService.getBetweenTwoDates(
                from,
                to,
                organization
            );
            res.status(200).send(dbErrors);
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    async getAssignedToday(req, res) {
        const { email } = req.params;
        const {severities} = req.body;
        console.log(req.body);
        console.log(severities);
        try {
            const dbErrors = await errorService.getAssignedToday(email,severities);
            res.status(200).send(dbErrors);
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    async getUnassignedErrors(req, res) {
        const organizationName = req.user.organizationName;
        try {
            const dbErrors = await errorService.getUnassignedErrors(
                organizationName
            );
            res.status(200).send(dbErrors);
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }
}

module.exports = ErrorController;
