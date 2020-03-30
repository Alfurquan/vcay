const Booking = require("../models/booking");
const { User } = require("../models/user");
const { Rental } = require("../models/rental");
const moment = require("moment");
const _ = require("lodash");



exports.makeBooking = async (req, res, next) => {

    if (_.isEmpty(req.body)) {
        return res.status(400).send("Invalid request")
    }

    //first check for valid dates
    if (moment(req.body.bookFrom) < Date.now() || moment(req.body.bookTo) < Date.now()) {
        return res.status(400).send("Invalid dates of booking..Select dates in future");
    }

    if (moment(req.body.bookFrom) > moment(req.body.bookTo)) {
        return res.status(400).send("Invalid Dates...");
    }

    //Find the rental for which the booking is to be made
    const rentalId = req.body.rentalId;
    const rental = await Rental.findOne({ _id: rentalId }).populate("bookings");

    if (!rental) return res.status(404).send("Rental not found");

    //Check to see if rental is of that of host
    if (rental.ownerId.toString() === req.user._id.toString()) {
        return res.status(400).send("You cannot book your own rental..");
    }

    //Calculate total amount => noOfDays * dailyRentalRate
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs(new Date(req.body.bookTo) - new Date(req.body.bookFrom))) / oneDay;
    let totalAmount = diffDays * rental.dailyRentalRate;

    let booking = new Booking({
        bookingFrom: req.body.bookFrom,
        bookingTo: req.body.bookTo,
        user: req.user,
        rental: rentalId,
        totalAmount: totalAmount
    })

    //validate the booking
    if (!validate(booking, rental)) {
        return res.status(400).send("Rental is already booked on these dates");
    }

    rental.reservedDates.push({
        from: req.body.bookFrom,
        to: req.body.bookTo
    })

    await booking.save();

    //Update rental to include booking
    rental.bookings.push(booking);
    await rental.save();

    //Update user to include Booking
    await User.updateOne({ _id: req.user._id }, { $push: { bookings: booking } })
    res.send(booking);
}

validate = (proposedBooking, foundRental) => {
    isValid = true;

    if (foundRental.bookings && foundRental.bookings.length > 0) {
        isValid = foundRental.bookings.every(function (booking) {
            const proposedStart = moment(proposedBooking.bookingFrom);
            const proposedEnd = moment(proposedBooking.bookingTo);

            const actualStart = moment(booking.bookingFrom);
            const actualEnd = moment(booking.bookingTo);

            return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart))
        })
    }
    return isValid
}