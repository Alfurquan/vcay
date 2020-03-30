const { Rental, validate } = require("../models/rental");
const dotenv = require("dotenv").config();
const _ = require("lodash");
const fileHelper = require("../utils/file");
const NodeGeocoder = require("node-geocoder");
const moment = require("moment");

exports.createRental = async (req, res, next) => {
  if (!req.files.mainImage)
    return res.status(400).send("Please select a main image for the rental");

  if (!req.files.subImages)
    return res
      .status(400)
      .send("Please select atleast one sub image for the rental");

  const { errors } = validate(req.body);
  if (errors) {
    removeFiles(req.files);
    return res.status(400).send(errors.details[0].message);
  }

  var options = {
    provider: "google",
    apiKey: process.env.GMAPS_API_KEY,
    formatter: null
  };

  var geocoder = NodeGeocoder(options);

  // const result = await geocoder.geocode(req.body.address + "," + req.body.city);
  const result = await geocoder.geocode(req.body.address);
  // console.log("result", result);

  if (_.isEmpty(result)) {
    removeFiles(req.files);
    return res.status(400).send("Invalid address combination");
  }

  const resCity = result[0].city;
  const resZip = result[0].zipcode;
  const resState = result[0].administrativeLevels.level1long;

  // console.log("resCity", resCity);
  // console.log("resState", resState);
  // console.log("resZip", resZip);

  if (resCity.toLowerCase() !== req.body.city.toLowerCase()) {
    removeFiles(req.files);
    return res.status(400).send("City is not valid as per address");
  }

  if (resZip.toLowerCase() !== req.body.zip.toLowerCase()) {
    removeFiles(req.files);
    return res.status(400).send("Zipcode is not valid as per address");
  }

  if (resState.toLowerCase() !== req.body.state.toLowerCase()) {
    removeFiles(req.files);
    return res.status(400).send("State is not valid as per address");
  }

  let rental = new Rental({
    title: req.body.title,
    description: req.body.description,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    bedrooms: req.body.bedrooms,
    guests: req.body.guests,
    dailyRentalRate: req.body.dailyRentalRate,
    ownerId: req.user._id
  });

  const mainImage = req.files.mainImage[0].path;
  const subImages = req.files.subImages;

  rental.mainImage = mainImage;
  _.each(subImages, img => {
    rental.subImages.push(img.path);
  });
  rental.location.latitude = result[0].latitude;
  rental.location.longitude = result[0].longitude;

  await rental.save();
  res.send(rental);
};

removeFiles = files => {
  fileHelper.deleteFile(files.mainImage[0].path);
  _.each(files.subImages, img => {
    fileHelper.deleteFile(img.path);
  });
};

exports.getRentals = async (req, res, next) => {
  const rentals = await Rental.find({ ownerId: req.user._id });
  res.send(rentals);
};

exports.updateRental = async (req, res, next) => {
  if (_.isEmpty(req.body)) return res.status(400).send("Bad request...");

  const { errors } = validate(req.body);
  if (errors) return res.status(400).send(errors.details[0].message);

  //First find the rental with the id
  let rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send("Rental not found...");

  //If some other host tries to update a rental that does not belong to him
  if (rental.ownerId.toString() !== req.user._id.toString())
    return res.status(403).send("Forbidden...");

  if (req.files) {
    if (req.files.mainImage) {
      fileHelper.deleteFile(rental.mainImage);
      rental.mainImage = req.files.mainImage[0].path;
    }

    if (req.files.subImages) {
      _.each(rental.subImages, subImg => {
        fileHelper.deleteFile(subImg);
      });
      rental.subImages = [];
      _.each(req.files.subImages, img => {
        rental.subImages.push(img.path);
      });
    }
  }

  rental.title = req.body.title;
  rental.description = req.body.description;
  rental.bedrooms = req.body.bedrooms;
  rental.guests = req.body.guests;
  rental.dailyRentalRate = req.body.dailyRentalRate;
  rental.city = req.body.city.toLowerCase();
  rental.state = req.body.state;
  rental.zip = req.body.zip;
  if (rental.address !== req.body.address) {
    rental.address = req.body.address;
    var options = {
      provider: "google",
      apiKey: process.env.GMAPS_API_KEY,
      formatter: null
    };

    var geocoder = NodeGeocoder(options);

    const result = await geocoder.geocode(
      req.body.address + "," + req.body.city
    );

    rental.location.latitude = result[0].latitude;
    rental.location.longitude = result[0].longitude;
  }
  await rental.save();
  res.send(rental);
};

exports.deleteRental = async (req, res, next) => {
  let rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send("Rental not found...");

  if (rental.ownerId.toString() !== req.user._id.toString())
    return res.status(403).send("Forbidden...");

  fileHelper.deleteFile(rental.mainImage);
  _.each(rental.subImages, img => {
    fileHelper.deleteFile(img);
  });

  await Rental.deleteOne({ _id: req.params.id });
  res.send(rental);
};

exports.searchRentals = async (req, res, next) => {
  if (_.isEmpty(req.body)) {
    return res.status(400).send("Bad request..request body cannot be empty");
  }


  //Validate the dates
  if (moment(req.body.checkIn) < Date.now() || moment(req.body.checkOut) < Date.now()) {
    return res.status(400).send("Invalid dates..Select dates in future");
  }

  if (moment(req.body.checkIn) > moment(req.body.checkOut)) {
    return res.status(400).send("Invalid Dates...");
  }

  const checkIn = moment(req.body.checkIn);
  const checkOut = moment(req.body.checkOut);
  const city = req.body.city.toLowerCase();
  const noOfRooms = req.body.noOfRooms;
  const noOfGuests = req.body.noOfGuests;

  const rentals = await Rental.find({
    bedrooms: noOfRooms,
    city: city,
    guests: noOfGuests,
    reservedDates: {
      $not: {
        $elemMatch: {
          from: { $lt: checkOut }, to: { $gt: checkIn }
        }
      }
    }
  });

  if (!rentals) {
    return res.status(404).send("No rentals found");
  }

  res.send(rentals);

}
