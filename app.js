require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./src/models/index')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/api/users', require('./src/routes/users'))

module.exports = app;