const User = require("../model/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
exports.signUp = async function (req, res) {
  try {
    const { username, password, userType } = req.body;
    const user = await User.find({ username: username });

    if (user.length > 0) {
      res.status(401).json({ message: "User already exists" });
    } else {
      const hashedpass = await bcrypt.hash(password, 10);
      const user_ = await User.create({
        username: username,
        password: hashedpass,
        userType: userType,
      });
      const token = user_.generateAuthToken();
      res.status(200).json({ token, user_ });
    }
  } catch (err) {
    res.status(400).json({ message: "Please try again later" });
  }
};

exports.signIn = async function (req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.find({ username: username });

    if (user.length == 0) {
      res.status(401).json({ message: "User does not exists" });
    } else {
      const valid = await bcrypt.compare(password, user[0].password);

      if (valid) {
        const token = user[0].generateAuthToken();
        res.status(200).json({ token, user });
      } else {
        res.status(401).json({ message: "Please enter the correct password" });
      }
    }
  } catch (err) {
    res.status(400).json({ message: "Please try again later" });
  }
};

exports.verify = async function (req, res) {
  try {
    const id = res.locals._id;
    const user = await User.find({ _id: id });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "Please try again later" });
  }
};
