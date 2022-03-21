const { getUserByEmail } = require('./auth');

const jwtCallback = (jwt_payload, done) => {
  const user = getUserByEmail(jwt_payload.email);
  if (user) {
    return done(null, user);
  }
  return done(null, false);
}

module.exports = {
  jwtCallback,
}
