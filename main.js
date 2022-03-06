const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.json())

const users = [
  {
    name: 'Abdulaziz',
    age: 20,
    email: 'qwerty123@gmail.com',
    password: "123456"
  },
  {
    name: 'John',
    age: 12,
    email: 'asdfg123@gmail.com',
    password: "123456"
  },
  {
    name: 'Alice',
    age: 21,
    email: 'alicelol@gmail.com',
    password: "123456"
  },
  {
    name: 'Melisa',
    age: 17,
    email: 'melisa123@gmail.com',
    password: "123456"
  },
  {
    name: 'Vale',
    age: 27,
    email: 'valevalir@gmail.com',
    password: "123456"
  }
]

app.get('/', (req, res) => {
  res.send(`
    ${
    users.map((key) => {
      return `<h2>${key.name} - ${key.age}</h2>`
    }).join('')
  }
  `)
})

app.delete('/:id', (req, res) => {
  let userID = users.findIndex((key, id) => +id === +req.params.id)
  users.splice(userID, 1)
  res.send(`Successfully deleted! New db: ${JSON.stringify(users)}`)
})

app.post('/', (req, res) => {
  let user = users.find((key) => {
    return key.email === req.body.email
  })
  user.password === req.body.password ?
    res.send(user) :
    res.send('Email or password is incorrect')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Running!')
})
