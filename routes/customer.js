const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();
const verify  = require('./verifytoken');
const jwt = require('jsonwebtoken');
// validation
const Joi = require('@hapi/joi');
const { customerValidation } = require('../validation');




router.get('/', verify ,async (req,res) => {
  Customer.find({}, (err, data) => {
    res.json(data);
  })
})


router.get('/search/:container/:customername', verify,  (req, res) => {
  Customer.find({container: req.params.container , CustomerName: req.params.customername}, (err, data) => {
    res.json(data);
  })
}) 

router.get('/customerProfile/:id', verify,  (req ,res) => {
  Customer.find({ClientNum: req.params.id}, (err, data) => {
    res.json(data);
  })
})

router.patch('/edit/:id', verify,  (req,res) => {
  var change = "CustomerName";
  console.log(req.body.CustomerInfo);
  Customer.updateMany({ClientNum: req.params.id}, {$set: {CustomerName: req.body.CustomerInfo.CustomerName, CustomerFamily: req.body.CustomerInfo.CustomerFamily, CustomerCity: req.body.CustomerInfo.CustomerCity, CustomerStreet: req.body.CustomerInfo.CustomerStreet, CustomerApartment: req.body.CustomerInfo.CustomerApartment, CustomerFloor: req.body.CustomerInfo.CustomerFloor, CustomerStatus: req.body.CustomerInfo.CustomerStatus}}, (err, data) => {
    console.log(data);
    console.log(err);
    res.json(data);
  });
})


router.get('/allcustomers/:container', verify,  async (req , res) => {
  const pageSize = 10;
  const page = req.query.page || 1;
  const count = await Customer.countDocuments();
  const customers = await Customer.find({Container: req.params.container})
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  res.json({
    page,
    totalPages: Math.ceil(count / pageSize),
    totalProducts: count,
    customers
  });
});


router.post('/addCustomer', verify , async (req, res) => {

  var clientNum = req.body.CustomerInfo.ClientNum;
  const {error} = customerValidation(req.body.CustomerInfo);
  if(error) return res.status(400).send(error.details); 


  const ClientNumCheck = await Customer.findOne({ClientNum: clientNum});
  if(ClientNumCheck)  {
    clientNum = Math.floor(Math.random() * 999999);
  }
  const customer = new Customer({
    CustomerName: req.body.CustomerInfo.CustomerName,
    CustomerFamily: req.body.CustomerInfo.CustomerFamily,
    CustomerCity: req.body.CustomerInfo.CustomerCity,
    CustomerStreet: req.body.CustomerInfo.CustomerStreet,
    CustomerApartment: req.body.CustomerInfo.CustomerApartment,
    CustomerFloor: req.body.CustomerInfo.CustomerFloor,
    CustomerStatus: req.body.CustomerInfo.CustomerStatus,
    Container: req.body.CustomerInfo.Container,
    ClientNum: clientNum,
  })


  try {
    const savedCustomer = await customer.save();
    res.send({user: customer._id});
    console.log(savedCustomer);
  } catch(err) {
    res.status(400).send(err);
  }



 
  console.log(req.body);

 
});




module.exports = router;