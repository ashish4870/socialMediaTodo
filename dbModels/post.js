const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    userId: {
        type: Number,
        required: true,
    },
    title: { 
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
}, { timestamps: true });
module.exports = Post = mongoose.model("posts", TodoSchema);