const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const keySchema = new Schema({
    key: {
        type: String,
    },
});

module.exports = mongoose.model("Key", keySchema, "keys");
