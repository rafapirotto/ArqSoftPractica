const InvitationRepository = require("../dataAccess/invitation");
const {
    getGeneratedInvitationId,
    formatErrors,
    getGeneratedMachineToken,
} = require("../utils");
const invitationValidator = require("./models/invitation");
const InvalidInputsError = require("../exceptions/invalidInputs");

const axios = require("axios");

const invitationRepository = new InvitationRepository();

const BASE_URL = `${process.env.FRONT_END_BASE_URL}/invitation`;

class InvitationService {
    constructor() {}

    async sendRegisterInvitation(email, organizationName, role, invitingUser) {
        const invitationId = getGeneratedInvitationId(
            email,
            organizationName,
            role
        );
        this.validateInvitationInputs(invitationId);
        await invitationRepository.add(invitationId);
        const URL_TO_SEND = `${BASE_URL}/${invitationId}`;
        const invitationObj = {
            to: email,
            subject: `¡${invitingUser} lo ha invitado a unirse a Centinela!`,
            content: this.createEmailContent(URL_TO_SEND),
        };
        const machineToken = getGeneratedMachineToken(
            process.env.MACHINE_TOKEN
        );
        await axios.post(`${process.env.NOTIFICATIONS_URL}`, invitationObj, {
            headers: { MachineToken: machineToken },
        });
    }

    validateInvitationInputs(invitationId) {
        const errors = invitationValidator.validate({ id: invitationId });
        const formatedErrors = formatErrors(errors);
        if (formatedErrors.length !== 0)
            throw new InvalidInputsError(formatedErrors);
    }

    createEmailContent(link) {
        const text =
            "Para registrarse sólo debe ingresar al siguiente link y llenar el formulario con sus datos:";
        const url = `\n${link}`;
        return `${text}${url}`;
    }

    async findInvitation(invitationId) {
        return await invitationRepository.find(invitationId);
    }
}

module.exports = InvitationService;
