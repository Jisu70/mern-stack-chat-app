// Dependencies
const express = require('express')
// Middlewares 
const protect = require('../middleware/authMiddleware')

//Controller 
const { accessChat, fetchChats, createGroup, renameGroup, removeUserFromGroup, addUserInGroup } = require('../controller/chatController')

const router = express.Router();

// Routers 
// 
router.post('/', protect, accessChat)
// Fetch chats for single user 
router.get('/', protect, fetchChats)
// create groups
router.post('/group', protect, createGroup)
// Rename group
router.put('/rename', protect, renameGroup)
//  Add user in group
router.put('/adduseringroup', protect, addUserInGroup)
// Remove user from a group
router.put('/removeuserfromgroup', protect, removeUserFromGroup)

module.exports = router
