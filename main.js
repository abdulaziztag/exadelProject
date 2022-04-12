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
const accountRoute = require('./routes/accountRoutes')
const transactionRoute = require('./routes/transactionsRoutes')
const mongoUrl = `${process.env.MONGODB_URI}${process.env.DB_NAME}`;
const app = express()


app.use(passport.initialize())

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(new JwtStrategy(opts, jwtCallback));

const auth = passport.authenticate('jwt', { session: false });

mongoose.connect(mongoUrl);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/auth', authRoute)
app.use('/api/user', usersRoute)
app.use('/api/account', auth, accountRoute)
app.use('/api/transaction', auth, transactionRoute)

app.listen(process.env.PORT || 3000, () => {
  console.log('Running!')
})

module.exports = app
