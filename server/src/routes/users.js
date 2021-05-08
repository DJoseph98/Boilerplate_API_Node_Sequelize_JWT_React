const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController')
const { validateToken } = require('../middlewares/validToken')

router.post('/signup', UserController.SignUp)
router.post('/login', UserController.Login)
router.patch('/activate/:id', UserController.Activate)
router.patch('/forgot', UserController.ForgotPassword)
router.patch('/reset', UserController.ResetPassword)
router.get('/fetchUser', validateToken, UserController.FetchUser)
router.get("/logout", validateToken, UserController.Logout)

module.exports = router