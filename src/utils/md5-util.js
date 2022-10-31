const md5 = require('md5')

const md5Password = (password) => {
  return md5(password)
}

module.exports = {
  md5Password
}
