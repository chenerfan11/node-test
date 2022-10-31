const fs = require('fs')

const {
  AVATAR_PATH
} = require('../constants/file-path')

const {
  saveUser
} = require('../service/user.service')

const {
  getAvatarByUserId
} = require('../service/file.service')

class UserController {
  async create(ctx, next) {
    const result = await saveUser(ctx.request.body)
    ctx.body = result
  }

  async readAvatar(ctx, next) {
    const { userId } = ctx.request.params
    const [avatarInfo] = await getAvatarByUserId(userId)
    console.log(avatarInfo);
    ctx.response.set('content-type', avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
  }
}

module.exports = new UserController()
