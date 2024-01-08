const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

// register user
router.post("/user/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const phone = req.body.phone;

  if (!username || !password || !email) {
    return res.status(400).json("Not provided all information.");
  }

  try {
    const hashedPW = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPW,
      email,
      phone,
    });
    try {
      const savedUser = await newUser.save();
      const { password, ...others } = savedUser._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// user login
router.post("/user/login", async (req, res) => {
  const enteredUsername = req.body.username;
  const enteredPassword = req.body.password;

  if (!enteredUsername || !enteredPassword) {
    return res.status(400).json("Username and Password required!");
  }
  try {
    const foundUser = await User.findOne({ username: enteredUsername });
    if (!foundUser) {
      return res.status(404).json("User not found!");
    }

    const passwordValidated = await bcrypt.compare(
      enteredPassword,
      foundUser.password
    );
    if (!passwordValidated) {
      return res.status(400).json("Wrong Credentials!");
    }

    const { password, ...others } = foundUser._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update user information
router.put("/user/update/:userId", async (req, res) => {
  const userId = req.params.userId;
  if (!userId) return res.status(400).json("User ID required!");
  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.status(404).json("User not found!");
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
