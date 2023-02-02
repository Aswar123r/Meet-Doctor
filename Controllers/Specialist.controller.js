const {Specialist, User, Schedules, Schedule_doctor} = require('../models')
const { sequelize, QueryTypes } = require('../models/index')

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

}

module.exports = SpecialistControllers