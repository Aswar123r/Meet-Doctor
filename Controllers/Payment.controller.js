const axios = require("axios");
const { asyncWrapper, getCurrentTimestamp } = require("../common/utils");
const { Appointments } = require("../models");

const mainController = asyncWrapper((req, res) => {
  return res.status(200).json({
    status: "ok",
    message: "Ping...",
  });
});

const paymentController = asyncWrapper(async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const appointment = await Appointments.findByPk(appointmentId);
    let {
      id,
      specialist_id,
      doctor_id,
      payment_id,
      schedule_id,
      appointment_desc,
      appointment_time,
      total_price,
      status,
    } = appointment;

    // const test = await axios
    //   .post(
    //     `${process.env.API_BASE_URL}`,
    //     {
    //       transaction_details: {
    //         order_id: "APP-" + id + "-" + getCurrentTimestamp(),
    //         gross_amount: total_price,
    //       },
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //         Authorization:
    //           "Basic " +
    //           Buffer.from(`${process.env.SERVER_KEY}`).toString("base64"),
    //       },
    //     }
    //   )
    //   .then(({ data }) => console.log(data));

    //   if (test) {
    //     return res.status(200).json({
    //       status: "ok",
    //       token: requestPaymentToken.data.token,
    //     });
    //   }

    const requestPaymentToken = await axios({
      // Below is the API URL endpoint
      url: `${process.env.API_BASE_URL}`,
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
            order_id: "APP-" + id + "-" + getCurrentTimestamp(),
            gross_amount: total_price,
          },
        },
    });

    if (requestPaymentToken) {
      return res.status(200).json({
        status: "ok",
        token: requestPaymentToken.data.token,
        redirect_url: requestPaymentToken.data.redirect_url
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error,
    });
    console.log(error);
  }
});

module.exports = {
  mainController,
  paymentController,
};
