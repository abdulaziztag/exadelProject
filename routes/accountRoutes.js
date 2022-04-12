const express = require('express')
const { addAccount, getAccountInfo, deleteAccount } = require('../controllers/accountControllers')
const router = express.Router()

router.post('/add', addAccount)
router.post('/get', getAccountInfo)
router.post('/delete', deleteAccount)

module.exports = router
