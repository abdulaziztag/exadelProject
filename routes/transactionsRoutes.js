const express = require('express')
const router = express.Router()
const { addTransaction, deleteTransaction, getTransactions } = require('../controllers/transactionControllers')

router.post('/add', addTransaction)

router.post('/delete', deleteTransaction)

router.post('/get', getTransactions)

module.exports = router
