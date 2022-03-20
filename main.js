const cors = require('cors');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const express = require('express')
const {jwtCallback} = require('./passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config()

const { loginUser, users, registerUser } = require('./database')
const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(new JwtStrategy(opts, jwtCallback));

const auth = passport.authenticate('jwt', { session: false });

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  registerUser({ email, password });

  res.json(users);
})

app.post('/login', (req, res) => {
  const user = loginUser(req.body.email, req.body.password)
  if (user) {

    const payload = {
      id: user.id,
      email: user.email
    }

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      id: user.id,
      email: user.email,
      token: `Bearer ${token}`,
    })
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
})

app.get('/', (req, res) => {
  res.send(`
    ${
    users.map((key) => {
      return `<h2>${key.name} - ${key.age}</h2>`
    }).join('')
  }
  `)
})

app.delete('/:id', (req, res) => {
  let userID = users.findIndex((key, id) => +id === +req.params.id)
  users.splice(userID, 1)
  res.send(`Successfully deleted! New db: ${JSON.stringify(users)}`)
})

app.post('/', auth, (req, res) => {
  let user = users.find((key) => {
    return key.email === req.body.email
  })
  user.password === req.body.password ?
    res.send(user) :
    res.send('Email or password is incorrect')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Running!')
})
