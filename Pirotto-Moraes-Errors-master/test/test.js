var assert = require("assert");
const mongoose = require("mongoose");

const ErrorService = require("../services/error");

const errorService = new ErrorService();

const DB_URL =
    "mongodb+srv://rafa:Centinela2020@cluster0.ic8e8.mongodb.net/Centinela_errors_test?retryWrites=true&w=majority";

const error1 = {
    title: "ERROR 7423",
    description: "Problemas deploy",
    severity: 1,
    organizationName: "Apple",
    status: "NO_RESUELTO",
};
const error2 = {
    title: "ERROR 7423",
    description: "Problemas deploy",
    severity: 1,
    organizationName: "Apple",
    status: "NO_RESUELTO",
};

after(function () {
    mongoose.connection.close();
});

before(function () {
    mongoose
        .connect(DB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("Errors data base online"))
        .catch((error) => console.error(error, "Error"));
});

after(function () {
    mongoose.connection.close();
});

describe("Errores", function () {
    describe("Agregar error con severidad 1", function () {
        it("los titulos deben ser iguales'", async function () {
            this.timeout(7000);
            const dbError = await errorService.add(error1);
            assert.strictEqual(dbError.title, error1.title);
        });
    });
    describe("Agregar error con severidad 2", function () {
        it("los titulos deben ser iguales'", async function () {
            this.timeout(7000);
            const dbError = await errorService.add(error2);
            assert.strictEqual(dbError.title, error2.title);
        });
    });
});
