const Router = require('express').Router()
const Doctor = require('../Controllers/Doctor.controller')


Router.get('/', Doctor.listDoctor)

module.exports = Router