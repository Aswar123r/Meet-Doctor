const Router = require("express").Router();
const Auth = require("../Middleweres/Auth.middleware");
const {
  mainController,
  paymentController,
} = require("../Controllers/Payment.controller");
const Payment = require("../Controllers/Payment.controller");
const Appointment = require("../Controllers/Appointment.controller")

Router.post("/notification", Appointment.Notifications);
//Router.use(Auth);
//Router.get("/health-check-transaction", Payment.mainController);
//Router.get("/transaction/:appointmentId", Payment.paymentController);

module.exports = Router;
