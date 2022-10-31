const connection = require('../app/database')

class FileService {
  async saveAvatar(mimetype, filename, size, userId) {
    const statement = 'INSERT INTO `file_avatar` (mimetype, filename, size, user_id) VALUES (?, ?, ?, ?)'
    const result = await connection.execute(statement, [mimetype, filename, size, userId])
    return result[0]
  }

  async getAvatarByUserId(userId) {
    const statement = 'SELECT * FROM file_avatar WHERE user_id = ?'
    const result = await connection.execute(statement, [userId])
    return result[0]
  }

  async savePicture(mimetype, filename, size, userId, momentId) {
    const statement = 'INSERT INTO `file_picture` (mimetype, filename, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?)'
    const result = await connection.execute(statement, [mimetype, filename, size, userId, momentId])
    return result[0]
  }

  async getPictureByFilename(filename) {
    const statement = 'SELECT * FROM file_picture WHERE filename = ?'
    const result = await connection.execute(statement, [filename])
    return result[0] 
  }
}

module.exports = new FileService()