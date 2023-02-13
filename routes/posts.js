const express = require('express');
const  verify  = require('./verifytoken');
const User = require('../models/User');
const router = express.Router();

// gets all the posts
router.get('/', verify,  (req, res) => {
  res.json({posts: {title: "my first post", 
  description: 'Random data you shouldnt accsess without being logged in'
  }})
})

module.exports = router;