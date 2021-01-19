const Invitation = require("./models/invitation");

class InvitationRepository {
    constructor() {}

    async add(invitationId) {
        const invitation = new Invitation({ id: invitationId });
        try {
            return await invitation.save();
        } catch (error) {
            throw Error(error);
        }
    }

    async find(invitationId) {
        try {
            return await Invitation.findOne({
                id: invitationId,
            });
        } catch (error) {
            throw Error(error);
        }
    }
}

module.exports = InvitationRepository;
