const multer = require('multer')

const Storage = multer.memoryStorage()
const Upload = multer({storage : Storage}).single('profilePictures')
console.log(Upload)

module.exports = Upload