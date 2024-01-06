const mongoose = require("mongoose");
// user: {
//   type: mongoose.SchemaTypes.ObjectId,
//   ref: "UserData",
// },
const userBlogSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserBlog = mongoose.model("Userblog", userBlogSchema);

module.exports = UserBlog;
