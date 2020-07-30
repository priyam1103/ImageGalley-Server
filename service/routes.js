const express = require("express");
const app = express();
module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/api/users", require("../routes/auth"));
};
