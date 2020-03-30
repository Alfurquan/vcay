const { User, validate } = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const _ = require("lodash");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.EMAIL_API_KEY
    }
  })
);

exports.registerUser = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if email is already regsitered
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  });

  // If user registers as a host
  if (req.body.isHost) {
    user.role = "host";
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  res
    .cookie("token", token, { httpOnly: true })
    .send(_.pick(user, ["_id", "name", "role"]));
};

exports.loginUser = async (req, res, next) => {
  //Check whether user exists for the email
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email address");

  //Check if password entered is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Password is incorrect");

  //Send the jwt token on successful login
  const token = user.generateAuthToken();
  res
    .cookie("token", token, { httpOnly: true })
    .send(_.pick(user, ["_id", "name", "role"]));
};

exports.checkStatus = async (req, res, next) => {
  res.send(req.user);
};

exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  res.send({ success: true });
};

exports.resetPassword = (req, res, next) => {
  crypto.randomBytes(32, async (err, buffer) => {
    if (err) {
      console.log("err", err);
      return res.status(500).send("Something went wrong..Try again later!");
    }
    const token = buffer.toString("hex");
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("Email not registered!");
    }
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save();
    await transporter.sendMail({
      to: req.body.email,
      from: "vcay@rentals.com",
      subject: "Password Reset",
      html: `
          <p>You requested a password reset</p>
          <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to reset the password</p>
      `
    });
    res.send("Mail sent Successfully!");
  });
};

exports.getNewPassword = async (req, res, next) => {
  const token = req.params.token;
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() }
  });
  if (!user) {
    return res.status(404).send("Token Expired");
  }
  res.send("Success");
};

exports.postNewPassword = async (req, res, next) => {
  const newPassword = req.body.password;
  const token = req.body.token;
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() }
  });
  console.log("user", user);
  if (!user) {
    return res.status(404).send("Token expired ");
  }
  const password = await bcrypt.hash(newPassword, 12);
  user.password = password;
  user.resetToken = null;
  user.resetTokenExpiration = undefined;
  await user.save();
  return res.send("success");
};
