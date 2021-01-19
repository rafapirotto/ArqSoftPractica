const express = require("express");

const validToken = require("../middlewares/validToken");
const validAdmin = require("../middlewares/validAdmin");
const ReportController = require("../controllers/report");

const app = express();
const reportController = new ReportController();

app.get("/general", validToken, (req, res) => {
    reportController.getGeneralReport(req, res);
});

app.get("/top-10", [validToken, validAdmin], (req, res) => {
    reportController.getTop10DevelopersReport(req, res);
});

app.get("/unassigned", [validToken, validAdmin], (req, res) => {
    reportController.getUnassignedErrors(req, res);
});

module.exports = app;
