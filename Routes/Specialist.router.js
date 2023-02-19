const Router = require('express').Router()
const Specialist = require('../Controllers/Specialist.controller')


Router.get('/', Specialist.listSpecialist)
Router.get('/doctors/:specialistId', Specialist.listDoctorBySpecialistId)


module.exports = Router