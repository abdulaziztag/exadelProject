const { getUserByEmail } = require('./database');

const adminGuard = (req, res, next) => {
  const user = getUserByEmail(req.user.email);

  if (user) {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
}

module.exports = {
  adminGuard,
}
