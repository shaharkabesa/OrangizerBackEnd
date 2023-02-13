const express = require('express');
const mongoose = require('mongoose');
// Body-parser packed is used to read json data
const bodyParser = require('body-parser');
const cors = require('cors');



// will include dotenv config for concealing info
require('dotenv/config');


const app = express();

// initiating cors 
app.use(cors(
  {
    origin: "*"
  }
));

// must write app.use(bodyParser.json()) in order for the api to recognize json
app.use(bodyParser.json());

mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://ixfish:ATPo8kwmgKqsoALj@appointment.aneccs2.mongodb.net/organizer?retryWrites=true&w=majority', () => {
  console.log("connected to db");
});
 

//Middlewares 

// Import routes
const authRoute = require('./routes/verifytoken');
const postRoute = require('./routes/posts');
const customerRoute = require('./routes/customer');
const meetingRoute = require('./routes/meeting');
const fileRoute = require('./routes/files');
const user = require('./routes/user');
app.use('/api/posts', postRoute);
app.use('/api/user', user);
app.use('/api/customer', customerRoute);
app.use('/api/meeting', meetingRoute);
app.use('/api/file', fileRoute);
//ROUTES
app.get('/', (req,res) => {
  res.send("We are on home");
});


// How to start listening to the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
