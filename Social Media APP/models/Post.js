// models/Post.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  // Other post fields like date, likes, comments, etc.
});

module.exports = mongoose.model("Post", postSchema);
