//Dependencies 
const asyncHandler = require('express-async-handler');
const bcrypt = require("bcrypt");

// Model
const User = require('../models/userModel')

// require Generate token function 
const generateToken = require('../config/generateToken')

//To signup 
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, picture } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error(" Please enter all the fields ")
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error(' User already exist ')
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      picture
    })
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic
      });
    }
    else {
      res.status(400);
      throw new Error(' failed to create the user ')
    }
  }
  catch (err) {
    res.status(500);
    console.log(err)
    throw new Error(' There was a server side problem ')
  }
})

// To login 
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUser = await User.findOne({
      email
    })
    if (isUser) {
      const isValidePassword = await bcrypt.compare( password, isUser.password )
      if (isValidePassword) {
        const token = generateToken(isUser._id, isUser.name)
        res.status(200).json({ Token: token })
      } else {
        res.status(400)
        throw new Error(' Password is not valide ')
      }
    } else {
      res.status(400)
      throw new Error(' User not find ')
    }
  } catch (error) {
    res.status(500);
    console.log(error)
    throw new Error(' There was a server side problem ')
  }
})

const getAlluser = asyncHandler(async (req, res) => {
  const keyword = req.query ;
  console.log(keyword)
})


module.exports = {
  registerUser,
  loginUser,
  getAlluser
}