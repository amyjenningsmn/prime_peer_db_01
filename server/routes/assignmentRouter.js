var express = require('express');
var router = express.Router();
var Assignment = require('../../models/assignmentModel');

// the server sent any /'assignmentsData' requests here, so we're automatically
// starting from an address of '/assignmentsData'. So the '/' below is really
// '/assignmentsData'. In the browser when we run the server, it looks like http://localhost:3000/assignmentsData/

 // what I don't understand is how it knows we're talking to our Mongo database. I know we've connected to our 'assignments' database on the server, so is it like once we've connected to a database, then express knows whenever we do requests from the router, we're requesting info from the database?
 
router.get('/', function(request, response){
    Assignment.find({}, function(err, assignments){
      // .find() means find ALL of something. But what's the 'assignments' param mean?' Could this be 'bananaSandwich' to mean all the objects we did the find() on? Because it's in our resonse.send. Yep, just tested it. That is what it means.
      if(err){
        console.log(err);
      response.sendStatus(500);
    } else {
      response.send(assignments);
      // Then this goes to our client.js as the response.data which poplulates our assignments array per the getAssignments() function.
    }
  })
})

router.post('/add', function(request, response){
  console.log('Requested with a body of', request.body);
  // our request.body is the form data we collected in index.html, sendData() function ran on click of "submit".

  var data = request.body;

  var newAssignment = new Assignment({
    assignment_number: data.assignment_number,
    student_name: data.student_name,
    score: data.score,
    date_completed: data.date_completed

    // this could be simplified to:
    // var newAssignment = new Assignment(request.body);
    // It knows what Assignment is because we've required the model/Schema.
  })

  newAssignment.save(function(err){
    // who's method is .save()? Mongoose? Express? And since it's part of a router.post, that's probably letting it know where we're saving it to.
      if(err){
        console.log(err);
        response.sendStatus(500);
      } else {
        console.log('Assignment saved!');
        response.sendStatus(200);
      }
    });
});

module.exports = router;
