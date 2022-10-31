const {
  createLabel,
  getLabelInfoByName
} = require('../service/label.service')


const verifyLabelExits = async (ctx, next) => {
  const {labels} = ctx.request.body
  let newResult = []
  for(let label of labels) {
    // 1. 验证label是否存在, 如果不存在，添加label
    let newLabel = {name: label}
    const [labelInfo] = await getLabelInfoByName(label)
    if (!labelInfo) {
      // 创建标签
      const result = await createLabel(label)
      newLabel.id = result.insertId
    }else {
      newLabel.id = labelInfo.id
    }
    newResult.push(newLabel)
  }
  ctx.labels = newResult
  await next()
}

module.exports = {
  verifyLabelExits
}
