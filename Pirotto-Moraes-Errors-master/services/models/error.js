const Schema = require("validate");

const validSeverities = [null, 1, 2, 3, 4];
let error = new Schema({
    title: {
        type: String,
        required: true,
        message: {
            type: "El titulo debe ser de tipo string.",
            required: "El titulo es necesario.",
        },
    },
    description: {
        type: String,
        message: {
            type: "La descripción debe ser de tipo string.",
        },
    },
    severity: {
        type: Number,
        message: {
            type: "La severidad debe ser de tipo numero.",
            enum: `La severidad debe estar entre ${validSeverities[1]} y ${validSeverities[4]}`,
        },
        enum: validSeverities,
    },
    status: {
        type: String,
        message: {
            type: "El estado debe ser de tipo string.",
        },
    },
    assignedDeveloper: {
        type: String,
        message: {
            type: "El desarrollador asignado debe ser de tipo string.",
        },
    },
    organizationName: {
        type: String,
        message: {
            type: "La organización debe ser de tipo string.",
        },
    },
});

module.exports = error;
