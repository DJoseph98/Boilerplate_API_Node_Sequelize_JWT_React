const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController')
const { validateToken} = require('../middlewares/validToken')

router.post('/signup', UserController.SignUp)
router.post('/login', UserController.Login)
router.get('/activate/:id', UserController.Activate)
router.patch('/forgot', UserController.ForgotPassword)
router.post('/reset', UserController.ResetPassword)
router.get("/logout", validateToken, UserController.Logout)

module.exports = router