// Dependencies
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// Model
const User = require("../models/userModel");

// Require Generate token function
const generateToken = require("../config/generateToken");

// To signup
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, picture } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
    picture,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});

// To login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const isUser = await User.findOne({ email });
  if (isUser) {
    const isValidePassword = await bcrypt.compare(password, isUser.password);
    if (isValidePassword) {
      const token = generateToken(isUser._id, isUser.name);
      res.status(200).json({ Token: token });
    } else {
      res.status(400);
      throw new Error("Password is not valid");
    }
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// To get all the users
const getAlluser = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } }, // here option i is for case insencetive
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
    const user = await User.find(keyword).find({ _id : { $ne : req.user._id}}) // $ne is used for not equalto 
    res.status(200).json({user})
});

module.exports = {
  registerUser,
  loginUser,
  getAlluser,
};
