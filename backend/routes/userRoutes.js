// Dependencies
const express = require('express') 

//Controller 
const { registerUser, loginUser, getAlluser } = require('../controller/userController')

const router = express.Router() ;

// Routers 
router.post('/signup', registerUser)

router.post('/login', loginUser)

router.get('/', getAlluser)


module.exports = router