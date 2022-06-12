const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    user: {

        type: mongoose.SchemaTypes.ObjectId,
        ref: "UserData"
    },

    message: {
        type: String,
        required: true
    },



    date: {
        type: Date,
        default: Date.now
    }
});




const Usermessage = mongoose.model("Usermessage", messageSchema);

module.exports = Usermessage