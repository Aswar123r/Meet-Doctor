const {Specialist, User, Schedules, Schedule_doctor} = require('../models')

class SpecialistControllers {
    static async listSpecialist (req, res) {
        try {
            const listSpecialists = await Specialist.findAll()
            return res.status(200).json({
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