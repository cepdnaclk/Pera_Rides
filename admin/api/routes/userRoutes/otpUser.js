const router = require("express").Router();
const User = require("../../models/User");
const generateOTP = require("otp-generator");
const { sendOTPEmail } = require("../../controllers/sendEmail");

OTPprops = {
  value: null,
  isVerified: false,
};

// sending OTP
router.post("/user/generateOtp", async (req, res) => {
  const recievedEmail = req.body.email;
  OTPprops.value = null;
  OTPprops.isVerified = false;

  const OTP = generateOTP.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  try {
    const foundUser = await User.findOne({ email: recievedEmail });
    if (!foundUser) {
      return res.status(404).json("User not found!");
    }

    try {
      await sendOTPEmail(foundUser.email, OTP);
      OTPprops.value = OTP;
      return res.status(200).json("OTP has been sent successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// verify OTP
router.post("/user/verifyOTP", async (req, res) => {
  const receivedOtp = await req.body.otp;
  if (receivedOtp !== OTPprops.value) {
    return res.status(401).json("OTP not valid!");
  }
  OTPprops.isVerified = true;
  OTPprops.value = null;
  res.status(200).json({ response: true });
});

module.exports = router;
