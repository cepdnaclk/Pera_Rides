const router = require("express").Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

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
  try {
    const realAdmin = await Admin.findOne({ username: req.body.username });
    if (!realAdmin) return res.status(404).json("Wrong Credentials!");
    const validated = await bcrypt.compare(
      req.body.password,
      realAdmin.password
    );
    if (!validated) return res.status(401).json("Wrong Credentials!");

    const { password, ...others } = realAdmin._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(`Error: ${err.message}`);
  }
});

module.exports = router;
