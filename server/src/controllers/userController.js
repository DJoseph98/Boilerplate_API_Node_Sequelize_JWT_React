require("dotenv").config()
const { sendEmail } = require("../utils/mailer")
const { hashPassword } = require("../utils/pwd_hasher")
const { generateJwt } = require('../utils/generateJwt')
const db = require('../models/index')
const { Op } = require('sequelize')
const moment = require('moment')
const bcrypt = require('bcrypt')
const { v4: uuid } = require('uuid')
const { signUpSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } = require('../validations/userValidations')
const jwt = require('jsonwebtoken')

const User = db.sequelize.models.User

const SignUp = async (req, res) => {
    try {
        let result = signUpSchema.validate(req.body)
        if (result.error) {
            return res.status(400).json({
                error: true,
                message: result.error.message
            })
        }

        const user = await User.findOne({ where: { email: result.value.email } })

        if (user) {
            return res.json({
                error: true,
                message: "Email is already in use"
            })
        }

        const hash = await hashPassword(result.value.password)

        delete result.value.confirmPassword
        result.value.password = hash

        const code = uuid()
        const expiry = moment().add(15, 'm')

        const sendCode = await sendEmail(result.value.email, code)

        if (sendCode.error) {
            return res.status(500).json({
                error: true,
                message: "Couldn't send verification email."
            })
        }

        result.value.emailToken = code
        result.value.emailTokenExpires = expiry

        await User.create(result.value)

        return res.status(200).json({
            success: true,
            message: "Registration Success"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Cannot Register"
        })
    }
}

const Login = async (req, res) => {
    try {

        const result = loginSchema.validate(req.body)

        if (result.error) {
            return res.status(400).json({
                error: true,
                message: result.error.message
            })
        }

        const { email, password } = req.body

        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            return res.status(500).json({
                error: true,
                message: "Account not found"
            })
        }

        if (!user.active) {
            return res.status(500).json({
                error: true,
                message: "You must verify your email to activate your account"
            })
        }

        const isValid = await bcrypt.compareSync(password, user.password);

        if (!isValid) {
            return res.status(500).json({
                error: true,
                message: "Invalid password"
            })
        }

        const { error, token } = await generateJwt(user.email, user.userId)
        if (error) {
            return res.status(500).json({
                error: true,
                message: "Couldn't create access token. Please try again later"
            })
        }

        user.accessToken = token

        await user.save()

        return res.send({
            success: true,
            message: "User logged in successfully",
            token: token,
            id: user.userId
        })
    } catch (error) {
        console.error(error)
        return res.status(505).json({
            error: true,
            message: "Couldn't login. Please try again later."
        })
    }
}

const Activate = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                error: true,
                message: "Please make a valid request"
            })
        }

        const user = await User.findOne({
            where: {
                emailToken: id,
                emailTokenExpires: {
                    [Op.gte]: moment()
                }
            }
        })

        if (!user) {
            return res.status(400).json({
                error: true,
                message: "Invalid details"
            })
        } else {
            if (user.active) {
                return res.status(400).json({
                    error: true,
                    message: "Account already activated"
                })
            }

            user.emailToken = "";
            user.emailTokenExpires = null;
            user.active = true;

            await user.save();

            return res.status(200).json({
                success: true,
                message: "Account activated"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

const ForgotPassword = async (req, res) => {
    try {
        const result = forgotPasswordSchema.validate(req.body)

        if (result.error) {
            return res.status(400).json({
                error: true,
                message: result.error.message
            })
        }

        const { email } = req.body

        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            return res.status(400).json({
                error: true,
                message: "If that email address is in our database, we will send you an email to reset your password"
            })
        }

        const code = Math.floor(100000 + Math.random() * 900000)
        const response = await sendEmail(user.email, code)

        if (response.error) {
            return res.status(500).json({
                error: true,
                message: "Couldn't send mail. Please try again later."
            })
        }

        const expiry = moment().add(15, 'm')
        user.resetPasswordToken = code
        user.resetPasswordExpires = expiry

        await user.save()

        return res.status(200).json({
            success: true,
            message: "If that email address is in our database, we will send you an email to reset your password"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

const ResetPassword = async (req, res) => {
    try {

        const result = resetPasswordSchema.validate(req.body)

        if (result.error) {
            return res.status(400).json({
                error: true,
                message: result.error.message
            })
        }

        const { token, newPassword } = req.body

        const user = await User.findOne({
            where:
            {
                resetPasswordToken: token,
                resetPasswordExpires: {
                    [Op.gte]: moment()
                }
            }
        })

        if (!user) {
            return res.status(400).json({
                error: true,
                message: "Password reset token is invalid or has expired."
            })
        }

        const hash = await hashPassword(newPassword)
        user.password = hash
        user.resetPasswordToken = null,
            user.resetPasswordExpires = null

        await user.save()

        return res.status(200).json({
            success: true,
            message: "Password has been changed"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message,
        });
    }
}

const Logout = async (req, res) => {
    try {
        const { id } = req.decoded

        if (!id) {
            return res.status(400).json({
                error: true,
                message: "Missing token"
            })
        }

        let user = await User.findOne({ userId: id })

        if (!user) {
            return res.status(400).json({
                error: true,
                message: "Invalid Token"
            })
        }

        user.accessToken = ""

        await user.save()

        return res.status(200).json({
            success: true,
            message: "User Logged out"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

const FetchUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        
        const user = await User.findOne({
            attributes: ['userId', 'email'],
            where: {
                accessToken: token
            }
        })

        if (!user) {
            return res.status(403).json({
                error: true,
                message: "Error getting user"
            })
        }

        return res.send({
            success: true,
            message: "Succesfuly fetched user",
            user: {
                id: user.userId,
                email: user.email
            }
        })
    } catch (error) {
        console.error(error)
        return res.status(505).json({
            error: true,
            message: "Couldn't get data"
        })
    }
}

module.exports = { SignUp, Login, Activate, ForgotPassword, ResetPassword, Logout, FetchUser }