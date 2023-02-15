const mongoose = require('mongoose');


const DiarySchema = mongoose.Schema({
  
  
  clientName: {
    type: String,
    required: true
  },  
  address: {
    type: String,
    required: true
  },
  interested: {
    type: String,
    required: true
  }, 
  meetingdate: {
    type: String,
    required: true
  }, 
  hour: {
    type: String,
    required: true
  },
  diaryNum: {
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
module.exports = mongoose.model('Diarys', DiarySchema);