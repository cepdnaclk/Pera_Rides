const CalendarEvents = require("../../models/CalenderEvents");
const router = require("express").Router();

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

module.exports = router;
