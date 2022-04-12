const Users = require('../models/users')

async function getUserByEmail(email) {
  return await Users.findOne({email})
}

async function loginUser(email, password) {
  const user = await getUserByEmail(email);
  if (user && password === user.password) {
    return user;
  }
  return null;
}


module.exports = {
  loginUser,
  getUserByEmail
}
