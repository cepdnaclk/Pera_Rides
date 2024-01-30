const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const Slip = require("../../models/Slip");
const mqtt = require("mqtt");
const Station = require("../../models/Station");

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

// QR scanning and set bike in the QR to null
router.patch("/user/qr/verify", async (req, res) => {
  const userId = req.body.id;
  const fullQrValueWithStationID = req.body.qrValue;
  const stationId = fullQrValueWithStationID.split(" ")[0];
  const qrValue = fullQrValueWithStationID.split(" ")[1];

  if (!userId || !stationId || !qrValue) {
    res
      .status(400)
      .json({ message: "User ID, QR value and Station ID required" });
  }

  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const balance = foundUser.balance;
    if (balance >= 20) {
      try {
        const foundStation = await Station.findById(stationId);
        if (!foundStation) {
          return res
            .status(404)
            .json({ message: "Station with provided ID not found!" });
        }

        const qrObject = foundStation.qrValues.find(
          (item) => item.qr === qrValue
        );

        if (!qrObject) {
          return res
            .status(404)
            .json({ message: "Provided QR value not found in the station!" });
        }

        ///////////////////////////
        qrObject.bike = null;
        foundUser.balance = foundUser.balance - 20;

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

        ///////////////////////////
        res
          .status(200)
          .json({ balance: true, qr: qrValue, message: "Unlocked" });

        ////////////////////////////////
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(400).json({ error: "Insufficient balance!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update bike when parked(bikeId) in qr inside station
router.patch("/park/bicycle", async (req, res) => {
  // const stationId = req.params.stationId;
  const bikeId = req.body.bikeId;
  const fullQrValueWithStationID = req.body.qrValue;
  const stationId = fullQrValueWithStationID.split(" ")[0];
  const qrValue = fullQrValueWithStationID.split(" ")[1];

  if (!stationId || !bikeId || !qrValue) {
    return res
      .status(400)
      .json("Station ID and Bicycle ID and QR value required!");
  }

  try {
    const foundStation = await Station.findById(stationId);
    if (!foundStation) {
      return res.status(404).json("Station with provided ID not found!");
    }

    const qrObject = foundStation.qrValues.find((item) => item.qr === qrValue);

    if (!qrObject) {
      return res
        .status(404)
        .json("Provided QR value not found in the station!");
    }
    qrObject.bike = bikeId;
    const savedStation = await foundStation.save();
    res.status(200).json(savedStation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get number of bikes parked in a station (all bikes)
router.get("/info/all/bikes/user", async (req, res) => {
  try {
    const values = await Station.aggregate([
      {
        $project: {
          stationName: "$name",
          bikesAvailable: {
            $size: {
              $filter: {
                input: "$qrValues",
                cond: { $ifNull: ["$$this.bike", false] },
              },
            },
          },
        },
      },
    ]);
    res.status(200).json(values);
  } catch (err) {
    res.status(500).json(err);
  }
});

// slip uplaod
router.post("/user/newslip", async (req, res) => {
  const reqUserId = req.body.userId;
  const reqImage = req.body.image;
  console.log(reqUserId);

  if (!reqUserId || !reqImage) {
    res.status(400).json("User ID and Slip image required!");
  }

  const newSlip = new Slip({
    userId: reqUserId,
    image: reqImage,
  });

  try {
    const savedSlip = await newSlip.save();
    res.status(201).json("Slip uploaded successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get map lattitude and longitude
router.get("/map/data", async (req, res) => {
  try {
    const foundStations = await Station.find();
    if (!foundStations) {
      return res.status(400).json({ message: "No stations found!" });
    }

    let responseArray = [];

    for (let stationObj of foundStations) {
      const oneLocation = {
        _id: stationObj._id,
        lattitude: parseFloat(stationObj.latitude),
        longitude: parseFloat(stationObj.longitude),
      };

      responseArray.push(oneLocation);
    }

    res.status(200).json(responseArray);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
