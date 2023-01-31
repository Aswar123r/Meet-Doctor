const Router = require("express").Router();

const Appointment = require("../Controllers/Appointment.controller");

Router.post("/save", Appointment.SaveAppointment);
Router.get("/get/patient/:patientId", Appointment.GetAppointment)

module.exports = Router;
