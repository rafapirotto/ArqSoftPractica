const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotEnv = require("dotenv");
require("newrelic");
dotEnv.config();
const Jobs = require("./queues/queueConsumer");

const notifications = require("./controllers");

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

app.use("/", notifications);

app.listen(process.env.PORT, () => {
    console.log(`Notifications listening in port ${process.env.PORT}`);
});

const jobs = new Jobs();
jobs.process();
