const axios = require("axios");
const { getGeneratedMachineToken } = require("../utils");

class ReportService {
    constructor() {}

    async getGeneralReport(from, to, organization) {
        const machineToken = getGeneratedMachineToken(
            process.env.MACHINE_TOKEN
        );
        const { data: errors } = await axios.get(
            `${process.env.ERRORS_URL}/betweenTwoDates/${organization}?from=${from}&to=${to}`,
            {
                headers: { MachineToken: machineToken },
            }
        );
        let resolved = 0;
        let severity = [0, 0, 0, 0, 0];

        errors.forEach((error) => {
            if (error.status == "RESUELTO") {
                resolved++;
            }
            if (error.severity) {
                severity[error.severity]++;
            }
        });

        let report = {
            errores: errors.length,
            errores_resueltos: resolved,
            severidad_1: severity[1],
            severidad_2: severity[2],
            severidad_3: severity[3],
            severidad_4: severity[4],
        };
        return report;
    }

    async getTop10DevelopersReport(organization) {
        const today = new Date();
        const daysBefore = 30;
        let oneMonthAgo = new Date();
        oneMonthAgo.setDate(oneMonthAgo.getDate() - daysBefore);
        const machineToken = getGeneratedMachineToken(
            process.env.MACHINE_TOKEN
        );
        const { data: totalErrors } = await axios.get(
            `${process.env.ERRORS_URL}/betweenTwoDates/${organization}?from=${oneMonthAgo}&to=${today}`,
            {
                headers: { MachineToken: machineToken },
            }
        );
        const resolvedErrors = this.getResolvedErrors(totalErrors);
        const developers = this.getDevelopers(resolvedErrors);
        if (developers.length < 10) {
            return null;
        } else {
            this.countDeveloperErrors(resolvedErrors, developers);
            this.sortDeveloperErrorsCount(developers);
            this.getTopTen(developers);
            return developers;
        }
    }

    async getUnassignedErrors(token) {
        const errorsWithoutAssignedDeveloper = [];
        const daysUnassigned = 2;
        const today = new Date();
        const { data: unassignedErrors } = await axios.get(
            `${process.env.ERRORS_URL}/unassigned`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        unassignedErrors.forEach((unassignedError) => {
            const diffTime = Math.abs(today - unassignedError.creationDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays > daysUnassigned)
                errorsWithoutAssignedDeveloper.push(unassignedError);
        });
        return errorsWithoutAssignedDeveloper;
    }

    getDevelopers = (errors) => {
        const developers = [];
        errors.forEach((error) => {
            const assignedDeveloper = error.assignedDeveloper;
            const developerIndex = developers.findIndex(
                (dev) => dev.assignedDeveloper === assignedDeveloper
            );
            //si no existe lo agrego
            if (developerIndex === -1) {
                developers.push({ assignedDeveloper, count: 0 });
            }
        });
        return developers;
    };

    getResolvedErrors = (errors) => {
        const resolvedErrors = [];
        errors.forEach((error) => {
            if (error.assignedDeveloper && error.status === "RESUELTO")
                resolvedErrors.push(error);
        });
        return resolvedErrors;
    };

    countDeveloperErrors = (resolvedErrors, developers) => {
        resolvedErrors.forEach((error) => {
            const assignedDeveloper = error.assignedDeveloper;
            const index = developers.findIndex((dev) => {
                return dev.assignedDeveloper === assignedDeveloper;
            });
            developers[index].count++;
        });
    };

    sortDeveloperErrorsCount = (developers) =>
        developers.sort((a, b) => b.count - a.count);

    getTopTen = (developers) => (developers.length = 10);
}

module.exports = ReportService;
