const express = require('express');
const GetDoc = require('../models/File');
const  verify  = require('./verifytoken');

const router = express.Router();
const path = require('path');
// Learning to upload
const jwt = require('jsonwebtoken');
// validation
const Joi = require('@hapi/joi');
const { FileValidation } = require('../validation');


// gets all the posts
router.get('/:id', verify ,  (req, res) => {
  
  GetDoc.find({clientNum: req.params.id}).then((response) => {
    res.json(response);
  })
  
})

router.get('/search/:container/:clientNum/:id', (req, res) => {
  GetDoc.find({container: req.params.container, clientNum: req.params.clientNum, filename: req.params.id }, (err, data) => {
    res.json(data);
  })
})

router.delete('/deleteFile/:id', verify , async (req, res) => {

  GetDoc.find({fileNum: req.params.id}, (err, data) => {
    var dat = data;
    GetDoc.deleteOne({fileNum: req.params.id}, (err, data) => {
      console.log(data);
      if(data) {
        
        res.json({message:"קובץ נמחק", info: dat});
      } else {
        res.json({message:err});
      }
    
    });
  })
 
  
  
  });
  


router.post('/upload', verify , async (req, res) => {
  console.log(req.body);
  MeetingNumR = Math.floor(Math.random() * 999999);
  const {error} = FileValidation(req.body.fileDetails);
  if(error) return res.status(400).send(error.details); 
  const CheckFilesNum = GetDoc.find({MeetingNum: MeetingNumR});

  if(CheckFilesNum) {
    MeetingNumR = Math.floor(Math.random() * 999999);
  }

  const Getdoc = new GetDoc({
    originName: req.body.fileDetails.originName,
    url: req.body.fileDetails.url,
    filename: req.body.fileDetails.filename,
    description: req.body.fileDetails.description,
    clientNum: req.body.fileDetails.clientNum,
    container: req.body.fileDetails.container,
    fileNum: MeetingNumR
  })


  try {
    const savedFile = await Getdoc.save();
    res.send({savedFile: Getdoc.fileNum});
    console.log(savedFile);
  } catch(err) {
    res.status(400).send(err);
  }



 
  console.log(req.body);

 
});

module.exports = router;