const Account = require('../models/account')
const User = require('../models/users')

const getAccountInfo = async (req, res) => {
  try {
    const account = await Account.findOne({_id: req.body._id})
    res.status(200).send(account)
  } catch (e) {
    throw new Error(e)
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
    throw new Error(e)
  }
}

module.exports = {
  addAccount,
  getAccountInfo
}
