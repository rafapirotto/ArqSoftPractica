const jwt = require("jsonwebtoken");

const InvitationService = require("../services/invitation");

const invitationService = new InvitationService();

const checkValidInvitation = async (req, res, next) => {
    try {
        const { invitationId } = req.params;
        const encodedInvitation = await invitationService.findInvitation(
            invitationId
        );
        if (encodedInvitation) {
            const decodedInvitation = jwt.verify(
                invitationId,
                process.env.ACCESS_TOKEN_SECRET
            );
            req.invitation = decodedInvitation;
            next();
        } else {
            console.log("Invitación no encontrada.");
            res.status(404).send("Invitación no encontrada.");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
};

module.exports = checkValidInvitation;
