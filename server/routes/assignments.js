var express = require('express');
var router = express.Router();
var path = require('path');
var Assignment = require('../../models/assignmentModel');


router.post('/create', function(request, response, next){
  console.log(request.body);

  var ass = new Assignment({
    assignment_number: request.body.assignment_number,
    student_name: request.body.student_name,
    score: request.body.score,
    date_completed: request.body.date_completed
  });
  ass.save(function(err){
      if(err) console.log('meow %s', err);
      response.send(ass.toJSON());
      next();
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
})
module.exports = router;
