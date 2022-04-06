const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
  cash: {
    type: Number,
    required: true,
    default: 0
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
      typeOfTransactions: {
        type: String,
        required: true
      },
      cash: {
        type: Number,
        required: true
      },
      category: {
        type: String,
        required: true
      },
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
      required: true
    },
    goalAmount: {
      type: Number,
      required: true
    },
    savedAmount: {
      type: Number,
      required: true
    }
  }
})

module.exports = mongoose.model('Account', accountSchema)
