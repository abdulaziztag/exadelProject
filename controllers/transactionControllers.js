const Account = require('../models/account')

const addTransaction = async (req, res) => {
  try {
    const account = await Account.findOne({_id: req.body._id})
    account.transactions.push({
      title: req.body.title,
      typeOfTransaction: req.body.typeOfTransaction,
      cash: req.body.cash,
      category: req.body.category,
      dateOfTransaction: req.body.dateOfTransaction,
      description: req.body.description,
      payee: req.body.payee
    })
    if (req.body.typeOfTransaction === "income") {
      account.cash += req.body.cash
    } else {
      account.cash -= req.body.cash
    }
    await account.save()
    res.status(200).send(account.transactions)
  } catch (e) {
    res.status(501).send({message: 'Something went wrong!'})
  }
}

const deleteTransaction = async (req, res) => {
  try {
    const account = await Account.findOne({_id: req.body._id})
    const transactionId = account.transactions.findIndex(key => key._id.toString() === req.body.transactionId)
    if (account.transactions[transactionId].typeOfTransaction === 'income') {
      account.cash -= account.transactions[transactionId].cash
    } else {
      account.cash += account.transactions[transactionId].cash
    }
    account.transactions.splice(transactionId, 1)
    await account.save()
    res.status(200).send({message: 'Deleted  successfully!'})
  } catch (e) {
    res.status(501).send({message: 'Something went wrong!'})
  }
}

const getTransactions = async (req, res) => {
  try {
    const account = await Account.findOne({_id: req.body._id})
    if (account) {
      res.status(200).send(account.transactions)
    } else {
      res.status(404).send({message: 'Account not found'})
    }
  } catch (e) {
    res.status(501).send({message: 'Something went wrong!'})
  }
}

const editTransaction = async (req, res) => {
  try {
    const account = await Account.findOne({_id: req.body._id})
    const transactionId = account.transactions.findIndex(key => {
      return key._id.toString() === req.body.transactionId
    })
    if (transactionId === -1) {
      res.status(501).send( {message: 'Something went wrong!'})
    }
    account.transactions[transactionId] = {
      ...req.body.data
    }
    account.save()
    res.status(200).send(account.transactions)
  } catch (e) {
    console.log(e)
    res.status(501).send({message: 'Something went wrong!'})
  }
}

module.exports = {
  addTransaction,
  deleteTransaction,
  getTransactions,
  editTransaction
}
