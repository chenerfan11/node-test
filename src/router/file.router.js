const Router = require('koa-router')
const { verifyAuth } = require('../middleware/auth.middleware')
const { uploadAvatar, uploadPicture } = require('../controller/file.controller')
const { avatarHandler, pictureHandler } = require('../middleware/file.middleware')

const fileRouter = new Router({prefix: '/upload'})

fileRouter.post('/avatar', verifyAuth, avatarHandler, uploadAvatar)
fileRouter.post('/picture', verifyAuth, pictureHandler, uploadPicture)

module.exports = fileRouter