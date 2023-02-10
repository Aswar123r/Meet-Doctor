const { Appointments } = require("../models");
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

      const requestPaymentToken = await axios({
        // Below is the API URL endpoint
        url: `${process.env.API_MIDTRANS_TRANSACTION_URL}`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Basic " +
            Buffer.from(`${process.env.SERVER_KEY}`).toString("base64"),
          // Above is API server key for the Midtrans account, encoded to base64
        },
        data:
          // Below is the HTTP request body in JSON
          {
            transaction_details: {
              order_id: "APP-" + user_id + "-" + getCurrentTimestamp(),
              gross_amount: total_price,
            },
          },
      });

      const insertDataAppointment = await Appointments.create({
        doctor_id: doctor_id,
        specialist_id: specialist_id,
        user_id: user_id,
        schedule_id: schedule_id,
        appointment_desc: appointment_desc,
        appointment_time: datetime,
        total_price: total_price,
        token_midtrans: requestPaymentToken.data.token,
        url_midtrans: requestPaymentToken.data.redirect_url,
        status: "PENDING",
      });
      return res.status(201).json({
        message: "Appointment is registered",
        data: {
          appointmentId: insertDataAppointment.id,
          token_midtrans: requestPaymentToken.data.token,
          url_midtrans: requestPaymentToken.data.redirect_url,
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
    try {
      const appointment = await Appointments.findByPk(appointmentId);
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
    try {
      const appointment = await Appointments.update(
        {
          status: "CANCELED",
        },
        {
          where: { id: appointmentId },
        }
      );

      return res.status(200).json({
        data: appointment,
        message: "Appointment with id " + appointment + " is cancelled",
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
