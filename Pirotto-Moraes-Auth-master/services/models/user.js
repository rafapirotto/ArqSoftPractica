const Schema = require("validate");

const validRoles = ["ADMIN", "DEVELOPER"];
const validNationalities = ["Uruguay", "Argentina", "EEUU"];

const user = new Schema({
    name: {
        type: String,
        required: true,
        message: {
            type: "El nombre debe ser de tipo string.",
            required: "El nombre es necesario.",
        },
    },
    email: {
        type: String,
        required: true,
        message: {
            type: "El email debe ser de tipo string.",
            required: "El email es necesario.",
        },
    },
    organizationName: {
        type: String,
        required: true,
        message: {
            type: "La organización debe ser de tipo string.",
            required: "La organización es necesaria.",
        },
    },
    password: {
        type: String,
        required: true,
        message: {
            type: "La contraseña debe ser de tipo string.",
            required: "La contraseña es necesaria.",
        },
    },
    role: {
        type: String,
        required: true,
        message: {
            type: "El rol debe ser de tipo string.",
            required: "El rol es necesario.",
            enum: `Los roles válidos son ${validRoles[0]} y ${validRoles[1]}`,
        },
        enum: validRoles,
    },
    preferences: {
        newErrorAssigned: {
            on: {
                type: Boolean,
                default: false,
                message: {
                    type:
                        "El atributo 'on' de la preferencia debe ser de tipo booleano.",
                },
            },
            frequency: {
                type: Number,
                default: null,
                message: {
                    type:
                        "El atributo 'frequency' de la preferencia debe ser de tipo numero.",
                },
            },
            offset: {
                type: Number,
                default: null,
                message: {
                    type:
                        "El atributo 'offset' de la preferencia debe ser de tipo numero.",
                },
            },
            severities: {
                type: [Number],
            },
        },
        unassignedErrors: {
            on: {
                type: Boolean,
                default: false,
                message: {
                    type:
                        "El atributo 'on' de la preferencia debe ser de tipo booleano.",
                },
            },
        },
    },
    nationality: {
        type: String,
        required: true,
        message: {
            type: "La nacionalidad debe ser de tipo string.",
            required: "La nacionalidad es necesaria.",
            enum: `Las nacionalidades válidas son ${validNationalities[0]}, ${validNationalities[1]} y ${validNationalities[2]}`,
        },
        enum: validNationalities,
    },
});

module.exports = user;
