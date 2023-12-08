const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
dotenv.config();

// define port
const PORT = process.env.PORT || 5000;

// middleware for cors
app.use(cors(corsOptions));

// middleware for json()
app.use(express.json());

// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
////////////////////////////////

app.use("/api/", require("./routes/login"));

// app listening to port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
