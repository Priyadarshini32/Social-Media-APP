// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path"); // Import the path module

// Create an Express application
const app = express();

// Set up middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Connect to your MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/my-social-media-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Define user schema and model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  // Include comments field in the schema to store user comments
  comments: [{ type: String }],
});

const User = mongoose.model("User", userSchema);

// Define route for user registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }

    // Create new user with empty comments array
    const newUser = new User({ username, password, comments: [] });
    await newUser.save();

    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("An error occurred during registration");
  }
});

// Define route for user login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).send("Invalid password");
    }

    res.status(200).send("Login successful");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("An error occurred during login");
  }
});

app.get("/profile", (req, res) => {
  res.status(400).send("Username parameter is required");
});

// Define route for getting user profile
app.get("/profile/:username", async (req, res) => {
  const { username } = req.params;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user); // Send user profile data as JSON response
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).send("An error occurred while fetching profile");
  }
});

// Define route for updating user profile
app.post("/profile/:username/update", async (req, res) => {
  const { username } = req.params;
  const { name, email, location } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Update user profile fields
    user.name = name;
    user.email = email;
    user.location = location;
    await user.save();

    res.status(200).send("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("An error occurred while updating profile");
  }
});

// Define route for posting a comment
app.post("/comment", async (req, res) => {
  const { username, comment } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Add the comment to the user's comments array
    user.comments.push(comment);
    await user.save();

    res.status(200).send("Comment posted successfully");
  } catch (error) {
    console.error("Error posting comment:", error);
    res.status(500).send("An error occurred while posting comment");
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
