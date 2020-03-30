const express = require("express");
const path = require("path");
const { MONGO_URI } = require("./config/dev");
const users = require("./routes/users");
const rentals = require("./routes/rentals");
const bookings = require("./routes/bookings");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const app = express();

//Middleware section------------
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", users);
app.use("/api/rentals", rentals);
app.use("/api/bookings", bookings);

//Mongoose connection-------
mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("connected to mongoDB...");
  })
  .catch(err => {
    console.log("could not connect to Mongo", err);
  });

const PORT = process.env.PORT || 3900;

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}...`);
});
