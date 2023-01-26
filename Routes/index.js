const Router = require('express').Router()

const User = require('./User.Router')
const Appoinment = require('./Appoinment.Router')

Router.use('/user', User)
Router.use('/appoinment', Appoinment)

module.exports = Router