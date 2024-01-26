const router = require("express").Router();
const bcrypt = require("bcrypt");
const Admin = require("../../models/Admin");
const Slip = require("../../models/Slip");
const User = require("../../models/User");
const CalendarEvents = require("../../models/CalenderEvents");
const Income = require("../../models/Income");

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

// slip mark changing
router.patch("/checkchange", async (req, res) => {
  const userMarked = req.body.marked;
  const slipId = req.body.slipId;
  console.log(slipId, userMarked);

  if (userMarked === null || !slipId) {
    return res
      .status(400)
      .json("Slip ID and Marked value(true or false) required.");
  }

  try {
    const foundSlip = await Slip.findById(slipId);
    if (!foundSlip) {
      return res.status(404).json("Slip not found.");
    }
    foundSlip.marked = userMarked;
    // const savedSlip = await foundSlip.save();
    // res.status(200).json(savedSlip);
    await foundSlip.save();
    res.status(200).json("Marked value has been successfully updated.");
  } catch (err) {
    res.status(500).json(err);
  }
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

// create a calendar event
router.post("/calendar/event", async (req, res) => {
  console.log(req.body);
  const userTitle = req.body.title;
  const userDate = req.body.date;

  if (!userTitle || !userDate) {
    return res.status(500).json("Date and Title required.");
  }

  try {
    const event = new CalendarEvents({
      title: userTitle,
      date: userDate,
    });
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all calendar events
router.get("/calendar/all", async (req, res) => {
  try {
    const response = await CalendarEvents.find();
    if (!response) {
      return res.status(404).json("No events added yet!");
    }

    let returnRes = [];

    for (let obj of response) {
      const value = {
        id: obj._id,
        title: obj.title,
        date: obj.date,
      };
      returnRes.push(value);
    }

    res.status(200).json(returnRes);
  } catch (err) {
    console.log(err);
  }
});

// delete calendar event
router.delete("/calendar/delete/:eventID", async (req, res) => {
  const eventId = req.params.eventID;
  if (!eventId) {
    return res.status(400).json("Event Id required!");
  }

  try {
    await CalendarEvents.findByIdAndDelete(eventId);
    res.status(200).json("Event successfully deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// create income
router.post("/create/income", async (req, res) => {
  const incomeValue = req.body.amount;

  if (!incomeValue) {
    return res.status(400).json("Income Value Required!");
  }

  try {
    const newIncome = new Income({ amount: incomeValue });
    const savedAmount = await newIncome.save();
    res.status(201).json(savedAmount);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
