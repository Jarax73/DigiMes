const mongoose = require("mongoose");

const discussionSchema = mongoose.Schema({
    discussion: { type: "string", required: true },
});

module.exports = mongoose.model("Discussion", discussionSchema);
