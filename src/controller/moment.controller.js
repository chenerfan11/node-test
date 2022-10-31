const fs = require('fs')

const {
  insertData,
  queryData,
  queryDataList,
  updateData,
  removeData,
  hasLabel,
  addLabel
} = require('../service/moment.service')

const {
  getPictureByFilename
} = require('../service/file.service')
const { PICTURE_PATH } = require('../constants/file-path')

class MomentController {
  async create(ctx, next) {
    const {id} = ctx.user
    const {content} = ctx.request.body
    const result = await insertData(id, content)
    ctx.body = result
  }

  async query(ctx, next) {
    const momentId = ctx.request.params.momentId
    const result = await queryData(momentId)
    ctx.body = result
  }

  async queryList(ctx, next) {
    const {offset, size} = ctx.request.query
    const result = await queryDataList(offset, size)
    ctx.body = result
  }

  async update(ctx, next) {
    const {momentId} = ctx.request.params
    const {content} = ctx.request.body
    const result = await updateData(momentId, content)
    ctx.body = result
  }

  async remove(ctx, next) {
    const {momentId} = ctx.request.params
    const result = await removeData(momentId)
    ctx.body = result
  }

  async addLabels(ctx, next) {
    const labels = ctx.labels
    const {momentId} = ctx.request.params
    for(let label of labels) {
      // 判断标签是否和动态有关联
      const isExits = await hasLabel(momentId, label.id)
      console.log(isExits);
      if (!isExits) {
        console.log('我俩来，');
        await addLabel(momentId, label.id)
      }
    }
    ctx.body = '添加成功'
  }

  async fileinfo(ctx, next) {
    const {filename} = ctx.request.params
    const [fileinfo] = await getPictureByFilename(filename)
    // console.log(filename);
    ctx.response.set('content-type', fileinfo.mimetype)
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${fileinfo.filename}`)
  }
}

module.exports = new MomentController()