const Router = require("express").Router();
const Auth = require('../Middleweres/Auth.middleware')
const Appointment = require("../Controllers/Appointment.controller");

Router.use(Auth)
Router.post("/save", Appointment.SaveAppointment);
Router.get("/get/patient", Appointment.GetAllAppointmentsByPatientId)
Router.get("/get/doctor/:doctorId", Appointment.GetAllAppointmentsByDoctorId)

module.exports = Router;
