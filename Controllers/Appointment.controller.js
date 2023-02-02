const { Appointments } = require("../models");

class AppointmentControllers {
  static async SaveAppointment(req, res) {
    const user_id = req.user.id
    let {
      specialist_id,
      doctor_id,
      payment_id,
      schedule_id,
      appointment_desc,
      appointment_time,
      total_price,
      status,
    } = req.body;
    try {
      const insertDataAppointment = await Appointments.create({
        specialist_id: specialist_id,
        doctor_id: doctor_id,
        user_id: user_id,
        payment_id: payment_id,
        schedule_id: schedule_id,
        appointment_desc: appointment_desc,
        appointment_time: appointment_time,
        total_price: total_price,
        status: status,
      });
      return res.status(201).json({
        message: "Appointment is registered",
        data: {
          specialist_id: insertDataAppointment.specialist_id,
          doctor_id: insertDataAppointment.doctor_id,
          user_id: insertDataAppointment.user_id,
          payment_id: insertDataAppointment.payment_id,
          schedule_id: insertDataAppointment.schedule_id,
          appointment_desc: insertDataAppointment.appointment_desc,
          appointment_time: insertDataAppointment.appointment_time,
          total_price: insertDataAppointment.total_price,
          status: insertDataAppointment.status,
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
    const user_id = req.user.id
    try {
      const appointments = await Appointments.findAll({
        where: { user_id: user_id },
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
    const { doctorId } = req.params;
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
}

module.exports = AppointmentControllers;
