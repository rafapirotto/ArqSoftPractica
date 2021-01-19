const gateway = require("fast-gateway");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotEnv = require("dotenv");
require("newrelic");

dotEnv.config();

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

const prefix = "/gateway";

gateway({
    server: app,
    routes: [
        {
            prefix: `${prefix}/auth`,
            target: process.env.AUTH_URL,
        },
        {
            prefix: `${prefix}/errors`,
            target: process.env.ERRORS_URL,
        },
        {
            prefix: `${prefix}/notifications`,
            target: process.env.NOTIFICATIONS_URL,
        },
        {
            prefix: `${prefix}/reports`,
            target: process.env.REPORTS_URL,
        },
        {
            prefix: `${prefix}/billing`,
            target: process.env.BILLING_URL,
        },
    ],
}).listen(process.env.PORT, () => {
    console.log(`API Gateway listening in port ${process.env.PORT}`);
});
