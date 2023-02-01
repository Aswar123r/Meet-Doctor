const Router = require('express').Router()

const User = require('../Controllers/User.controller')
const {verifyRegisterUser, verifyUpdate} = require('../Validations/User.validation')
const Auth = require('../Middleweres/Auth.middleware')
const verifyUpload = require('../Middleweres/Upload.middleware')

Router.post('/register', verifyRegisterUser, User.Register)
Router.post('/login', User.Login)
Router.use(Auth)
Router.get('/me', User.Detail)
Router.put('/', verifyUpload, verifyUpdate, User.uploadProfilePictures)


module.exports = Router