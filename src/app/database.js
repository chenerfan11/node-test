const mysql = require('mysql2')

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE
} = require('./config')

const connection = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE
})

connection.getConnection((err, con) => {
  con.connect((e) => {
    if (e) {
      console.log('数据库连接失败');
    }else {
      console.log('数据库连接成功');
    }
  })
})

module.exports = connection.promise()

