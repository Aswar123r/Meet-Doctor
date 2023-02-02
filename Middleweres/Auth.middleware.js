const {Verify} = require('../Helpers/JWT.helper')
const {User} = require('../models')
async function authenticationMiddleware (req, res, next){
   try {
     const authHeader = req.get("authorization")
     if(!authHeader) return res.status(401).json({
      message : "You are not authenticated"
    })
      const Token = authHeader.split(" ")
      const {id, email } = Verify(Token[1])
      const Users = await User.findOne({ where: { id }, attributes : ['id', 'email']})
      if(!Users) {
        return res.status(403).json({
        message : "Token is not valid!"
      })
    }
    req.user = {id : Users.id}
    next()
   } catch (err) {
    return res.status(500).json({
      message : `${err.message}. Please try again`
    })
   }
}

module.exports = authenticationMiddleware