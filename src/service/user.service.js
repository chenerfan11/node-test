const connection = require('../app/database')

class UserService {
  async saveUser(user) {
    const {userName, password} = user
    const statement = 'INSERT INTO users (name, password) VALUES (?, ?)'
    const result = await connection.execute(statement, [userName, password])
    return result[0]
  }

  async getUserDataByName(name) {
    const statement = 'SELECT * FROM users WHERE name = ?'
    const result = await connection.execute(statement, [name])
    return result[0]
  }

  async updateUserAvatarUrl(url, userId) {
    const statement = 'UPDATE `users` SET avatar_url = ? WHERE id = ?'
    const result = await connection.execute(statement, [url, userId])
    return result[0]
  }
}

module.exports = new UserService()