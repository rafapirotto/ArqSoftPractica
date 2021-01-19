require("dotenv").config();

const AddErrorSDK = require("./index");
const errorSDK = new AddErrorSDK(process.env.key);

const body = {
    title: "ERROR NUEVO",
    description: "ERROR NUEVO",
    severity: 1,
};
errorSDK.addError(body);
