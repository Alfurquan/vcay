const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rental: {
        type: Schema.Types.ObjectId,
        ref: "Rental",
        required: true
    },
    bookingFrom: {
        type: Date,
        required: true
    },
    bookingTo: {
        type: Date,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Booking", bookingSchema);