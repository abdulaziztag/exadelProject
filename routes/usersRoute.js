const express = require('express')
const router = express.Router()
const { getAccounts, getCategories, addCategory, deleteCategory } = require('../controllers/usersControllers')


router.post('/accounts', getAccounts)

router.post('/getCategories', getCategories)

router.post('/addCategory', addCategory)

router.post('/deleteCategory', deleteCategory)

module.exports = router
