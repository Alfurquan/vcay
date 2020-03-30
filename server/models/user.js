const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const dotenv = require("dotenv").config();
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10
  },
  role: {
    type: String,
    enum: ["visitor", "host", "admin"],
    default: "visitor"
  },
  resetToken: String,
  resetTokenExpiration: Date
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      role: this.role,
      name: this.name
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "10h" }
  );
  return token;
};

validateUser = user => {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    phone: Joi.string()
      .min(10)
      .max(10)
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    isHost: Joi.bool()
  };
  return Joi.validate(user, schema);
};

exports.User = mongoose.model("User", userSchema);
exports.validate = validateUser;
