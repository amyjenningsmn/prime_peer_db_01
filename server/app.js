var express = require('express');
var mongoose = require('mongoose');
var assignment = require('./routes/assignments');
var index = require('./routes/index');

var mongoURI = "mongodb://localhost:27017/assignments";
var MongoDB = mongoose.connect(mongoURI).connection;

var app = express();
app.use('/', index);
app.use(express.static('server/public'));
app.use('/assignment', assignment);

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});

var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('Listening on port', port, "Press ctrl-c to stop")
});
