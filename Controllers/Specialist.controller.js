const {Specialist, User, Schedules, Schedule_doctor} = require('../models')

class SpecialistControllers {
    static async listSpecialist (req, res) {
        try {
            const listSpecialists = await Specialist.findAll()
            return res.status(200).json({
                data : listSpecialists
            })
        } catch (err) {

        }
    }

}

module.exports = SpecialistControllers