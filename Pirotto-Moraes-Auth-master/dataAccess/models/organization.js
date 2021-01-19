const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    organizationName: {
        type: String,
        required: [true, "El nombre es necesario"],
        unique: true,
    },
});

organizationSchema.plugin(uniqueValidator, {
    message: "Este campo debe ser único",
});

module.exports = mongoose.model(
    "Organization",
    organizationSchema,
    "organizations"
);
