const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  mainImage: {
    type: String,
    required: true
  },
  subImages: [
    {
      type: String
    }
  ],
  bedrooms: {
    type: Number,
    required: true
  },
  guests: {
    type: Number,
    required: true
  },
  dailyRentalRate: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: Number,
    required: true
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      require: true
    }
  }
});

validateRental = rental => {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(255)
      .required(),
    description: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    address: Joi.string()
      .min(10)
      .max(255)
      .required(),
    city: Joi.string()
      .min(5)
      .max(255)
      .required(),
    state: Joi.string()
      .min(5)
      .max(255)
      .required(),
    bedrooms: Joi.number()
      .min(1)
      .max(20)
      .required(),
    guests: Joi.number()
      .min(1)
      .max(20)
      .required(),
    dailyRentalRate: Joi.number().required(),
    zip: Joi.number().required()
  };
  return Joi.validate(rental, schema);
};

exports.Rental = mongoose.model("Rental", rentalSchema);
exports.validate = validateRental;
