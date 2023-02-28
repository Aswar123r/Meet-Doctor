const asyncWrapper = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

const getCurrentTimestamp = () => {
  return "" + Math.round(new Date().getTime() / 1000);
};

const checkDays = (allAppointmentAndScheduleDoctor, Date) => {
  for (let index in allAppointmentAndScheduleDoctor) {
          if (Date.get('days') == allAppointmentAndScheduleDoctor[index].id) {
            return true
          }
        }
        return false
      }

const checkAppointments = (Appointmet, Date) =>  {
  for (let index in Appointmet) {
          if (Date.format('YYYY-MM-DD') == Appointmet[index].appointment_time) {
            return true
          }
        }
        return false
}

const dateToObject = (Date) => {
  let data = Date.format('YYYY-MM-DD').split('-')
          let dateObject = {
             year :parseInt(data[0]),
             month :parseInt(data[1]),
             day :parseInt(data[2]), 
          }
          return dateObject
        }
module.exports = { asyncWrapper, getCurrentTimestamp, checkDays, checkAppointments, dateToObject };
