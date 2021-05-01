require("dotenv").config()
const Joi = require('joi')
const { sendEmail } = require("../users/helpers/mailer")
const { hashPassword } = require("../users/helpers/pwd_hasher")
const db = require('../models/index')
const moment = require('moment')
const bcrypt = require('bcrypt')

const User = db.sequelize.models.User

const userSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().required().min(8),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
})

const SignUp = async (req, res) => {
    try {
        let result = userSchema.validate(req.body)
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

        let code = Math.floor(100000 + Math.random() * 900000)
        let expiry = moment().add(15, 'm')

        const sendCode = await sendEmail(result.value.email, code)

        if (sendCode.error) {
            console.log(error)
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
        console.log(error)
        return res.status(500).json({
            error: true,
            message: "Cannot Register"
        })
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).json({
                error: true,
                message: "Cannot authorize user."
            })
        }

        const user = await User.findOne({ where: { email: email } })
        
        if (!user) {
            return res.status(404).json({
                error: true,
                message: "Account not found"
            })
        }

        if (!user.active) {
            return res.status(404).json({
                error: true,
                message: "You must verify your email to activate your account"
            })
        }

        const isValid = await bcrypt.compareSync(password, user.password);

        if (!isValid) {
            return res.status(400).json({
                error: true,
                message: "Invalid password"
            })
        }

        return res.send({
            success: true,
            message: "User logged in successfully"
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
        const { email, code } = req.body
        if (!email || !code) {
            return res.status(400).json({
                error: true,
                message: "Please make a valid request"
            })
        }
        const user = await User.findOne({
            where: {
                email: email,
                emailToken: code
            }
        })

        if (!user) {
            return res.status(400).json({
                error: true,
                message: "Invalid details"
            })
        } else {
            if (moment().isAfter(moment(user.emailTokenExpires))) {
                return res.status(400).json({
                    error: true,
                    message: "Email token expired"
                })
            }

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
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

module.exports = { SignUp, Login, Activate }