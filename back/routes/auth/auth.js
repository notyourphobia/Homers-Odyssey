const express = require('express');
const router = express.Router();
const connection = require('../../helpers/db');

//CONNECT TO DATABASE
connection.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected!')
})

//CREATE USER
router.post('/sign-up', (req, res) => {
  const userData = {
    email: "my@email.com",
    password: "myPassw0rd",
    name: "James",
    lastname: "Bond"
  };
  const query = connection.query('INSERT INTO users SET ?', userData, (err, result) => {
    if (err) throw err;
    console.log(result)
    res.send(userData)
  })
})

module.exports = router;