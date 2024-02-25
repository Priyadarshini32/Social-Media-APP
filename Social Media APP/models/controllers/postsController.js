// controllers/postsController.js
const Post = require("./models/Post");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username");
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const { name } = req.params;
    const posts = await Post.find({ user: name }).populate("user", "username");
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Similar controller methods for CRUD operations on posts (create, update, delete) can be implemented
