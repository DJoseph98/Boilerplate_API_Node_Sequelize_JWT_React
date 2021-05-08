const jwt = require('jsonwebtoken')
require("dotenv").config()
const db = require('../models/index')
const User = db.sequelize.models.User

const validateToken = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
        return res.status(401).json({
            error: true,
            message: "Access token is missing"
        })
    }

    const token = req.headers.authorization.split(" ")[1]
    const options = {
        expiresIn: "1h"
    }
    try {
        const user = await User.findOne({
            where: {
                accessToken: token
            }
        })

        if (!user) {
            return res.status(403).json({
                error: true,
                message: "Authorization error"
            })
        }

        let result = jwt.verify(token, process.env.JWT_SECRET, options)
       
        if (!user.userId === result.id) {
            return res.status(401).json({
                error: true,
                message: "Invalid token"
            })
        }

        req.decoded = result
        next()
    } catch (error) {
        let response
        if (error.name === "TokenExpiredError") {
            response = {
                error: true,
                message: 'TokenExpired'
            }
        } else {
            response = {
                error: true,
                message: 'Authentication error'
            }
        }

        return res.status(403).json(response);
    }
}

module.exports = { validateToken }