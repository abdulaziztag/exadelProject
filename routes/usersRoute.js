const express = require('express')
const router = express.Router()
const User = require('../models/users');

router.get('/', async (req, res) => {
  const users = await User.find({});
  res.send(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.put('/', async (req, res) => {
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
})

router.delete('/:id', async (req, res) => {
  await User.deleteOne({_id: req.params.id})
  res.send({message: 'Deleted successfully!'})
})

module.exports = router
