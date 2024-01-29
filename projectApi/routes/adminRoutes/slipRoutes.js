const router = require("express").Router();
const Slip = require("../../models/Slip");

// get slips
router.get("/payments", async (req, res) => {
  try {
    const response = await Slip.find();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// slip checked changing
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

// delete a slip
router.delete("/deleteSlip/:slipId", async (req, res) => {
  const slipId = req.params.slipId;
  if (!slipId) {
    return res.status(400).json("Slip ID required!");
  }
  try {
    await Slip.findByIdAndDelete(slipId);
    res.status(200).json("Slip has been deleted successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// slip revenue updated set as done (when income updated from slip => slip revenueUpdated set as true)
router.patch("/slip/updated", async (req, res) => {
  const slipId = req.body.slipId;
  try {
    const foundSlip = await Slip.findById(slipId);
    if (!foundSlip) {
      return res.status(404).json("Slip not found!");
    }

    foundSlip.revenueUpdated = true;

    const updatedSlip = await foundSlip.save();

    return res.status(200).json(updatedSlip);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
