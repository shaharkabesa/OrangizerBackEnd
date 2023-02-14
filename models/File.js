const mongoose = require('mongoose');


const FileSchema = mongoose.Schema({
  
  
  originName: {
    type: String,
    required: true
  },  
  url: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  }, 
  description: {
    type: String,
    required: true
  },
  clientNum: {
    type: Number,
    required: true
  }, 
  fileNum: {
    type: Number,
    required: true
  },  
  container: {
    type: String,
    required: true
  },


  date: {
    type: Date,
    default: Date.now
  } 
});
module.exports = mongoose.model('Files', FileSchema);