const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let errorSchema = new Schema({
    title: {
        type: String,
        required: [true, "El titulo es necesario"],
    },
    description: {
        type: String,
        default: "",
        required: [false],
    },
    severity: {
        type: Number,
        default: null,
        required: [false],
    },
    status: {
        type: String,
        default: "NO_RESUELTO",
    },
    organizationName: {
        type: String,
        required: [true, "La organizacion es necesaria"],
    },
    assignedDeveloper: {
        type: String,
        default: null,
        required: [false],
    },
    assignationDate: {
        type: Date,
        default: null,
    },
    creationDate: {
        type: Date,
        required: [true],
    },
    resolutionDate: {
        type: Date,
        default: null,
    },
});

module.exports = mongoose.model("Error", errorSchema, "errors");
