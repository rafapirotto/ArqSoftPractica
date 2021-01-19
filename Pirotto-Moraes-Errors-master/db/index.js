const mongoose = require("mongoose");

mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Errors data base online"))
    .catch((error) => console.error(error, "Error"));
