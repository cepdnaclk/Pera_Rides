const router = require("express").Router();
const bcrypt = require("bcrypt");
const Admin = require("../../models/Admin");
const User = require("../../models/User");

// register
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newAdmin = new Admin({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });
    const admin = await newAdmin.save();
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json(`Error: ${err.message}`);
  }
});

// login route for admin
router.post("/login", async (req, res) => {
  const userName = req.body.username;
  const passWord = req.body.password;
  if (!passWord || !userName)
    return res.status(400).json("Username and Password required!");
  try {
    const realAdmin = await Admin.findOne({ username: userName });
    if (!realAdmin) return res.status(404).json("Wrong Credentials!");
    const validated = await bcrypt.compare(passWord, realAdmin.password);
    if (!validated) return res.status(401).json("Wrong Credentials!");

    const { password, ...others } = realAdmin._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(`Error: ${err.message}`);
  }
});

// reset password
router.post("/resetpassword", async (req, res) => {
  const newPassword = req.body.newpassword;
  if (!newPassword) return res.status(400).json("New password required");
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  const admin = await Admin.findOne({ username: "admin" });
  if (!admin) return res.status(404).json("Admin  not found!");
  admin.password = hashedNewPassword;
  await admin.save();
  res.status(200).json("Password updated successfully");
});

// get user enrollment
router.get("/stats", async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          label: {
            $first: { $arrayElemAt: [months, { $subtract: ["$month", 1] }] },
          },
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field
          id: "$label", // Rename _id to id
          label: "$label",
          value: "$total",
        },
      },
    ]);
    // console.log(typeof data[0]._id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
