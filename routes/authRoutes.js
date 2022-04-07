const express = require('express')
const router = express.Router()
const {loginUser } = require('../auth/auth')
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  try {
    console.log(req.body)
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
  } catch (e) {
    throw new Error(e)
  }
})

module.exports = router
