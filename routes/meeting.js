const express = require('express');
const Meeting = require('../models/Meetings');
const router = express.Router();
const verify  = require('./verifytoken');
const jwt = require('jsonwebtoken');
// validation
const Joi = require('@hapi/joi');
const { MeetingValidation } = require('../validation');




router.get('/:id', verify ,async (req,res) => {
  console.log(req.params.id);
  Meeting.find({ClientNum: req.params.id}, (err, data) => {
    res.json(data);
    console.log(data);
  })
})


router.get('/search/:MeetingNum', verify, (req, res) => {
  Meeting.find({MeetingNum: req.params.MeetingNum}, (err, data) => {
    res.json(data);
    console.log(data);
  })
}) 

router.patch('/edit/:id' , verify, (req,res) => {

  console.log(req.body.MeetingInfo);
  Meeting.updateMany({ClientNum: req.params.id}, {$set: {CustomerFullName: req.body.MeetingInfo.CustomerFullName, MeetingTheme: req.body.MeetingInfo.MeetingTheme, MeetingDate: req.body.MeetingInfo.MeetingDate, MeetingSummary: req.body.MeetingInfo.MeetingSummary, MeetingStatus: req.body.MeetingInfo.MeetingStatus}}, (err, data) => {
    console.log(data);
    console.log(err);
    res.json(data);
  });
})



router.post('/addMeeting', verify , async (req, res) => {
  console.log(req.body);
  MeetingNumR = Math.floor(Math.random() * 999999);
  const {error} = MeetingValidation(req.body.MeetingInfo);
  if(error) return res.status(400).send(error.details); 
  const CheckMeetingNum = Meeting.find({MeetingNum: MeetingNumR});

  if(CheckMeetingNum) {
    MeetingNumR = Math.floor(Math.random() * 999999);
  }

  console.log(req.body.MeetingInfo);

  const meeting = new Meeting({
    CustomerFullName: req.body.MeetingInfo.CustomerFullName,
    MeetingTheme: req.body.MeetingInfo.MeetingTheme,
    MeetingDate: req.body.MeetingInfo.MeetingDate,
    MeetingSummary: req.body.MeetingInfo.MeetingSummary,
    MeetingStatus: req.body.MeetingInfo.MeetingStatus,
    Container: req.body.MeetingInfo.Container,
    ClientNum: req.body.MeetingInfo.ClientNum,
    MeetingNum: MeetingNumR
  })

  

  try {
    
    const savedCustomer = await meeting.save();
    res.status(200).send({message:"Meeting Created"});

  } catch(err) {
    res.status(400).send(err);
  }
});

router.delete('/deleteMeeting/:id', verify , async (req, res) => {
Meeting.deleteOne({MeetingNum: req.params.id}, (err, data) => {
  if(data) {
    res.json({message:"פגישה נמחקה"});
  } else {
    res.json({message:err});
  }

});


});


module.exports = router;