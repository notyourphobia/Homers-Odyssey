const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '333999',
  database: 'homers_database'
});
module.exports = connection;