const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport')

const app = express();


const port = 5000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/auth', require('./routes/auth/auth'))

app.get("/profile", passport.authenticate('jwt', { session: false }), function (req, res) {
    res.send(req.user);
})

app.get('/', (req, res) => res.send('xD'))

app.all('/sign-up', require('./routes/auth/auth'));

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

let server = app.listen(process.env.PORT || port, function () {
    console.log('Listening on port ' + server.address().port);
});

// app.listen(port, () => console.log(`Listening on port ${port}!`));
