const mongoose = require("mongoose");

const SlipSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slip", SlipSchema);
