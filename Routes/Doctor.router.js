const Router = require('express').Router()
const Doctor = require('../Controllers/Doctor.controller')
const Auth = require('../Middleweres/Auth.middleware')


Router.get('/', Doctor.listDoctor)
Router.use(Auth)
Router.get('/:doctorId', Doctor.doctorById)

module.exports = Router