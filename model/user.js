const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../service/config");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
});

UserSchema.method("generateAuthToken", function () {
  const token = jwt.sign({ sub: this._id }, config.JWT_SECRET);
  return token;
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
