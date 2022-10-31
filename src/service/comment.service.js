const connection = require('../app/database')

class CommentService {
  async addComment(momentId, content, userId) {
    const statement = 'INSERT INTO comment (moment_id, content, user_id) VALUES (?, ?, ?)'
    console.log(momentId, content, userId);
    const result = await connection.execute(statement, [momentId, content, userId])
    return result[0]
  }

  async replyComment(momentId, content, userId, commentId) {
    const statement = 'INSERT INTO comment (moment_id, content, user_id, comment_id) VALUES (?, ?, ?, ?)'
    console.log(momentId, content, userId);
    const result = await connection.execute(statement, [momentId, content, userId, commentId])
    return result[0]
  }

  async updateComment(commentId, content) {
    const statement = 'UPDATE comment SET content = ? WHERE id = ?'
    const result = await connection.execute(statement, [content, commentId])
    return result[0]
  }

  async removeComment(commentId) {
    const statement = 'DELETE FROM comment WHERE id = ?'
    const result = await connection.execute(statement, [commentId])
    return result[0]
  }

  async queryCommentList(momentId) {
    const statement = 'SELECT * FROM comment WHERE moment_id = ?'
    const result = await connection.execute(statement, [momentId])
    return result[0]
  }
}

module.exports = new CommentService()
