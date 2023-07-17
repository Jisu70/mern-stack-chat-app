
// Dependencies
const asyncHandler = require("express-async-handler");

// Model
const User = require("../models/userModel");

// Require Generate token function

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body ;
  
});
const fetchChats = asyncHandler(async (req, res) => {

});

const createGroup = asyncHandler(async (req, res) => {

});

const renameGroup = asyncHandler(async (req, res) => {

});
const removeUserFromGroup = asyncHandler(async (req, res) => {

});

const addUserInGroup = asyncHandler(async (req, res) => {

});


module.exports = { accessChat, fetchChats, createGroup, renameGroup, removeUserFromGroup, addUserInGroup }