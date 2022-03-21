const bcrypt = require('bcrypt');
const Users = require('../models/users')

async function getUserByEmail(email) {
  return await Users.find({name: email})
}

function loginUser(email, password) {
  const user = getUserByEmail(email);
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
}


module.exports = {
  loginUser,
  getUserByEmail
}
