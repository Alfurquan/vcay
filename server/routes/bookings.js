const express = require("express");
const auth = require("../middlewares/auth");
const bookingsController = require("../controllers/bookings");
const router = express.Router();

router.post("/", auth, bookingsController.makeBooking);


module.exports = router;