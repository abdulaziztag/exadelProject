const {loginUser } = require('../auth/auth')
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const user = await loginUser(req.body.email, req.body.password)
    if (user) {
      const payload = {
        email: user.email,
        password: user.password
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
        name: user.name,
        surname: user.surname,
        role: user.role
      })
    } else {
      res.status(404).json({ message: 'Invalid credentials' });
    }
  } catch (e) {
    res.status(501).send({message: 'Something went wrong!'})
  }
}

module.exports = {
  login
}
