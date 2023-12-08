const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

// define port
const PORT = process.env.PORT || 5000;

// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
////////////////////////////////

// app listening to port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
