var mongoose = require('mongoose')

var User = mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  }
})
User.plugin(require('passport-local-mongoose'))

module.exports = mongoose.model('user', User)
