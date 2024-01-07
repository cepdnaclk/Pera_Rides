const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");

// get all users
router.get("/users", async (req, res) => {
  try {
    const allUsersInDb = await User.find();
    if (!allUsersInDb) {
      return res.status(404).json("There are no registered users!");
    }
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

// delete user
router.delete("/user/delete/:userId", async (req, res) => {
  const userId = req.params.userId;
  if (!userId) return res.status(400).json("User Id required!");
  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) return res.status(404).json("User not found!");
    await User.findByIdAndDelete(userId);
    res.status(200).json("User has been deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
