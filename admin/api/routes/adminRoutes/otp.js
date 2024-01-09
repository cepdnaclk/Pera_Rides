const router = require("express").Router();
const Admin = require("../../models/Admin");
const generateOTP = require("otp-generator");
const { sendOTPEmail } = require("../../controllers/sendEmail");

OTPprops = {
  value: null,
  isVerified: false,
};

// sending OTP
router.get("/admin/generateOtp", async (req, res) => {
  OTPprops.value = null;
  OTPprops.isVerified = false;

  const OTP = generateOTP.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  try {
    const admin = await Admin.findOne({ username: "admin" });
    if (!admin) {
      return res.status(404).json("Admin not found in the server!");
    }
    const adminEmail = admin.email;

    try {
      await sendOTPEmail(adminEmail, OTP);
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
router.post("/admin/verifyOTP", async (req, res) => {
  const receivedOtp = await req.body.otp;
  if (receivedOtp !== OTPprops.value) {
    return res.status(401).json("OTP not valid!");
  }
  OTPprops.isVerified = true;
  OTPprops.value = null;
  res.status(200).json({ response: true });
});

module.exports = router;
