const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    userName: {
        type: String
    },
    name: { 
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
}, { timestamps: true });
module.exports = User = mongoose.model("users", UserSchema);