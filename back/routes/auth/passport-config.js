const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail) {
    const authenticateUser = (email, password, done) => {

        const userData = getUserByEmail(email)

        userData == null ? done(null, false, { message: 'No user with that email' }) : null;

        try {
            bcrypt.compare(password, userData.password) ? done(null, userData) : done(null, false, { message: 'Password incorrect' })
        } catch (error) {
            return done(error)
        }
    }
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    }), authenticateUser)

    passport.serializeUser((userData, done) = {});
    passport.deserializeUser((userData, done) = {});
}

module.exports = initialize;