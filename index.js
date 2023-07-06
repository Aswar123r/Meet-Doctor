const express = require('express')
const cors = require('cors')
const {config} = require('dotenv').config()
const router = require('./Routes')
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', router)

app.use( (req, res) => {
    res.status(404).json({
        message : 'The Page You Are Looking For Is Not Available'
    })
})

//aswar

console.log(`App running on port ${process.env.PORT}`)

app.listen(process.env.PORT)