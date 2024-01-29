const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    paymentDate: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", IncomeSchema);
