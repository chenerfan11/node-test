const {addComment, replyComment, updateComment, removeComment, queryCommentList} = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    const {id, content} = ctx.request.body
    const userId = ctx.user.id
    const result = await addComment(id, content, userId)
    ctx.body = result
  }

  async reply(ctx, next) {
    const {id, content} = ctx.request.body
    const userId = ctx.user.id
    const {commentId} = ctx.request.params
    const result = await replyComment(id, content, userId, commentId)
    ctx.body = result
  }

  async update(ctx, next) {
    const {commentId} = ctx.request.params
    const {content} = ctx.request.body
    const result = await updateComment(commentId, content)
    ctx.body = result
  }

  async remove(ctx, next) {
    const {commentId} = ctx.request.params
    const result = await removeComment(commentId)
    ctx.body = result
  }

  async queryData(ctx, next) {
    const {momentId} = ctx.request.query
    const result = await queryCommentList(momentId)
    ctx.body = result
  }
}

module.exports = new CommentController()
