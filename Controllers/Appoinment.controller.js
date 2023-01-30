const { Appoinment } = require("../models");

class AppoinmentControllers {
  static async Appoinment(req, res) {
    let {
      specialist_id,
      doctor_id,
      user_id,
      payment_id,
      schedules_id,
      appoinment_desc,
      appoinment_time,
      admin_fee,
      ppn,
      total_price,
    } = req.body;
    try {
      const insertDataAppoinment = await Appoinment.create({
        specialist_id: specialist_id,
        doctor_id: doctor_id,
        user_id: user_id,
        payment_id: payment_id,
        schedules_id: schedules_id,
        appoinment_desc: appoinment_desc,
        appoinment_time: appoinment_time,
        admin_fee: admin_fee,
        ppn: ppn,
        total_price: total_price,
      });
      return res.status(201).json({
        message: "Appoinment is registered",
        data: {
          specialist_id: insertDataAppoinment.specialist_id,
          doctor_id: insertDataAppoinment.doctor_id,
          user_id: insertDataAppoinment.user_id,
          payment_id: insertDataAppoinment.payment_id,
          schedules_id: insertDataAppoinment.schedules_id,
          appoinment_desc: insertDataAppoinment.appoinment_desc,
          appoinment_time: insertDataAppoinment.appoinment_time,
          admin_fee: insertDataAppoinment.admin_fee,
          ppn: insertDataAppoinment.ppn,
          total_price: insertDataAppoinment.total_price,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "INTERNAL SERVER ERROR",
      });
    }
  }
}

module.exports = AppoinmentControllers;
