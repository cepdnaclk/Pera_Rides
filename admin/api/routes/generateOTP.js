const router = require("express").Router();
const generateOTP = require("otp-generator");
const nodemailer = require("nodemailer");
const AdminSchema = require("../models/Admin");

router.get("/generateOTP", async (req, res) => {
  const OTP = generateOTP.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  try {
    const admin = await AdminSchema.findOne({ username: "admin" });
    if (!admin) return res.status(404).json("Admin not found in the server!");
    // console.log(admin.email);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.APP_MAIL, // sender gmail
        pass: process.env.APP_PASSWORD, //  sender gmail password
      },
    });

    const mailOptions = {
      from: {
        name: "PERA RIDE APP",
        address: process.env.APP_MAIL,
      }, // sender address
      to: admin.email, // list of receivers
      subject: "Reset Password ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<h1>Here is your OTP : ${OTP}</h1>`, // html body
    };

    const sendMail = async (transporter, mailOptions) => {
      try {
        await transporter.sendMail(mailOptions);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    sendMail(transporter, mailOptions);
    res.status(201).json(OTP);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
});

// verify OTP
router.get("/verifyOTP", (req, res) => {});

// redirect to password reset page when OTP is correct
router.get("/redirect", (req, res) => {});
module.exports = router;
