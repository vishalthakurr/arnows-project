const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserData = mongoose.model("UserData", userSchema);

module.exports = UserData;
