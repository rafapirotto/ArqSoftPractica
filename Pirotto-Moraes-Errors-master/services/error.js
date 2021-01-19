const axios = require("axios");

const ErrorRepository = require("../dataAccess/error");
const utils = require("../utils");
const errorValidator = require("./models/error");
const InvalidInputsError = require("../exceptions/invalidInputs");
const RepeatedDatabaseObjects = require("../exceptions/repeatedDatabaseObjects");

const errorRepository = new ErrorRepository();

class ErrorService {
    constructor() {}

    async add(errorToAdd) {
        this.validateErrorInputs(errorToAdd);
        errorToAdd.creationDate = Date.now();
        errorToAdd.resolutionDate = null;
        return await errorRepository.add(errorToAdd);
    }

    async edit(errorToEdit, id, userOrganizationName) {
        this.validateErrorInputs(errorToEdit);
        await this.validateDatabaseObjects(
            errorToEdit,
            id,
            userOrganizationName
        );
        const dbError = this.getOne(id);
        dbError.title = errorToEdit.title;
        dbError.description = errorToEdit.description;
        dbError.severity = errorToEdit.severity;

        const assignedDeveloperChanged =
        errorToEdit.assignedDeveloper &&
        (dbError.assignedDeveloper !== errorToEdit.assignedDeveloper);
        if (assignedDeveloperChanged) {
            dbError.assignationDate = Date.now();
        }

        dbError.assignedDeveloper = errorToEdit.assignedDeveloper;
        await errorRepository.edit(dbError, id);
    }

    async resolve(id, organizationName) {
        await this.getOne(id, organizationName);
        return await errorRepository.resolve(id);
    }

    async getOne(id, organization) {
        let dbError = await errorRepository.getOne(id);
        if (dbError) {
            if (dbError.organizationName !== organization) {
                throw Error("Ese error no existe en tu organizacion.");
            }
        }
        return dbError;
    }

    async getOne(id) {
        return await errorRepository.getOne(id);
    }

    async getAll(organization, status) {
        if (!status) {
            status = "NO_RESUELTO";
        }
        let errorsWithSeverity = await errorRepository.getAllWithSeverity(
            organization,
            status
        );
        let errorsWithSeverityNull = await errorRepository.getAllWithSeverityNull(
            organization,
            status
        );
        return errorsWithSeverity.concat(errorsWithSeverityNull);
    }

    async getCritics(organization) {
        const status = "NO_RESUELTO";
        let errors = await errorRepository.getAllWithSeverity(
            organization,
            status
        );
        return errors.slice(0, 5);
    }

    validSeverity(severity) {
        if (severity) {
            let range = [1, 2, 3, 4];
            return range.includes(severity);
        } else {
            return true;
        }
    }

    validateErrorInputs(error) {
        const errors = errorValidator.validate(error);
        if (errors.length !== 0) {
            const formatedErrors = utils.formatErrors(errors);
            throw new InvalidInputsError(formatedErrors);
        }
    }

    async validateDatabaseObjects(error, id, userOrganizationName) {
        const errors = [];
        const existingError = await this.validateExistingError(
            id,
            userOrganizationName
        );
        const existingAssignedDeveloper = await this.validateExistingAssignedDeveloper(
            error,
            id
        );
        if (existingError) errors.push(existingError);
        if (existingAssignedDeveloper) errors.push(existingAssignedDeveloper);
        if (errors.length !== 0) throw new RepeatedDatabaseObjects(errors);
    }

    async validateExistingError(id, userOrganizationName) {
        let dbError = await errorRepository.getOne(id);
        if (
            !dbError ||
            (dbError && dbError.organizationName !== userOrganizationName)
        ) {
            const errorReturn = {
                message: "No existe ese error",
                field: "obj",
            };
            return errorReturn;
        }
        return null;
    }

    async validateExistingAssignedDeveloper(error, id) {
        let dbError = await errorRepository.getOne(id);
        if (error.assignedDeveloper) {
            const machineToken = utils.getGeneratedMachineToken(
                process.env.MACHINE_TOKEN
            );
            const { data: user } = await axios.get(
                `${process.env.AUTH_URL}/users/email/${error.assignedDeveloper}`,
                {
                    headers: { MachineToken: machineToken },
                }
            );
            if (
                !user ||
                (user && user.organizationName !== dbError.organizationName)
            ) {
                const error = {
                    message: "No existe ese desarrollador",
                    field: "assignedDeveloper",
                };
                return error;
            }
            return null;
        }
        return null;
    }

    async sendEmails(error) {
        const machineToken = utils.getGeneratedMachineToken(
            process.env.MACHINE_TOKEN
        );
        const {
            data: emails,
        } = await axios.get(
            `${process.env.AUTH_URL}/emails/${error.organizationName}`,
            { headers: { MachineToken: machineToken } }
        );
        emails.forEach(async (email) => {
            let emailObj = {
                to: email,
                subject: "Nuevo error creado.",
                content: this.createEmailContent(error),
            };
            const machineToken = utils.getGeneratedMachineToken(
                process.env.MACHINE_TOKEN
            );
            await axios.post(`${process.env.NOTIFICATIONS_URL}`, emailObj, {
                headers: { MachineToken: machineToken },
            });
        });
    }

    createEmailContent(obj) {
        let content =
            "Titulo: " + obj.title + "\nDescripción: " + obj.description;
        if (obj.severity) {
            content += "\nSeveridad: " + obj.severity;
        }
        return content;
    }

    async notifyUserOfNewErrorAssigned(error) {
        let { title, description, severity, assignedDeveloper } = error;
        const machineToken = utils.getGeneratedMachineToken(
            process.env.MACHINE_TOKEN
        );
        const { data: user } = await axios.get(
            `${process.env.AUTH_URL}/users/email/${assignedDeveloper}`,
            {
                headers: { MachineToken: machineToken },
            }
        );
        const { severities, frequency, on } = user.preferences.newErrorAssigned;
        if (on) {
            if (!severity) severity = null;
            const index = severities.findIndex((sev) => sev === severity);
            if (index > -1) {
                if (!severity) severity = "-";
                const email = {
                    to: user.email,
                    subject: "Se le ha asignado un nuevo error.",
                    content: `Datos del error asignado: \nTítulo: ${title} \nDescripción: ${description} \nSeveridad: ${severity}`,
                };
                const machineToken = utils.getGeneratedMachineToken(
                    process.env.MACHINE_TOKEN
                );
                //caso de querer recibirlo inmediatamente
                if (frequency === -1) {
                    await axios.post(
                        `${process.env.NOTIFICATIONS_URL}`,
                        email,
                        { headers: { MachineToken: machineToken } }
                    );
                }
            }
        }
    }

    async getTwoDaysUnassignedErrors() {
        const unassignedErrors = await errorRepository.getAllUnassignedErrors();
        const daysUnassigned = 2;
        const today = new Date();
        const twoDaysUnassignedErrors = [];
        unassignedErrors.forEach((unassignedError) => {
            const diffTime = Math.abs(today - unassignedError.creationDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays > daysUnassigned) {
                twoDaysUnassignedErrors.push({
                    unassignedError,
                    unresolvedDays: diffDays,
                });
            }
        });
        return twoDaysUnassignedErrors;
    }

    async notifyUsersOfUnassignedErrors() {
        try {
            const unassignedErrors = await this.getTwoDaysUnassignedErrors();
            unassignedErrors.forEach(({ unassignedError, unresolvedDays }) => {
                const severityToSend = unassignedError.severity
                    ? unassignedError.severity
                    : "-";
                const email = {
                    to: unassignedError.assignedDeveloper,
                    subject:
                        "Tiene un error que lleva más de dos días sin ser resuelto.",
                    content: `Datos del error sin resolver: \nTítulo: ${unassignedError.title} \nDescripción: ${unassignedError.description} \nSeveridad: ${severityToSend} \nDías sin resolver: ${unresolvedDays}`,
                };
                const machineToken = utils.getGeneratedMachineToken(
                    process.env.MACHINE_TOKEN
                );
                axios.post(`${process.env.NOTIFICATIONS_URL}`, email, {
                    headers: { MachineToken: machineToken },
                });
            });
        } catch (error) {
            throw Error(error);
        }
    }

    async getBetweenTwoDates(from, to, organization) {
        try {
            return await errorRepository.getBetweenTwoDates(
                new Date(from),
                new Date(to),
                organization
            );
        } catch (error) {
            throw Error(error);
        }
    }

    async getAssignedToday(email, severities) {
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth()+1;
        let year = today.getFullYear();
        let from = year + "-" + month + "-" + day;
        let to = year + "-" + month + "-" + (day + 1);
        try {
            return await errorRepository.getAssignedToday(
                new Date(from),
                new Date(to),
                email,
                severities
            );
        } catch (error) {
            throw Error(error);
        }
    }

    async getUnassignedErrors(organization) {
        try {
            return await errorRepository.getAllUnassignedErrors(organization);
        } catch (error) {
            throw Error(error);
        }
    }
}

module.exports = ErrorService;
