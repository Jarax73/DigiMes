const mongoose = require("mongoose");

// const discussionSchema = mongoose.Schema({
//     discussion: { type: "string", required: true },
// });

const discussionSchema = mongoose.Schema(
    {
        time: String,
        discussion: { type: String },
        to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Discussion", discussionSchema);
