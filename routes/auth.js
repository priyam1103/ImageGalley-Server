const express = require("express");
const route = express.Router();
const { signUp, signIn, verify } = require("../handlers/auth");
const auth = require("../middleware/auth");
route.post("/signup", signUp);
route.post("/signin", signIn);
route.get("/verify", auth, verify);

module.exports = route;
