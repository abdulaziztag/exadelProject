const express = require('express')
const router = express.Router()
const { editUser, getAccounts } = require('../controllers/usersControllers')


router.put('/', editUser)

router.post('/accounts', getAccounts)

module.exports = router
