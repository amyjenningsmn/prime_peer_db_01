var express = require('express');
var router = express.Router();
var path = require('path');
var Assignment = require('../../models/assignmentModel');


router.post('/create', function(request, response){
  console.log(request.body);

  var assignment = request.body;

  var ass = new Assignment({
    assignment_number: assignment.assignment_number,
    student_name: assignment.student_name,
    score: assignment.score,
    date_completed: assignment.date_completed
  })
  response.sendStatus(200);
});

router.get('/all', function(request, response) {
  Assignment.find({}, function(err, assignments){
      if(err){
        console.log(err);
      } else {
        response.send(assignments);
      }
  })
})
module.exports = router;
