const express = require('express')
const router = express.Router()
const { editUser, getAccounts, getCategories } = require('../controllers/usersControllers')


router.put('/', editUser)

router.post('/accounts', getAccounts)

router.post('/getCategories', getCategories)

module.exports = router
