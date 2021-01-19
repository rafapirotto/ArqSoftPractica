const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const validRoles = {
    values: ["ADMIN", "DEVELOPER"],
    message: "{VALUE} no es un rol válido",
};
const validNationalities = {
    values: ["Uruguay", "Argentina", "EEUU"],
    message: "{VALUE} no es una nacionalidad válida",
};
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es necesario"],
    },
    email: {
        type: String,
        required: [true, "El correo es necesario"],
        unique: true,
    },
    organizationName: {
        type: String,
        required: [true, "La organización es necesaria"],
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    role: {
        type: String,
        default: validRoles.values[1],
        required: true,
        enum: validRoles,
    },
    preferences: {
        newErrorAssigned: {
            on: {
                type: Boolean,
                default: false,
            },
            frequency: {
                type: Number,
                default: null,
            },
            offset: {
                type: Number,
                default: null,
            },
            severities: {
                type: [Number],
            },
        },
        unassignedErrors: {
            on: {
                type: Boolean,
                default: false,
            },
        },
    },
    nationality: { type: String, enum: validNationalities, required: true },
});

// elimina la key password del objeto que retorna al momento de crear un usuario
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

userSchema.plugin(uniqueValidator, {
    message: "Este campo debe ser único",
});

module.exports = mongoose.model("User", userSchema, "users");
