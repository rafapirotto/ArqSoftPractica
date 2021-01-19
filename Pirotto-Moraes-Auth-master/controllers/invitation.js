const InvitationService = require("../services/invitation");
const InvalidInputsError = require("../exceptions/invalidInputs");

const invitationService = new InvitationService();

class InvitationController {
    constructor() {}

    async sendRegisterInvitation(req, res) {
        const { email, role } = req.body;
        const { user } = req;
        try {
            invitationService.sendRegisterInvitation(
                email,
                user.organizationName,
                role,
                user.name
            );
            res.status(200).send("OK");
        } catch (error) {
            if (error instanceof InvalidInputsError) {
                console.log(error.errors);
                res.status(403).send(error.errors);
            } else {
                console.log(error.message);
                res.status(500).send(error.message);
            }
        }
    }

    validateInvitation(req, res) {
        try {
            const invitation = req.invitation;
            delete invitation.iat;
            delete invitation.exp;
            res.status(200).send(invitation);
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }
}

module.exports = InvitationController;
