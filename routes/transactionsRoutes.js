const express = require('express')
const router = express.Router()
const { addTransaction, deleteTransaction, getTransactions, editTransaction } = require('../controllers/transactionControllers')

router.post('/add', addTransaction)

router.post('/delete', deleteTransaction)

router.post('/get', getTransactions)

router.post('/edit', editTransaction)

module.exports = router
