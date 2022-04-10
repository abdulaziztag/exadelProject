const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    password: {type: String, required: true},
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: Number,
      required: true
    },
    role: {
      type: String,
      require: true
    },
    categories: [
      {
        categoryName: String,
        type: String
      }
    ],
    accounts: [String]
  },
  {timestamps: true}
)

module.exports = mongoose.model('User', userSchema);
