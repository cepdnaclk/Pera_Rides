const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const Slip = require("../../models/Slip");
const mqtt = require("mqtt");
const multer = require("multer");

// register user
router.post("/user/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const phone = req.body.phone;
  userEmail = req.body.email;
  if (!username || !password || !email || !phone) {
    console.log(username, password, email, phone);
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
      console.log(savedUser);
      const { password, ...others } = savedUser._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// user login
router.post("/user/login", async (req, res) => {
  const enteredUsername = req.body.username;
  const enteredPassword = req.body.password;

  console.log(enteredUsername, enteredPassword);

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
    // const foundUser = true;

    if (!foundUser) {
      return res.status(404).json("User not found");
    }
    const balance = foundUser.balance;
    if (balance >= 20) {
      // MQTT connection settings
      const mqttOptions = {
        clientId: foundUser._id, // Replace with your MQTT client ID
        // username: 'your_username', // Replace with your MQTT username
        // password: 'your_password', // Replace with your MQTT password
        clean: true,
      };

      const mqttClient = mqtt.connect(
        "ws://test.mosquitto.org:8080/mqtt",
        mqttOptions
      ); // Replace with your MQTT broker URL

      mqttClient.on("connect", () => {
        // Publish a message on a specific topic when the MQTT client is connected
        mqttClient.publish("Pera_Ride/unlock", JSON.stringify(1));
        mqttClient.end(); // Close the MQTT connection
      });

      res.status(200).json({ balance: true, qr: qrValue });
    } else {
      res.status(400).json("Your account balance is low!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// slip uplaod
router.post("/user/newslip", async (req, res) => {
  const reqUserId = req.body.userId;
  const reqImage = req.body.image;

  if (!reqUserId || !reqImage) {
    res.status(400).json("User ID and Slip image required!");
  }

  const newSlip = new Slip({
    userId: reqUserId,
    image: reqImage,
  });

  try {
    const savedSlip = await newSlip.save();
    res.status(201).json(savedSlip);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
