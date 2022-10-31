const path = require('path')
const Multer = require('@koa/multer')

const {
  AVATAR_PATH,
  PICTURE_PATH
} = require('../constants/file-path')

const storage1 = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, AVATAR_PATH)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload1 = Multer({
  storage: storage1
})
const avatarHandler = upload1.single('avatar')

const storage2 = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PICTURE_PATH)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})
const upload2 = Multer({
  storage: storage2
})

const pictureHandler = upload2.array('picture', 9)
module.exports = {
  avatarHandler,
  pictureHandler
}
