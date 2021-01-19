const express = require("express");
const app = express();

const NotificationController = require("./notification");
const validMachineToken = require("../middlewares/validMachineToken");
const HealthCheckerController = require("../controllers/healthChecker");

const healthCheckerController = new HealthCheckerController();
const notificationController = new NotificationController();

app.get("/healthChecker", (req, res) => {
    healthCheckerController.check(req, res);
});
app.post("/", validMachineToken, (req, res) => {
    notificationController.sendEmail(req, res);
});

app.post("/scheduled", validMachineToken, (req, res) => {
    notificationController.sendScheduledEmail(req, res);
});

module.exports = app;
