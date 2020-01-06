const express = require('express');
const router = express.Router();
const connection = require('../../helpers/db');
const bcrypt = require('bcrypt')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

//CONNECT TO DATABASE
connection.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected!')
})

//CREATE USER
router.post('/sign-up', (req, res, next) => {
  let hash = bcrypt.hashSync(req.body.password, 10);
  const userData = {
    email: req.body.email,
    password: hash,
    name: req.body.name,
    lastname: req.body.lastname
  }

  const query = connection.query('INSERT INTO users SET ?', userData, (error, result) => {
    console.log(result);
    if (error) {
      res.status(500).json({ flash: error.message });
    } else {
      res.status(200).json({ flash: "User has been signed up !" });
    }
  })
})

router.post('/sign-in', function (req, res) {
  passport.authenticate('local', (err, user, info) => {
    console.log(user)
    if (err) { return res.status(500).send(err) }
    if (!user) { return res.status(400).json({ flash: "Email not found" }) }
    return res.json({ user });
  })(req, res)
});

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    // session: false
  },
  function (email, password, cb) {
    connection.query(`SELECT * from users WHERE email="${email}"`, (err, user) => {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false, { flash: 'Invalid email' }); }
      if (user.password != password) { return cb(null, false, { flash: 'Invalid password' }); }
      return cb(null, user)
    })
  }
));


module.exports = router;