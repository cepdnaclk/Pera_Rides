const nodemailer = require("nodemailer");

const sendOTPEmail = async (email, OTP, textMessage) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.net",
    port: 465,
    secure: true,
    auth: {
      user: process.env.APP_MAIL, // sender gmail
      pass: process.env.APP_PASSWORD, // sender gmail password
    },
  });
  const mailOptions = {
    from: {
      name: "PERA RIDE APP",
      address: process.env.APP_MAIL,
    },
    to: email,
    // subject: "Reset Password ✔",
    subject: textMessage,
    text: "Hello world?",
    html: `<h1>Here is your OTP: ${OTP}</h1>`,
  };
  const sendMail = async (transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (err) {
      throw new Error(`Error sending email: ${err.message}`);
    }
  };
  sendMail(transporter, mailOptions);
};

module.exports = { sendOTPEmail };
