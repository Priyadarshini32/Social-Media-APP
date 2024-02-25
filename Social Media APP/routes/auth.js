// routes/auth.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Registration route
router.post("/register.html", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to register user");
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send("Invalid password");
    }
    // Send success response
    res.status(200).send("Login successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
