const connection = require('../app/database')

class AuthService {
  async checkAuth(tableName, id, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?`
    const result = await connection.execute(statement, [id, userId])
    const data = result[0]
    return data.length == 0 ? false : true
  }
}

module.exports = new AuthService()