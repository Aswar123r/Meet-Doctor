const { Appointments } = require("../models");
const Snap = require("../Helpers/Midtrans.helper")
const midtransClient = require('midtrans-client')
const { User } = require("../models");
const axios = require("axios");
const { asyncWrapper, getCurrentTimestamp } = require("../common/utils");

class AppointmentControllers {
  static async SaveAppointment(req, res) {
    const user_id = req.user.id;
    let { doctor_id, schedule_id, datetime, appointment_desc, total_price } =
      req.body;
    try {
      const { specialist_id } = await User.findByPk(doctor_id);
      let parameter = {
          "transaction_details": {
              "order_id": "APP-" + user_id + "-" + getCurrentTimestamp(),
              "gross_amount": total_price
          }, "credit_card":{
              "secure" : true
          }
      };
      const requestPaymentToken = await Snap.createTransaction(parameter)
     
      const insertDataAppointment = await Appointments.create({
        doctor_id: doctor_id,
        specialist_id: specialist_id,
        user_id: user_id,
        schedule_id: schedule_id,
        appointment_desc: appointment_desc,
        appointment_time: datetime,
        total_price: total_price,
        token_midtrans: requestPaymentToken.token,
        url_midtrans: requestPaymentToken.redirect_url,
        status: "PENDING",
      });
      return res.status(201).json({
        message: "Appointment is registered",
        data: {
          appointmentId: insertDataAppointment.id,
          token_midtrans: requestPaymentToken.token,
          url_midtrans: requestPaymentToken.redirect_url,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "INTERNAL SERVER ERROR",
      });
    }
  }

  static async GetAllAppointmentsByPatientId(req, res) {
    const patientId = req.user.id;
    try {
      const appointments = await Appointments.findAll({
        where: { user_id: patientId },
      });
      return res.status(200).json({
        data: appointments,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "INTERNAL SERVER ERROR",
      });
    }
  }

  static async GetAllAppointmentsByDoctorId(req, res) {
    const doctorId = req.user.id;
    try {
      const appointments = await Appointments.findAll({
        where: { doctor_id: doctorId },
      });
      return res.status(200).json({
        data: appointments,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "INTERNAL SERVER ERROR",
      });
    }
  }

  static async GetAppointmentByID(req, res) {
    const { appointmentId } = req.params;
    const user_id = req.user.id;
    try {
      const appointment = await Appointments.findOne({where : {id : appointmentId, user_id : user_id}});
      return res.status(200).json({
        data: appointment,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "INTERNAL SERVER ERROR",
      });
    }
  }

  static async CancelAppointmentByID(req, res) {
    const { appointmentId } = req.params;
    const user_id = req.user.id;
    try {
      const appointment = await Appointments.update(
        {
          status: "CANCELED",
        },
        {
          where: { id: appointmentId, user_id : user_id },
        }
      );
      if(appointment== 0) return res.status(403).json({
        message : 'Access to that Appoitment is forbidden'
      })

      return res.status(200).json({
        message: "Appointment  is cancelled",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "INTERNAL SERVER ERROR",
      });
    }
  }
}

module.exports = AppointmentControllers;
