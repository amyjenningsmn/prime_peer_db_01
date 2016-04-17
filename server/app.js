// This is our SERVER
var express = require('express');
var mongoose = require('mongoose');
// ^ this is so we can communicate with our database
var bodyParser = require('body-parser');
// ^ this is so we can send responses back in json so it can be read in angular.
var indexRouter = require('./routes/indexRouter');
// ^ this will let us set up a mailbox (route) to our indexRouter.js
var assignmentRouter = require('./routes/assignmentRouter');
// ^ this will let us set up a mailbox (route) to our assignmentsRouter.js
var app = express();
// this initializes Express every time we see 'app' in front of something.

// [[[[[[[[[[[[[[[[[[ Global Configuration  ]]]]]]]]]]]]]]]]]]

app.use(bodyParser.json());
// I think this is supposed to be first, but Joel didn't have it first? Am I remembering wrong?

app.use(express.static('server/public'));
// This sets up a 'bucket' for our application to 'live' out of. I think? Need more clarity.


//  [[[[[[[[[[[[[[[[[[[[[[ Routers ]]]]]]]]]]]]]]]]]]]]]]

app.use('/', indexRouter);
// this sets up the route to our view index.html, need more clarity on this.
app.use('/assignmentsData', assignmentRouter);
// sets up a 'mailbox' (route) for 'mail' ($http requests) addressed ('/assignments' or 'assignments/all' etc.) to it.

//  [[[[[[[[[[[[[[[[[[[[[ MongoDB ]]]]]]]]]]]]]]]]]]]]]

//Simple
// mongoose.connect('mongodb://localhost/assignments');

// Verbose
var mongoURI = "mongodb://localhost/assignments";
// var mongoURI = "mongodb://localhost:27017/assignments";
var MongoDB = mongoose.connect(mongoURI).connection;
// Setting up our database. Is this where we define it too? I can't remember. /assignments is the name of our database. Or 'assignments'.

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});
// ^^ Helps us know if our connection to MongoDB is working

var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('Listening on port', port, "Press ctrl-c to stop")
});
