const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("newrelic");
const dotEnv = require("dotenv");

dotEnv.config();

const reports = require("./controllers");

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

app.use("/", reports);
app.listen(process.env.PORT, () => {
    console.log(`Reports listening in port ${process.env.PORT}`);
});
