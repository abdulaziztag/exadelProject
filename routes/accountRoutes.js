const express = require('express')
const { addAccount, getAccountInfo } = require('../controllers/accountControllers')
const router = express.Router()

router.post('/add', addAccount)
router.post('/get', getAccountInfo)

module.exports = router
