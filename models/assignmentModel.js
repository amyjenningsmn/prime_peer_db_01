var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({
    assignment_number: Number,
    student_name: String,
    score: Number,
    date_completed: Date
});

var Assignment = mongoose.model('Assignment', assignmentSchema);
// this creates a template (model) for our database so that everything is saved the same way. Not sure what 'Assignment' in ('Assignment', assignmentSchema) means??

module.exports = Assignment;
