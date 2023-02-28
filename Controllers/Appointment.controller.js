const {Sequelize, Op} = require('sequelize')
const moment = require('moment')
const { Appointments, User, Schedules, Specialist, Schedule_doctor } = require("../models")
const Snap = require("../Helpers/Midtrans.helper")
const {
  asyncWrapper,
  getCurrentTimestamp,
  checkAppointments,
  checkDays,
  dateToObject
} = require("../common/utils")
moment.locale('id')
let dateNow = moment().format('YYYY-MM-DD')
class AppointmentControllers {

  static async SaveAppointment(req, res) {
    const user_id = req.user.id;
    let {
      doctor_id,
      schedule_id,
      datetime,
      appointment_desc,
      total_price
    } = req.body
    const appointmentTime = moment(datetime, "YYYY-MM-DD").format('YYYY-MM-DD')
    const getday = new Date(appointmentTime).getDay()
    try {
      const scheduleVerifyDate = await Schedule_doctor.findOne({
        where : {
          doctor_id : doctor_id,
          schedule_id : getday
          }})
      const scheduleVerify = await Schedule_doctor.findOne({
        where : {
          doctor_id : doctor_id,
          schedule_id : schedule_id
          }})
      if(!scheduleVerifyDate || !scheduleVerify) return res.status(303).json({
        message : 'The doctor you choose does not have a schedule on the day you choose'
      })
      const appointmentVerify = await Appointments.findOne({
        where : {
          appointment_time : datetime,
          doctor_id : doctor_id,
          //payment_status : 'SUCCESS',
          appointment_status : {
            [Sequelize.Op.in] : ['PENDING','WAITING', 'SUCCESS']
          }
        }})
      if(appointmentVerify) return res.status(303).json({
        message : 'there is already an Appointment with another '
      })
       if(appointmentTime <= dateNow) return res.status(300).json({
        message : 'The time is past please try again with another date'
      })
      const {specialist_id} = await User.findByPk(doctor_id)
      const orderId =  "APP-" + user_id + "-" + getCurrentTimestamp()
      let parameter = {
          "transaction_details": {
              "order_id": orderId,
              "gross_amount": total_price
          }, "credit_card":{
            "secure" : true
           }
      }
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
        order_id_midtrans : orderId,
      })
      return res.status(201).json({
        message: "Appointment is registered",
        data: {
          appointmentId: insertDataAppointment.id,
          token_midtrans: requestPaymentToken.token,
          url_midtrans: requestPaymentToken.redirect_url,
        },
      })
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "INTERNAL SERVER ERROR",
      });
    }
  }

  static async GetAllAppointmentsByPatientId(req, res) {
    const patientId = req.user.id
    try {
      const appointments = await Appointments.findAll({
        where: { user_id: patientId },
        order: [['appointment_time', 'ASC']],
        include : [
          {
            model : User,
            as : "Doctor",
            attributes  : ['id','full_name', 'rating', 'profile_picture', 'price', 'whatsapp', 'email','profile_desc'],
          },
          {
            model : Schedules,
            as : "Schedule",
            attributes : {exclude : ['createdAt', 'updatedAt']}
            
          },
          {
            model : Specialist,
            as : "Specialist",
            attributes : ['specialist_name']
          }
         ], 
      attributes : {exclude : ['doctor_id', 'schedule_id', 'specialist_id', 'user_id']}
    })
      return res.status(200).json({
        data: appointments,
      })
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "INTERNAL SERVER ERROR",
      })
    }
  }

  static async GetAllAppointmentsByDoctorId(req, res) {
    const {doctorId} = req.params
    const getDays = (year, month) => new Date(year, month, 0).getDate()
    const Days = getDays(new Date().getFullYear(), new Date().getMonth()+1).toString()
    let dayEnd = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${Days}`
    let  scheduleDoctor = []
    let disabledDate = []
    dayEnd = moment(dayEnd, "YYYY-MM-DD").format('YYYY-MM-DD')
    try {
      const appointments = await Appointments.findAll({
        where: {
          doctor_id: doctorId,
          appointment_status : {
            [Sequelize.Op.in] : ['PENDING','WAITING', 'SUCCESS']
          },
          //payment_status : 'SUCCESS'
        },
        order: [['appointment_time', 'ASC']],
        attributes : ['appointment_time']
      })
      const Schedule = await Schedule_doctor.findAll({
        where : {
          doctor_id : doctorId
        }, 
        include : [
          {
            model : Schedules,
            attributes : ['id', 'date', 'time']
          }
        ],
        attributes : ['createdAt']
      })
      Schedule.map((data) => scheduleDoctor.push(data.Schedule))
      for(let Date = moment(dateNow); Date.diff(dayEnd, 'days') <= 0; Date.add(1, 'days')) {
        if (checkAppointments(appointments, Date)) {
          disabledDate.push(dateToObject(Date))
          continue
        }
        if(checkDays(scheduleDoctor, Date)) {
          continue
        }
        disabledDate.push(dateToObject(Date))
      }
      return res.status(200).json({
        data: disabledDate,
      })
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "INTERNAL SERVER ERROR",
      })
    }
  }

  static async GetAppointmentByID(req, res) {
    const { appointmentId } = req.params
    const user_id = req.user.id
    try {
      const appointment = await Appointments.findOne({
        where : {
          id : appointmentId,
          user_id : user_id
        },
        include : [
          {
            model : User,
            as : "Doctor",
            attributes  : ['id','full_name', 'rating', 'profile_picture', 'price', 'whatsapp', 'email','profile_desc'],
          },
          {
            model : Schedules,
            as : "Schedule",
            attributes : {exclude : ['createdAt', 'updatedAt']}
            
          },
          {
            model : Specialist,
            as : "Specialist",
            attributes : ['specialist_name']
          }
        ],
        attributes : {exclude : ['doctor_id', 'schedule_id', 'specialist_id', 'user_id']},
      })
      return res.status(200).json({
        data: appointment,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "INTERNAL SERVER ERROR",
      })
    }
  }

  static async CancelAppointmentByID(req, res) {
    const { appointmentId } = req.params
    const user_id = req.user.id
    try {
      const Appointment = await Appointments.findByPk(appointmentId)
      if(Appointment) {
        const app = await Snap.transaction.cancel(Appointment.order_id_midtrans)
        await Appointments.update({
          payment_status: 'CANCELED',
          appointment_status : 'CANCELED'
        },
        {
          where: {
            id: appointmentId, user_id : user_id
          }
        }
        )}
      return res.status(200).json({
        message: "Appointment  is cancelled",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "INTERNAL SERVER ERROR",
      })
    }
  }
//testing
  static async Notifications (req, res ) {
    try {
      let dataTransaction = await Snap.transaction.notification(req.body)
      if(dataTransaction) {
        const AppointmentByOrderId = await Appointments.findOne({
          where : {
            order_id_midtrans: dataTransaction.order_id
          }
        })
        const cancelAppointment = await Appointments.findAll({
          where : {
            appointment_time : AppointmentByOrderId.appointment_time,
            payment_status : 'WAITING',
            order_id_midtrans : {
              [Sequelize.Op.ne] : AppointmentByOrderId.order_id_midtrans
            }
          }
        }) 
        if(AppointmentByOrderId) {
          if(dataTransaction.transaction_status == 'settlement') {
            if (cancelAppointment.length) {
              for (let index in cancelAppointment) {
                const validateTransaction = await Snap.transaction.cancel(cancelAppointment[index].order_id_midtrans)
                if (!validateTransaction) continue
                await Appointments.update({
                  payment_status: "FAIL",
                  appointment_status :  "FAIL"
                },
                {
                  where : {
                    order_id_midtrans : cancelAppointment[index].order_id_midtrans
                  }
                })
              }
            }
            await Appointments.update({
            payment_status: "SUCCESS",
            appointment_status :  "WAITING"
          },
          {where : {
            order_id_midtrans : dataTransaction.order_id
          }
        })
      }  else if (dataTransaction.transaction_status == 'cancel' 
          || dataTransaction.transaction_status == 'expire') {
            await Appointments.update({
            payment_status: "FAIL",
            appointment_status :  "FAIL"
          },
          {
            where : {
              order_id_midtrans : dataTransaction.order_id
            }
          })
        } else if (dataTransaction.transaction_status == 'pending'){
            await Appointments.update({
            payment_status: "WAITING",
          },
          {
            where : {
              order_id_midtrans : dataTransaction.order_id
            }
          })
        }
      }
      return res.status(200).json({
        message : 'success'
      })
    }
    } catch (err) {
      console.log(err)
      return res.status(200).json({
        message: "INTERNAL SERVER ERROR",
      })
    }
  }
}

module.exports = AppointmentControllers;
