const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    postId: {
        type: Number,
        required: true,
    },
    name: { 
        type: String,
        required: true,
    },
    email: { 
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
}, { timestamps: true });
module.exports = Comment = mongoose.model("comments", CommentSchema);