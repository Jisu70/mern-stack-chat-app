
// Dependencies
const asyncHandler = require("express-async-handler");

// Model
const User = require("../models/userModel");
const Chat = require("../models/chatModels");

// Require Generate token function

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log(" User Id is not sent with request ");
    return res.status(400).json({ message: "User Id is not sent with request" })
  }
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  }).populate("users", "-password").populate("latestMessage")
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email"
  })
  if (isChat.length > 0) {
    res.send(isChat[0])
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId]
    }
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat.id }).populate("users", "-password")
      res.status(200).send({ fullChat })
    } catch (error) {

    }
  }
});
const fetchChats = asyncHandler(async (req, res) => {
  try {
    const result = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
    res.status(200).json({ result: result })
  } catch (error) {
    console.log(error);
    res.status(400).json({ message : " Bad request "})
  }
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