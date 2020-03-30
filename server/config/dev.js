const dotenv = require("dotenv").config();

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const MONGO_URI = `mongodb://${username}:${password}@ds011241.mlab.com:11241/vacay`;

module.exports = {
  MONGO_URI: MONGO_URI
};
