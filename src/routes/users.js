const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController')

router.post('/signup', UserController.SignUp)
router.post('/login', UserController.Login)
router.post('/activate', UserController.Activate)

module.exports = router