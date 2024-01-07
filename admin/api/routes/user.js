const router = require("express").Router();
const User = require("../models/User");

router.post("/user/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const phone = req.body.phone;

  if (!username || !password || !email)
    return res.status(400).json("Not provided all information.");

  const newUser = new User({
    username,
    password,
    email,
    phone,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all users
router.get("/users", async (req, res) => {
  try {
    const allUsersInDb = await User.find();
    if (!allUsersInDb)
      return res.status(404).json("There are no registered users!");
    let allUsers = [];
    for (let i = 0; i < allUsersInDb.length; i++) {
      const oneUser = allUsersInDb[i];
      const { password, ...others } = oneUser._doc;
      allUsers.push(others);
    }
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update user balance
router.patch("/user/balance/:userId", async (req, res) => {
  const userId = req.params.userId;
  const newBalance = req.body.balance;
  if (!userId) return res.status(400).json("User ID required!");
  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) return res.status(404).json("User not found!");
    foundUser.balance = newBalance;
    const updatedUser = await foundUser.save();
    // const { password, ...others } = updatedUser._doc;
    // res.status(200).json(others);
    res.status(200).json("User balance updated successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
