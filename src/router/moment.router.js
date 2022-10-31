const Router = require('koa-router')
const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')

const {
  verifyLabelExits
} = require('../middleware/label.middleware')

const {
  create,
  query,
  queryList,
  update,
  remove,
  addLabels,
  fileinfo
} = require('../controller/moment.controller')

const momentRouter = new Router({
  prefix: '/moment'
})

momentRouter.get('/', verifyAuth, create)
momentRouter.get('/list', queryList)
momentRouter.get('/:momentId', query)
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExits, addLabels)
momentRouter.get('/images/:filename', fileinfo)

module.exports = momentRouter