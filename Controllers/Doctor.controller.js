const {User, Specialist, Schedule_doctor, Schedules} = require('../models')
const {Op} = require('sequelize')

class DoctorController {
    static async Register (req, res) {
        let {full_name, email, password, specialist_id} = req.body
        try {
            const validateEmail = await User.findOne({where : {email : email}})
            if(validateEmail) return res.status(400).json({
                message : 'Email already registered'
            })
            const insertDoctor = await User.insert({full_name : full_name, email : email, password : password, specialist_id : specialist_id, role : 'doctor'})
            return res.status(201).json({
                message : 'Conratulations You Are Registered Doctor',
                data : {
                    full_name : insertDoctor.full_name,
                    email : insertDoctor.email
                }
            })
        } catch(err) {
            console.log(err)
            return res.status(500).json({
                message : 'INTERNAL SERVER ERROR'
            })
        }
    }
    static async doctorById (req, res) {
        const {doctorId} = req.params
        try {
            const Doctor = await User.findOne({ where : {id : doctorId, role : 'doctor'},
            include : [
                    {
                        model : Specialist,
                        attributes : ['specialist_name'] 
                    },
                    {
                        model : Schedule_doctor,
                        include : [Schedules],
                        attributes : {exclude : ['id', 'doctor_id', 'schedule_id']},
                }
                ],
                
            attributes : ['id','full_name', 'profile_picture', 'profile_desc', 'email', 'whatsapp']})
            if(!Doctor) return res.status(404).json({
                message : `Doctor's data  not found`
            })
            return res.status(200).json({
                data : Doctor
            })
        } catch (err){
            console.log(err)
            return res.status(500).json({
                message : 'INTERNAL SERVER ERROR'
            })
        }
    }

    static async listDoctor (req, res) {
        const {specialistId, nameDoctor} = req.query
        let listDoctors = ''
        try {
            if(specialistId && nameDoctor) {
                 const listDoctor = await User.findAll({where : {specialist_id : specialistId, role : 'doctor', full_name : {[Op.substring] : nameDoctor}},
            include : [
                {
                    model : Specialist,
                    attributes : ['specialist_name']
                },
                 {
                        model : Schedule_doctor,
                        include : [Schedules],
                        attributes : {exclude : ['id', 'doctor_id', 'schedule_id']},
                }
            ],
            attributes : ['id','full_name', 'rating', 'profile_picture'], 
            })
            listDoctors = listDoctor
            } else if(specialistId) {
                const listDoctor = await User.findAll({where : {specialist_id : specialistId, role : 'doctor'},
            include : [
                {
                    model : Specialist,
                    attributes : ['specialist_name']
                },
                 {
                        model : Schedule_doctor,
                        include : [Schedules],
                        attributes : {exclude : ['id', 'doctor_id', 'schedule_id']},
                }
            ],
            attributes : ['id','full_name', 'rating', 'profile_picture'], 
            })
            listDoctors = listDoctor
            } else if (nameDoctor) {
                const listDoctor = await User.findAll({where : { role : 'doctor', full_name : {[Op.substring] : nameDoctor} },
            include : [
                {
                    model : Specialist,
                    attributes : ['specialist_name']
                },
                 {
                        model : Schedule_doctor,
                        include : [Schedules],
                        attributes : {exclude : ['id', 'doctor_id', 'schedule_id']},
                }
            ],
            attributes : ['id','full_name', 'rating', 'profile_picture'], 
            })
            listDoctors = listDoctor
            } else {
                const listDoctor = await User.findAll({where : {role : 'doctor'},
            include : [
                {
                    model : Specialist,
                    attributes : ['specialist_name']
                },
                 {
                        model : Schedule_doctor,
                        include : [Schedules],
                        attributes : {exclude : ['id', 'doctor_id', 'schedule_id']},
                }
            ],
            attributes : ['id','full_name', 'rating', 'profile_picture'], 
            })
            listDoctors = listDoctor
            }

            return res.status(200).json({
                message : 'Data from doctors was found',
                data : listDoctors
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message : 'INTERNAL SERVER ERROR'
            })
        }
    }
}

module.exports = DoctorController