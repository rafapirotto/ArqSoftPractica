const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const invitationSchema = new Schema({
    id: {
        type: String,
        required: [true, "El id es necesario"],
    },
});

module.exports = mongoose.model("Invitation", invitationSchema, "invitations");
