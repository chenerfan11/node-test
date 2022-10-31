const connection = require('../app/database')

const singleS = `
  SELECT 
  m.id as id, m.content as content, m.createdAt as createdAt, m.updatedAt as updatedAt,
  JSON_OBJECT('uId', u.id, 'uName', u.name) as user
  FROM
  moment as m
  LEFT JOIN users as u ON m.user_id = u.id
`
class MomentService {
  async insertData(id, content) {
    const statement = 'INSERT INTO moment (content, user_id) VALUES (?, ?)'
    const result = await connection.execute(statement, [content, id])
    return result[0]
  }

  async queryData(momentId) {
    console.log(momentId);
    const statement = `
    SELECT
    m.id as id, m.content as content, m.createdAt as createdAt, m.updatedAt as updatedAt,
    JSON_OBJECT('uId', u.id, 'uName', u.name, 'uAvatarUrl', u.avatar_url) as user,
    IF(COUNT(l.id), JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)),NULL) as labels,
		(SELECT IF(COUNT(c.id),JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id,
    'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', cu.avatar_url))),NULL) FROM comment as c LEFT JOIN users as cu ON cu.id = c.user_id WHERE c.moment_id = m.id) as comments,
    (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:9999/moment/images', f.filename)) FROM file_picture as f WHERE f.moment_id = m.id) as pictures
    FROM
    moment as m
    LEFT JOIN users as u ON m.user_id = u.id
		LEFT JOIN moment_label ml ON ml.moment_id = m.id
		LEFT JOIN label l ON l.id = ml.label_id
    WHERE m.id = ?
    GROUP BY m.id
    `
    try {
      const result = await connection.execute(statement, [momentId])
      return result[0]
    } catch (error) {
      console.log(error);
    }
    
  }

  async queryDataList(offset, size) {
    const statement = `
    SELECT 
    m.id as id, m.content as content, m.createdAt as createdAt, m.updatedAt as updatedAt,
    JSON_OBJECT('uId', u.id, 'uName', u.name, 'uAvatarUrl', u.avatar_url) as user,
    (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) as commentCount,
    (SELECT COUNT(*) FROM moment_label as ml WHERE ml.moment_id = m.id) as labelCount,
    (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:9999/moment/images', f.filename)) FROM file_picture as f WHERE f.moment_id = m.id) as pictures
    FROM
    moment as m
    LEFT JOIN users as u ON m.user_id = u.id
    LIMIT ? OFFSET ?
    `
    const result = await connection.execute(statement, [size, offset])
    return result[0]
  }

  async updateData(momentId, content) {
    try {
      const statement = 'UPDATE moment SET content = ? WHERE id = ?'
      const result = await connection.execute(statement, [content, momentId])
      return result[0]
    } catch (error) {
      console.log(error);
    }
  }

  async removeData(momentId) {
    try {
      const statement = 'DELETE FROM moment WHERE id = ?'
      const result = await connection.execute(statement, [momentId])
      return result[0]
    } catch (error) {
      console.log(error);
    }
  }

  async hasLabel(momentId, labelId) {
    const statement = 'SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;'
    const result = await connection.execute(statement, [momentId, labelId])
    return result[0].length > 0 ? true : false
  }

  async addLabel(momentId, labelId) {
    const statement = 'INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?)'
    const result = await connection.execute(statement, [momentId, labelId])
    return result[0]
  }
}

module.exports = new MomentService()