const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
// const corsOptions = require("./config/corsOptions");
dotenv.config();

// define port
const PORT = process.env.PORT || 5000;

// middleware for cors
app.use(cors());

// middleware for json()
app.use(express.json());

// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
////////////////////////////////

// rotes for admin login, password reset, register admin
app.use("/api/", require("./routes/adminRoutes/adminMain"));

// otp routes for admin
app.use("/api/", require("./routes/adminRoutes/otp"));

// admin routes related to user
app.use("/api/", require("./routes/adminRoutes/user"));

// admin routes related to user payments slips
app.use("/api/", require("./routes/adminRoutes/slipRoutes"));

// admin routes related to calendar
app.use("/api/", require("./routes/adminRoutes/calendarEvents"));

//admin routes related to income
app.use("/api/", require("./routes/adminRoutes/incomeRoutes"));

// admin router related to stations
app.use("/api/", require("./routes/adminRoutes/stationRoutes"));

// user  routes without otp
app.use("/api/", require("./routes/userRoutes/user"));

// user otp route
app.use("/api/", require("./routes/userRoutes/otp"));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).json({ error: "Invalid JSON payload" });
  } else if (err.type === "entity.too.large") {
    // console.log("x");
    res.status(413).json({ error: "Image is too large" });
  } else {
    next();
  }
});

// app listening to port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
