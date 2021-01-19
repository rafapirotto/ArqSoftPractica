const ReportService = require("../services/report");

const reportService = new ReportService();

class ReportController {
    constructor() {}

    async getGeneralReport(req, res) {
        try {
            const organization = req.user.organizationName;
            let from = req.query.from;
            let to = req.query.to;
            if (!from || !to){
                res.status(400).send("Las fechas from y to son necesarias");
            }else{
                const report = await reportService.getGeneralReport(
                    from,
                    to,
                    organization
                );
                res.status(200).send(report);
            }

        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    async getTop10DevelopersReport(req, res) {
        const organization = req.user.organizationName;
        try {
            const report = await reportService.getTop10DevelopersReport(organization);
            if (!report) {
                res.status(200).send([]);
            } else {
                res.status(200).send(report);
            }
        } catch (error) {
            console.log(error.message);
            res.status(400).send(error.message);
        }
    }

    async getUnassignedErrors(req, res) {
        try {
            const token = req.token;
            const report = await reportService.getUnassignedErrors(token);
            res.status(200).send(report);
        } catch (error) {
            console.log(error.message);
            res.status(400).send(error.message);
        }
    }
}

module.exports = ReportController;
