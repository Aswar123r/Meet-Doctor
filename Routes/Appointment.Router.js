const Router = require("express").Router();

const Appointment = require("../Controllers/Appointment.controller");

Router.post("/save", Appointment.SaveAppointment);
Router.get("/get/patient/:patientId", Appointment.GetAllAppointmentsByPatientId)
Router.get("/get/doctor/:doctorId", Appointment.GetAllAppointmentsByDoctorId)

module.exports = Router;
