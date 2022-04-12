const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
  cash: {
    type: Number,
    required: true,
    default: 0
  },
  title: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: '$'
  },
  description: {
    type: String,
    required: true
  },
  transactions: [
    {
      title: {
        type: String,
       required: true
      },
      typeOfTransaction: {
        type: String,
        required: true
      },
      cash: {
        type: Number,
        required: true
      },
      category: [String],
      dateOfTransaction: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: false
      },
      payee: {
        type: String,
        required: true
      }
    }
  ],
  piggyBank: {
    goal: {
      type: String,
    },
    goalAmount: {
      type: Number,
    },
    savedAmount: {
      type: Number,
    }
  }
})

module.exports = mongoose.model('Account', accountSchema)
