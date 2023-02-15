const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  
  
  name: {
    type: String,
    required: true,
    min: 4,
    max: 255
  },  
  username: {
    type: String,
    required: true,
    min: 4,
    max: 255
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },  
  container: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Users', userSchema);