const router = require("express").Router();
const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const Slip = require("../../models/Slip");

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

// get slips
router.get("/payments", async (req, res) => {
  try {
    const response = await Slip.find();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
