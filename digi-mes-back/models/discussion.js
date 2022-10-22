const mongoose = require("mongoose");

// const discussionSchema = mongoose.Schema({
//     discussion: { type: "string", required: true },
// });

const discussionSchema = mongoose.Schema(
    {
        time: String,
        discussion: {
            // text: {
            type: String,
            // required: true,
            // },
        },
        // users: Array,
        to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        sender: {
            type: Map,
            to: String,
            // required: true
        },
        // sender: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User",
        //     required: true,
        // },
    }
    // {
    //     timestamps: true,
    // }
);

module.exports = mongoose.model("Discussion", discussionSchema);
