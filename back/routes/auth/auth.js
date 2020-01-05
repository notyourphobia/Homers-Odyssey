const express = require('express');
const router = express.Router();
const connection = require('../../helpers/db');

//CONNECT TO DATABASE
connection.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected!')
})

//CREATE USER
router.post('/sign-up', (req, res,next) => {
  const query = connection.query('INSERT INTO users SET ?', req.body, (error, result) => {
    console.log(result);
    if (error) {
      res.status(500).json({ flash: error.message });
    } else {
      res.status(200).json({ flash: "User has been signed up !" });
    }
  })
})

module.exports = router;