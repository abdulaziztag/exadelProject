const bcrypt = require('bcrypt');

function registerUser(user) {
  users.push({
    id: Math.random(),
    email: user.email,
    password: bcrypt.hashSync(user.password, 10)
  });
}

function getUserByEmail(email) {
  return users.find(user => user.email === email);
}

function loginUser(email, password) {
  const user = getUserByEmail(email);
  console.log(bcrypt.compareSync(password, user.password))
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
}

const users = []

module.exports = {
  loginUser,
  getUserByEmail,
  users,
  registerUser
}
