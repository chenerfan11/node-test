const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { create, reply, update, remove, queryData } = require('../controller/comment.controller')

const commentRouter = new Router({prefix: '/comment'})
commentRouter.post('/', verifyAuth, create)
commentRouter.post('/:commentId/reply', verifyAuth, reply)
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update)
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove)
commentRouter.get('/', queryData)

module.exports = commentRouter