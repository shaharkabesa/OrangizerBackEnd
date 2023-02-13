const mongoose = require('mongoose');


const customerSchema = mongoose.Schema({
  CustomerName: {
    type: String,
    required: true,
  },
  CustomerFamily: {
    type: String,
    required: true,
 
  },
  CustomerCity: {
    type: String,
    required: true,

  },  
  CustomerStreet: {
    type: String,
    required: true
  },  
  CustomerApartment: {
    type: String,
    required: true
  },
  CustomerFloor: {
    type: String,
    required: true
  },  
  CustomerStatus: {
    type: String,
    required: true
  },
  ClientNum: {
    type: Number,
    required: true
  },
  Container: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Customers', customerSchema);