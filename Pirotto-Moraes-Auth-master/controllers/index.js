const express = require("express");
const app = express();

const RegisterController = require("./register");
const LoginController = require("./login");
const InvitationController = require("./invitation");
const UserController = require("./user");
const OrganizationController = require("./organization");
const ApiKeyController = require("./api-key");
const validToken = require("../middlewares/validToken");
const validAdmin = require("../middlewares/validAdmin");
const validInvitation = require("../middlewares/validInvitation");
const validMachineToken = require("../middlewares/validMachineToken");
const HealthCheckerController = require("../controllers/healthChecker");

const healthCheckerController = new HealthCheckerController();
const registerController = new RegisterController();
const loginController = new LoginController();
const invitationController = new InvitationController();
const apiKeyController = new ApiKeyController();
const userController = new UserController();
const organizationController = new OrganizationController();

app.get("/healthChecker", (req, res) => {
    healthCheckerController.check(req, res);
});
app.post("/login", (req, res) => loginController.login(req, res));

app.post("/register", (req, res) => registerController.register(req, res));

app.post("/registerWithInvitation", (req, res) =>
    registerController.registerWithInvitation(req, res)
);

app.post("/invitations", [validToken, validAdmin], (req, res) =>
    invitationController.sendRegisterInvitation(req, res)
);

app.get("/validateInvitation/:invitationId", validInvitation, (req, res) =>
    invitationController.validateInvitation(req, res)
);

app.post("/api-keys", [validToken, validAdmin], (req, res) =>
    apiKeyController.create(req, res)
);

app.get("/api-keys/:key", validMachineToken, (req, res) =>
    apiKeyController.getApiKey(req, res)
);

app.get("/users/:id", validMachineToken, (req, res) =>
    userController.getUserById(req, res)
);

app.get("/users/email/:email", validMachineToken, (req, res) =>
    userController.getUserByEmail(req, res)
);

app.get("/emails/:organizationName", validMachineToken, (req, res) =>
    userController.getEmails(req, res)
);

app.put("/preferences", validToken, (req, res) => {
    userController.editUserPreference(req, res);
});

app.get("/preferences", validToken, (req, res) =>
    userController.getUserPreferences(req, res)
);

app.get("/organizations", validMachineToken, (req, res) =>
    organizationController.getAll(req, res)
);

module.exports = app;
