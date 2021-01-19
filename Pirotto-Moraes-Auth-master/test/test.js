var assert = require("assert");
const mongoose = require("mongoose");

const LoginService = require("../services/login");
const RegisterService = require("../services/register");

const loginService = new LoginService();
const registerService = new RegisterService();

const DB_URL =
    "mongodb+srv://rafa:Centinela2020@cluster0.ic8e8.mongodb.net/Centinela_auth_test?retryWrites=true&w=majority";

const credentials1 = {
    email: "pirotto2@outlook.com",
    password: "123456",
};
const credentials2 = {
    email: "pirotto@outlook.com",
    password: "123456",
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
        .then(() => {})
        .catch((error) => console.error(error, "Error"));
});

describe("Autenticación", function () {
    describe("Loguearse con un usuario existente", function () {
        it("debe retornar los datos del usuario", async function () {
            this.timeout(7000);
            try {
                const dbUser = await loginService.login(credentials1);
                assert.strictEqual(dbUser.loggedUser.email, credentials1.email);
            } catch (error) {}
        });
    });
    describe("Loguearse con un usuario no existente", function () {
        it("debe retornar 'Error: Credenciales inválidas'", async function () {
            this.timeout(7000);
            try {
                await loginService.login(credentials2);
            } catch (error) {
                assert.strictEqual(
                    error.message,
                    "Error: Credenciales inválidas"
                );
            }
        });
    });
});
describe("Registro", function () {
    describe("Registrarse con un mail existente", function () {
        it("debe retornar 'Ya existe un usuario con ese email'", async function () {
            this.timeout(7000);
            try {
                const user = {
                    email: "pirotto2@outlook.com",
                    password: "123456",
                    name: "Rafael",
                    organizationName: "Tesala",
                    nationality: "Uruguay",
                };
                await registerService.registerFromUI(user);
            } catch (error) {
                assert.strictEqual(
                    error.errors[0].message,
                    "Ya existe un usuario con ese email"
                );
            }
        });
    });
    describe("Registrarse con una organizacion existente", function () {
        it("debe retornar 'Ya existe una organización con ese nombre'", async function () {
            this.timeout(7000);
            try {
                const user = {
                    email: "pirotto2@outlook.com",
                    password: "123456",
                    name: "Rafael",
                    organizationName: "Tesala",
                    nationality: "Uruguay",
                };
                await registerService.registerFromUI(user);
            } catch (error) {
                assert.strictEqual(
                    error.errors[1].message,
                    "Ya existe una organización con ese nombre"
                );
            }
        });
    });
});
