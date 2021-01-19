const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotEnv = require("dotenv");
const CronJob = require("cron").CronJob;
require("newrelic");

const ErrorService = require("./services/error");
const errorService = new ErrorService();

dotEnv.config();

const notifyUsersOfUnassignedErrors = new CronJob("0 14 * * *", function () {
    errorService.notifyUsersOfUnassignedErrors();
});

notifyUsersOfUnassignedErrors.start();

const errors = require("./controllers");

const app = express();
app.use(cors());
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());

require("./db");

app.use("/", errors);

app.listen(process.env.PORT, () => {
    console.log(`Errors listening in port ${process.env.PORT}`);
});
