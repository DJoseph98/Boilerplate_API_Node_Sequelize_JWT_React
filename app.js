require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./src/models/index')
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/users', require('./src/routes/users'))

app.listen(PORT, () => {
    console.log('Server started listening on PORT : ' + PORT)
})