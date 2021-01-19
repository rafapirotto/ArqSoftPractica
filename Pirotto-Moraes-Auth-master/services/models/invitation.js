const Schema = require("validate");

const invitation = new Schema({
    id: {
        type: String,
        required: true,
        message: {
            type: "El id debe ser de tipo string.",
            required: "El id es necesario.",
        },
    },
});

module.exports = invitation;
