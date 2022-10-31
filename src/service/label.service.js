const connection = require('../app/database')

class LabelService {
  async createLabel(content) {
    const statement = 'INSERT INTO label (name) VALUES (?)'
    const result = await connection.execute(statement, [content])
    return result[0]
  }

  async getLabelInfoByName(labelName) {
    const statement = 'SELECT * FROM label WHERE name = ?'
    const result = await connection.execute(statement, [labelName])
    return result[0]
  }

  async getLabelList(offset, limit) {
    const statement = 'SELECT * FROM label LIMIT ?, ?'
    const result = await connection.execute(statement, [offset, limit])
    return result[0]
  }
}

module.exports = new LabelService()
