const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const generateOTP = require("otp-generator");
const { sendOTPEmail } = require("../../controllers/sendEmail");

OTPprops = {
  value: null,
  isVerified: false,
};

let userEmail = null;

// register user and send OTP to email
router.post("/user/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const phone = req.body.phone;
  userEmail = req.body.email;
  if (!username || !password || !email || !phone) {
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
      const OTP = generateOTP.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      try {
        await sendOTPEmail(email, OTP);
        OTPprops.value = OTP;
        return res.status(200).json("OTP has been sent successfully!");
      } catch (err) {
        res.status(500).json(err);
      }

      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// verify OTP
router.patch("/user/verifyOTP", async (req, res) => {
  const receivedOtp = await req.body.otp;
  if (receivedOtp !== OTPprops.value) {
    return res.status(401).json("OTP not valid!");
  }
  OTPprops.isVerified = true;
  OTPprops.value = null;

  try {
    const foundUser = await User.findOne({ email: userEmail });
    if (!foundUser) return res.status(404).json("User not found!");
    foundUser.verified = true;
    const savedUser = await foundUser.save();
    // const { password, ...others } = savedUser._doc;
    res.status(200).json("User verified successfully!");
    userEmail = null;
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

    const isVerified = foundUser.verified;
    if (!isVerified) return res.status(403).json("User not verified!");

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

// QR scanning
router.post("/user/qr/verify", async (req, res) => {
  const userId = req.body.id;
  const qrValue = req.body.qr;
  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.status(404).json("User not found");
    }
    const balance = foundUser.balance;
    if (balance >= 20) {
      res.status(200).json({ balance: true, qr: qrValue });
    } else {
      res.status(400).json("Your account balance is low!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
