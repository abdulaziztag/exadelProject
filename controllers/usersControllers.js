const User = require('../models/users');
const Account = require('../models/account')

const addCategory = async (req,res) => {
  try {
    const user = await User.findOne({_id: req.body.userId})
    user.categories.push({typeOfCategory: req.body.category.type, categoryName: req.body.category.categoryName})
    user.save()
    res.status(200).send(user.categories)
  } catch (e) {
    res.status(500).send({message: 'Something went wrong!'})
  }
}

const deleteCategory = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.body.userId})
    user.categories = user.categories.filter(key => {
      return key._id.toString() !== req.body._id
    })
    user.save()
    res.status(200).send(user.categories)
  } catch (e) {
    res.status(500).send({message: 'Something went wrong!'})
  }
}

const getAccounts = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.body.userId})
    const accounts = await Account
      .find(
        {_id: {$in: user.accounts}},
        ['title', 'cash', 'currency']
      )
    res.status(200).send(accounts)
  } catch (e) {
    res.status(501).send(e)
  }
}

const getCategories = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.body.userId})
    if (user) {
      res.status(200).send(user.categories)
    } else {
      res.status(404).send({message: 'User not found!'})
    }
  } catch (e) {
    res.status(501).send({message:  'Something went wrong!'})
  }
}

module.exports = {
  getAccounts,
  getCategories,
  addCategory,
  deleteCategory
}
