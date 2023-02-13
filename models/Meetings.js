const mongoose = require('mongoose');


const meetingSchema = mongoose.Schema({
  CustomerFullName: {
    type: String,
    required: true,
  },  
  MeetingTheme: {
    type: String,
    required: true,
  },
  MeetingDate: {
    type: String,
    required: true,
  },

  MeetingSummary: {
    type: String,
    required: true,
  },  
  MeetingStatus: {
    type: String,
    required: true,
  }, 
  Container: {
    type: String,
    required: true,
  },
  ClientNum: {
    type: Number,
    required: true
  },
  MeetingNum: {
    type: Number,
    required: false
  },
  MeetingCreationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Meeting', meetingSchema);