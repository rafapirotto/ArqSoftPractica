const bcrypt = require("bcrypt");

const OrganizationService = require("./organization");
const RegisterRepository = require("../dataAccess/register");
const UserService = require("./user");
const userValidator = require("./models/user");
const InvalidInputsError = require("../exceptions/invalidInputs");
const RepeatedDatabaseObjects = require("../exceptions/repeatedDatabaseObjects");
const { getGeneratedAuthenticationToken, formatErrors } = require("../utils");

const organizationService = new OrganizationService();
const registerRepository = new RegisterRepository();
const userService = new UserService();

class RegisterService {
    constructor() {}

    async register(user) {
        user.password = bcrypt.hashSync(user.password, 10);
        const loggedUser = await registerRepository.add(user);
        const token = getGeneratedAuthenticationToken(loggedUser);
        return {
            loggedUser,
            token,
        };
    }

    async registerWithInvitation(user) {
        this.validateUserInputs(user);
        const errors = [];
        const uniqueUserError = await this.validateUniqueUser(user);
        if (uniqueUserError) errors.push(uniqueUserError);
        if (errors.length !== 0) throw new RepeatedDatabaseObjects(errors);
        return await this.register(user);
    }

    async registerFromUI(user) {
        user.role = "ADMIN";
        this.validateUserInputs(user);
        await this.validateDatabaseObjects(user);
        await organizationService.add(user.organizationName);
        return await this.register(user);
    }

    validateUserInputs(user) {
        const errors = userValidator.validate(user);
        if (errors.length !== 0) {
            const formatedErrors = formatErrors(errors);
            throw new InvalidInputsError(formatedErrors);
        }
    }

    async validateDatabaseObjects(user) {
        const errors = [];
        const uniqueUserError = await this.validateUniqueUser(user);
        const uniqueOrganizationError = await this.validateUniqueOrganization(
            user.organizationName
        );
        if (uniqueUserError) errors.push(uniqueUserError);
        if (uniqueOrganizationError) errors.push(uniqueOrganizationError);
        if (errors.length !== 0) throw new RepeatedDatabaseObjects(errors);
    }

    async validateUniqueUser(user) {
        const dbUser = await userService.getUserByEmail(user.email);
        if (dbUser) {
            const error = {
                message: "Ya existe un usuario con ese email",
                field: "email",
            };
            return error;
        }
        return null;
    }

    async validateUniqueOrganization(organizationName) {
        const dbOrganization = await organizationService.getOne(
            organizationName
        );
        if (dbOrganization) {
            const error = {
                message: "Ya existe una organización con ese nombre",
                field: "organizationName",
            };
            return error;
        }
        return null;
    }
}

module.exports = RegisterService;
