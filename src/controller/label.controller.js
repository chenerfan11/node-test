const {
  createLabel,
  getLabelList
} = require('../service/label.service')

class LabelController {
  async create(ctx, next) {
    const {content} = ctx.request.body
    const result = await createLabel(content)
    ctx.body = result
  }

  async list(ctx, next) {
    const {offset, limit} = ctx.request.query
    const result = await getLabelList(offset, limit)
    ctx.body = result
  }
}

module.exports = new LabelController()