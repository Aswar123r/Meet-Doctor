const Joi = require('joi')

const verifyRegisterUser = async (req, res, next) => {
    const Schema = Joi.object().keys({
        full_name : Joi.string().min(3).required(),
        email : Joi.string().email().required(),
        password : Joi.string().min(8).required(),
    })
    if (Schema.validate(req.body).error) {
        res.json({
            error : Schema.validate(req.body).error.message,
        })
    } else {
        next()
    }
}
const verifyUpdate = async (req, res, next) => {
    const Schema = Joi.object().keys({
        full_name : Joi.string().min(3).optional(),
        profile_desc : Joi.string().optional(),
        whatsapp : Joi.string().length(12).optional(),
    })
    if (Schema.validate(req.body).error) {
        res.json({
            error : Schema.validate(req.body).error.message,
        })
    } else {
        next()
    }
}

module.exports = {
    verifyRegisterUser,
    verifyUpdate
}
