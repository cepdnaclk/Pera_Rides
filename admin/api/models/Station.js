const mongoose = require("mongoose");

const StationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    qrValues: {
      type: [
        {
          qr: {
            type: String,
            required: true,
          },
          bike: {
            type: String,
            default: null,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Station", StationSchema);
