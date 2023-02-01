const Router = require("express").Router();

const Appoinment = require("../Controllers/Appoinment.controller");

Router.post("/save", Appoinment.Appoinment);

module.exports = Router;
