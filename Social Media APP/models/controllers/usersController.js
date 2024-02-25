// controllers/usersController.js
const User = require("./models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.getUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    const user = await User.findOne({ username: name });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Similar controller methods for CRUD operations on users (create, update, delete) can be implemented
