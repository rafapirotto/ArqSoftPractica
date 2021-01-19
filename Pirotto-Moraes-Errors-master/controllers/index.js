const express = require("express");

const ErrorController = require("../controllers/error");
const HealthCheckerController = require("../controllers/healthChecker");
const validToken = require("../middlewares/validToken");
const validAdmin = require("../middlewares/validAdmin");
const validApiKey = require("../middlewares/validApiKey");
const validMachineToken = require("../middlewares/validMachineToken");

const errorController = new ErrorController();
const healthCheckerController = new HealthCheckerController();
const app = express();

app.get("/healthChecker", (req, res) => {
    healthCheckerController.check(req, res);
});
app.post("/", validApiKey, (req, res) => {
    errorController.add(req, res);
});
app.get("/critics", validApiKey, (req, res) => {
    errorController.getCritics(req, res);
});
app.put("/:id", [validToken, validAdmin], (req, res) => {
    errorController.edit(req, res);
});
app.put("/resolve/:id", validToken, (req, res) => {
    errorController.resolve(req, res);
});
app.get("/", validToken, (req, res) => {
    errorController.getAll(req, res);
});
app.get("/betweenTwoDates/:organization", validMachineToken, (req, res) => {
    errorController.getBetweenTwoDates(req, res);
});
app.get("/unassigned", [validToken, validAdmin], (req, res) => {
    errorController.getUnassignedErrors(req, res);
});
app.get("/:id", validToken, (req, res) => {
    errorController.getOne(req, res);
});
app.post("/assignedToday/:email", validMachineToken, (req, res) => {
    errorController.getAssignedToday(req, res);
});

module.exports = app;
