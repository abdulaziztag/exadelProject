const cors = require('cors');
const passport = require('passport');
const express = require('express')
const {jwtCallback} = require('./auth/passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
require('dotenv').config()

const usersRoute = require('./routes/usersRoute')
const authRoute = require('./routes/authRoutes')
const mongoUrl = `${process.env.MONGODB_URI}${process.env.DB_NAME}`;
const app = express()

mongoose.connect(mongoUrl);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', authRoute)
app.use('/users', usersRoute)

app.use(passport.initialize())

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(new JwtStrategy(opts, jwtCallback));

app.listen(process.env.PORT || 3000, () => {
  console.log('Running!')
})

module.exports = app
