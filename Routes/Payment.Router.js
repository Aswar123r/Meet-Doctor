const Auth = require("../Middleweres/Auth.middleware");
const {
  mainController,
  paymentController,
} = require("../Controllers/Payment.controller");
const Payment = require("../Controllers/Payment.controller");

const Router = require("express").Router();

Router.use(Auth);
Router.get("/health-check-transaction", Payment.mainController);
Router.get("/transaction/:appointmentId", Payment.paymentController);

module.exports = Router;
