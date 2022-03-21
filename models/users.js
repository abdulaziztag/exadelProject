const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true
    },
    age: {
      type: Number,
      require: true,
      min: 18,
      max: 120
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hobbies: [String],
    edited: {
      type: Number,
      default: 0
    }
  },
  {timestamps: true}
)

userSchema.methods.sayHi = function () {
  console.log(`Hi, I'm ${this.name}`);
}

userSchema.statics.findByEmail = function (email) {
  return this.where({ email: new RegExp(email, 'i') }).exec();
}

userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, 'i') });
}

userSchema.virtual('namedEmail')
  .get(function () {
    return `${this.name} <${this.email}>`;
  });

userSchema.pre('save', function (next) {
  this.edited++;
  next();
})

userSchema.post('save', function (doc) {
  console.log(`${doc.name} has been saved`);
});

module.exports = mongoose.model('User', userSchema);
