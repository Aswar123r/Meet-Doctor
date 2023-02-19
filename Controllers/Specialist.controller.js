const {Specialist, User, Schedules, Schedule_doctor} = require('../models')

class SpecialistControllers {
    static async listSpecialist (req, res) {
        try {
            const listSpecialists = await Specialist.findAll({
               include : [
                {
                    model : User,
                    attributes : ['id','full_name', 'rating', 'profile_picture'],
                }
                
               ]})

            return res.status(200).json({
                message : 'specialist list successfully obtained',
                data : listSpecialists
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message : 'INTERNAL SERVER ERROR'
            })
        }
    }

    static async listDoctorBySpecialistId (req, res) {
        const {specialistId} = req.params
        try {
             const Doctor = await User.findAll({
                where : {
                    specialist_id: specialistId,
                    role : 'doctor'
                },
                attributes : ['id','full_name', 'profile_picture', 'profile_desc', 'email', 'whatsapp', 'price']
            })
            return res.status(200).json({
                message : 'Successfully displaying data based on ID Specialists',
                data : Doctor
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message : 'INTERNAL SERVER ERROR'
            })
        }
    }

}

module.exports = SpecialistControllers