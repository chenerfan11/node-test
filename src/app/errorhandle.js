const {
  USERNAMR_PASSWORD_EMPTY,
  USERNAMR_ALREADY_EXITS,
  USERNAME_DOES_NOT_EXITS,
  PASSWORD_NOT_INCRE,
  UNAUTHORIZAYION,
  TOKEN_IS_EMPTY,
  UNPERMISSION
} = require('../constants/errors-type')

const errorHandler = (err, ctx) => {
  let status, errMsg;
  switch (err.message) {
    case USERNAMR_PASSWORD_EMPTY:
      status = 500
      errMsg = '用户名或者密码不能为空'
      break;
    case USERNAMR_ALREADY_EXITS:
      status = 409
      errMsg = '用户名已经存在～'
      break;
    case USERNAME_DOES_NOT_EXITS:
      status = 400
      errMsg = '用户名不存在～'
      break;
    case PASSWORD_NOT_INCRE:
      status = 400
      errMsg = '密码错误～'
      break;
    case UNAUTHORIZAYION:
      status = 401
      errMsg = '授权验证失败～'
      break;
    case TOKEN_IS_EMPTY:
      status = 401
      errMsg = 'token不能为空～'
      break;
    case UNPERMISSION:
      status = 400
      errMsg = '抱歉，您暂无权限操作～'
      break;
    default:
      status = 404
      errMsg = 'NOT FOUND'
      break;
  }
  ctx.status = status
  ctx.body = errMsg
}

module.exports = errorHandler



