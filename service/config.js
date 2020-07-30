const dotenv = require("dotenv").config();
const { parsed } = dotenv;

const { MONGODB_URI, PORT, JWT_SECRET } = process.env;

const config = Object.freeze({
  PORT: parseInt(PORT, 10),
  MONGODB_URI: MONGODB_URI,
  JWT_SECRET: JWT_SECRET,
});

module.exports = config;
