const Router = require("express").Router();
const Auth = require('../Middleweres/Auth.middleware')
const Appointment = require("../Controllers/Appointment.controller");
const Auth = require("../Middleweres/Auth.middleware");

Router.use(Auth);
Router.post("/save", Appointment.SaveAppointment);
Router.get(
  "/get/patient/",
  Appointment.GetAllAppointmentsByPatientId
);
Router.get("/get/doctor/", Appointment.GetAllAppointmentsByDoctorId);

module.exports = Router;
