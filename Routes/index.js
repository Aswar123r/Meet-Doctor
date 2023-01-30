const Router = require('express').Router()

const Auth = require('../Middleweres/Auth.middleware')
const User = require('./User.Router')
const Specialist = require('./Specialist.router')
const Doctor = require('./Doctor.router')

Router.use('/users', User)
Router.use('/specialists', Specialist)
Router.use('/doctor', Doctor)


module.exports = Router