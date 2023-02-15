const express = require('express');
const Diary = require('../models/Diarys');
const router = express.Router();
const verify  = require('./verifytoken');
const jwt = require('jsonwebtoken');
// validation
const Joi = require('@hapi/joi');
const { DiaryValidation } = require('../validation');




router.get('/:id', verify ,async (req,res) => {
  console.log(req.params.id);
  Diary.find({ClientNum: req.params.id}, (err, data) => {
    res.json(data);
    console.log(data);
  })
})


router.get('/search/:MeetingNum', verify, (req, res) => {
  Diary.find({MeetingNum: req.params.MeetingNum}, (err, data) => {
    res.json(data);
    console.log(data);
  })
}) 

router.patch('/edit/:id' , verify, (req,res) => {

  console.log(req.body.MeetingInfo);
  Diary.updateMany({ClientNum: req.params.id}, {$set: {CustomerFullName: req.body.MeetingInfo.CustomerFullName, MeetingTheme: req.body.MeetingInfo.MeetingTheme, MeetingDate: req.body.MeetingInfo.MeetingDate, MeetingSummary: req.body.MeetingInfo.MeetingSummary, MeetingStatus: req.body.MeetingInfo.MeetingStatus}}, (err, data) => {
    console.log(data);
    console.log(err);
    res.json(data);
  });
})



router.post('/addMeeting', verify , async (req, res) => {
  console.log(req.body);
  MeetingNumR = Math.floor(Math.random() * 999999);
  const {error} = DiaryValidation(req.body.DiaryInfo);
  if(error) return res.status(400).send(error.details); 
  const CheckMeetingNum = Meeting.find({MeetingNum: MeetingNumR});

  if(CheckMeetingNum) {
    MeetingNumR = Math.floor(Math.random() * 999999);
  }

  console.log(req.body.MeetingInfo);

  const dairy = new Diary({
    clientName: req.body.MeetingInfo.CustomerFullName,
    address: req.body.MeetingInfo.MeetingTheme,
    interested: req.body.MeetingInfo.MeetingDate,
    meetingdate: req.body.MeetingInfo.MeetingHour,
    hour: req.body.MeetingInfo.MeetingSummary,
    diaryNum: MeetingNumR,
    Container: req.body.MeetingInfo.Container,

  })

  

  try {
    
    const savedCustomer = await meeting.save();
    res.status(200).send({message:"Meeting Created"});

  } catch(err) {
    res.status(400).send(err);
  }
});

router.delete('/deleteMeeting/:id', verify , async (req, res) => {
  Diary.deleteOne({MeetingNum: req.params.id}, (err, data) => {
  if(data) {
    res.json({message:"פגישה נמחקה"});
  } else {
    res.json({message:err});
  }

});


});

router.get('/search/:container/:clientNum/:id', (req, res) => {
  Diary.find({container: req.params.container, ClientNum: req.params.clientNum, CustomerFullName: req.params.id }, (err, data) => {
    res.json(data);
  })
})


module.exports = router;