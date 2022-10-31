const jwt = require('jsonwebtoken')

const {
  PUBLIC_KEY
} = require('../app/config')

const {
  USERNAMR_PASSWORD_EMPTY,
  USERNAME_DOES_NOT_EXITS,
  PASSWORD_NOT_INCRE,
  UNAUTHORIZAYION,
  TOKEN_IS_EMPTY,
  UNPERMISSION
} = require('../constants/errors-type')

const {
  getUserDataByName
} = require('../service/user.service')

const {
  checkAuth
} = require('../service/auth.service')

const {
  md5Password
} = require('../utils/md5-util')

const verifyLogin = async (ctx, next) => {
  const {userName, password} = ctx.request.body

  // 1. 验证用户名和密码不能为空
  if (!userName || !password) {
    const error = new Error(USERNAMR_PASSWORD_EMPTY)
    return ctx.app.emit('error', error, ctx)
  }

  // 2. 验证用户名是否已经存在, 如果不存在，报错
  const result = await getUserDataByName(userName)
  const user = result[0]
  if (!user) {
    const error = new Error(USERNAME_DOES_NOT_EXITS)
    return ctx.app.emit('error', error, ctx)
  }

  // 3. 验证密码是否正确
  if (md5Password(password) != user.password) {
    const error = new Error(PASSWORD_NOT_INCRE)
    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = user

  // 4. 继续下步
  await next()
}

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(TOKEN_IS_EMPTY)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result
    await next()
  } catch (err) {
    const error = new Error(UNAUTHORIZAYION)
    ctx.app.emit('error', error, ctx)
  }
}

const verifyPermission = async (ctx, next) => {
  const [resourceKey] = Object.keys(ctx.request.params)
  const tableName = resourceKey.replace('Id', '')
  const resourceId = ctx.request.params[resourceKey]
  const {id} = ctx.user
  const isPermission = await checkAuth(tableName, resourceId, id)
  if (!isPermission) {
    const error = new Error(UNPERMISSION)
    return ctx.app.emit('error', error, ctx) 
  }
  await next()
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}

