// Dependencies
const express = require('express') 
// Middlewares 
const protect = require('../middleware/authMiddleware')

//Controller 
const { registerUser, loginUser, getAlluser } = require('../controller/userController')

const router = express.Router() ;

// Routers 
router.post('/signup', registerUser)

router.post('/login', loginUser)

router.get('/', protect, getAlluser)

module.exports = router
