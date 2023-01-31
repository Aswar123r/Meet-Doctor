const {User} = require('../models')
const {Sign} = require('../Helpers/JWT.helper')
const {Hash, Compare} = require('../Helpers/Bcrypt.helper')

class UserControllers {
    static async Register (req, res) {
        let {full_name, email, password} = req.body
        password = Hash(password)
        try {
            const validateEmail = await User.findOne({where : {email : email}})
            if(validateEmail) return res.status(400).json({
                message : 'Email already registered'
            })
            const insertDataUser = await User.create({full_name : full_name, email : email, password : password})
            return res.status(201).json({
                message : 'Conratulations You Are Registered',
                data : {
                    full_name : insertDataUser.full_name,
                    email : insertDataUser.email,
                }
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message : 'INTERNAL SERVER ERROR'
            })
        }
    }

    static async Login (req, res) {
        const {email, password } = req.body
        try {
            const validateEmail = await User.findOne({where : {email : email}})
            if(!validateEmail) return res.status(404).json({
                message : 'Email Not Register'
            })
            if(!Compare(password, validateEmail.password)) return res.status(404).json({
                message : 'Password Incorrect'
            })
            const generateToken = await Sign({id : validateEmail.id})
            return res.status(201).json({
                message : 'login success',
                data : {
                    full_name : validateEmail.full_name,
                    email : validateEmail.email,
                    token : generateToken
                }
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message : 'INTERNAL SERVER ERROR'
            })
        }
    }

    static async Detail (req, res) {
        const {id} = req.user
        try {
            const detailsUser = await User.findOne({where : {id : id}, attributes : {
                exclude : ['password', 'id', 'role', 'specialist_id', 'price', 'price']
            }})
            return res.status(200).json({
                data : detailsUser
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message : 'INTERNAL SERVER ERROR'
            })
        }
    }
}

module.exports = UserControllers