const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./models/index')
require("dotenv").config();
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send({
        error: false,
        message:"home"})
})

app.listen(PORT, () => {
    console.log('Server started listening on PORT : ' + PORT)
})