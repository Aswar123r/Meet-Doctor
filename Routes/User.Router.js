const Router = require('express').Router()

const User = require('../Controllers/User.controller')
const {verifyRegisterUser} = require('../Validations/User.validation')
const Auth = require('../Middleweres/Auth.middleware')

Router.post('/register', verifyRegisterUser, User.Register)
Router.post('/login', User.Login)
Router.use(Auth)
Router.get('/me', User.Detail)

module.exports = Router