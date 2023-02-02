const Router = require("express").Router();
const Appointment = require("../Controllers/Appointment.controller");
const Auth = require("../Middleweres/Auth.middleware");

Router.use(Auth);
Router.post("/save", Appointment.SaveAppointment);
Router.get("/get/patient/", Appointment.GetAllAppointmentsByPatientId);
Router.get("/get/doctor/", Appointment.GetAllAppointmentsByDoctorId);
Router.get("/get/:appointmentId", Appointment.GetAppointmentByID);
Router.get("/cancel/:appointmentId", Appointment.CancelAppointmentByID);

module.exports = Router;
