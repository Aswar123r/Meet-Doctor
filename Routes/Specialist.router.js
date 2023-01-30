const Router = require('express').Router()
const Specialist = require('../Controllers/Specialist.controller')


Router.get('/', Specialist.listSpecialist)


module.exports = Router