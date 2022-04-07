const User = require('../models/users');

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users)
}

const addUsers = async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log('ss')
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
    throw new Error(err)
  }
}

const editUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body._id,
      req.body,
      {new: true}
    );
    res.status(204).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}

const deleteUser = async (req, res) => {
  await User.deleteOne({_id: req.params.id})
  res.send({message: 'Deleted successfully!'})
}

module.exports = {
  getUsers,
  addUsers,
  editUser,
  deleteUser
}
