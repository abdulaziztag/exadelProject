const Account = require('../models/account')
const User = require('../models/users')

const getAccountInfo = async (req, res) => {
  try {
    const account = await Account.findOne({_id: req.body._id})
    !!account ?
      res.status(200).send(account) :
      res.status(401).send({
        message: 'Account did not find, log in again or try it later'
      })
  } catch (e) {
    res.status(501).send({message: 'Something went wrong'})
  }
}

const addAccount = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.body.userId})
    const account = await Account.create({
      cash: req.body.cash || 0,
      currency: req.body.currency,
      description: req.body.description,
      transactions: [],
      piggyBank: {}
    })
    await User.findByIdAndUpdate({_id: req.body.userId}, {accounts: [...user.accounts, account._id]})
    res.status(200).send(account)
  } catch (e) {
    res.status(501).send(e)
  }
}

const deleteAccount = async (req, res) => {
  try {
    await Account.deleteOne({_id: req.body._id})
    const user = await User.findOne({_id: req.body.userId})
    const accounts = user.accounts
    await User.findByIdAndUpdate({_id: req.body.userId}, {
      accounts: accounts.filter(key => key !== req.body._id)
    })
    res.status(200).send({message: 'Successfully deleted!'})
  } catch (e) {
    res.status(501).send({message: 'Something went wrong!'})
  }
}

const editAccountInfo = async (req, res) => {
  try {

  } catch (e) {

  }
}

module.exports = {
  addAccount,
  getAccountInfo,
  deleteAccount
}
