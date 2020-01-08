const express = require('express');
const router = express.Router();
const connection = require('../../helpers/db');
const bcrypt = require('bcrypt')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const jwt = require('jsonwebtoken');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  function (email, password, cb) {
    connection.query(`SELECT * from users WHERE email="${email}"`, (err, user) => {
      console.log(password)
      if (err) { return cb(err); }
      if (!user) { return cb(null, false, { flash: 'Invalid email' }); }
      let bRez = bcrypt.compareSync(password, user[0].password)
      if (!bRez) { return cb(null, false, { flash: 'Invalid password' }); }

      return cb(null, user)
    })
  }
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'pass'
},
  function (jwtPayload, cb) {
    return cb(null, jwtPayload);
  }
));

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
    if (error) {
      res.status(500).json({ flash: error.message });
    } else {
      res.status(200).json({ flash: "User has been signed up !" });
    }
  })
})



router.post('/sign-in', (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    console.log(err);
    console.log(user)
    // console.log(info.flash)
    const userData = {
      email: user[0].email,
      password: user[0].password
    }
    if (err) { return res.status(500).send(err) }
    if (!user) { return res.status(400).json({ flash: "Email not found" }) }
    const token = jwt.sign(userData, 'pass');
    return res.json({ user, token, flash: 'Sign in succesful!' });
  })(req, res)
});







module.exports = router;