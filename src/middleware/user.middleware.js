const {
  USERNAMR_PASSWORD_EMPTY,
  USERNAMR_ALREADY_EXITS
} = require('../constants/errors-type')

const {
  getUserDataByName
} = require('../service/user.service')

const {
  md5Password
} = require('../utils/md5-util')

const verifyUser = async (ctx, next) => {
  const {userName, password} = ctx.request.body

  // 1. 验证用户名和密码不能为空
  if (!userName || !password) {
    const error = new Error(USERNAMR_PASSWORD_EMPTY)
    return ctx.app.emit('error', error, ctx)
  }

  // 2. 验证用户名是否已经存在
  const result = await getUserDataByName(userName)
  if (result.length) {
    const error = new Error(USERNAMR_ALREADY_EXITS)
    return ctx.app.emit('error', error, ctx)
  }

  // 3. 继续下步
  await next()
}

const handlePassword = async (ctx, next) => {
  const {password} = ctx.request.body
  ctx.request.body.password = md5Password(password)

  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}

