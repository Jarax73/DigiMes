const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    firstName: { type: "string", required: true },
    lastName: { type: "string", required: true },
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    imageUrl: { type: "string" },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
