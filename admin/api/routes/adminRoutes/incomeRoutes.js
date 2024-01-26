const Income = require("../../models/Income");
const router = require("express").Router();

// create income
router.post("/create/income", async (req, res) => {
  const incomeValue = req.body.amount;
  const slipPostedDate = req.body.paymentDate;
  const userId = req.body.userID;
  const slipPostedObj = new Date(slipPostedDate);
  // console.log(slipPostedObj);
  // console.log(typeof slipPostedObj);
  if (!incomeValue || !slipPostedDate || !userId) {
    return res
      .status(400)
      .json("Income Value, slip posted date and posted user ID Required!");
  }

  try {
    const newIncome = new Income({
      amount: incomeValue,
      paymentDate: slipPostedObj,
      userID: userId,
    });
    const savedAmount = await newIncome.save();
    res.status(201).json(savedAmount);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
