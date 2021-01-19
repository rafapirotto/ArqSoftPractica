const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotEnv = require("dotenv");
require("newrelic");

dotEnv.config();

const accounts = require("./controllers");

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
app.use("/", accounts);

app.listen(process.env.PORT, () => {
    console.log(`Auth listening in port ${process.env.PORT}`);
});
