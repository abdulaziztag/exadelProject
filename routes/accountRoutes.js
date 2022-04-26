const express = require('express')
const { addAccount, getAccountInfo, deleteAccount, editAccountInfo } = require('../controllers/accountControllers')
const router = express.Router()

router.post('/add', addAccount)
router.post('/get', getAccountInfo)
router.post('/delete', deleteAccount)
router.post('/edit', editAccountInfo)

module.exports = router
