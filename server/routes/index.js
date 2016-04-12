var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var Assignment = require('../../models/assignmentModel');


router.get('/assignments', function(request, response, next){
    return Assignment.find({}).exec(function(err, assignments){
      if(err) throw new Error(err);
      response.send(JSON.stringify(assignments));
      next();
    });
});

router.get('/', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/index.html'));
})

module.exports = router;
