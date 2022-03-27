const express = require('express')
const router = express.Router()
const { getUsers, addUsers, editUser, deleteUser } = require('../controllers/usersControllers')

router.get('/', getUsers)

router.post('/', addUsers)

router.put('/', editUser)

router.delete('/:id', deleteUser)

module.exports = router
