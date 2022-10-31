const {
  saveAvatar,
  savePicture
} = require('../service/file.service')

const {
  updateUserAvatarUrl
} = require('../service/user.service')

const {
  APP_HOST,
  APP_PORT
} = require('../app/config')

class FileController {
  async uploadAvatar(ctx, next) {
    const { mimetype, filename, size} = ctx.request.file
    const {id} = ctx.user
    const result = await saveAvatar(mimetype, filename, size, id)

    // 把头像链接写进user表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
    await updateUserAvatarUrl(avatarUrl, id)

    ctx.body = '上传头像成功'
  }

  async uploadPicture(ctx, next) {
    const files = ctx.request.files
    const {id} = ctx.user
    const {momentId} = ctx.request.query
    for(let file of files) {
      const { mimetype, filename, size} = file
      await savePicture(mimetype, filename, size, id, momentId)
    }
    ctx.body = '动态配图上传成功'
  }
}

module.exports = new FileController()