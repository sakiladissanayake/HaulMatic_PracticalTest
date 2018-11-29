var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StudentSchema   = new Schema({
    StudentId: String,
	StudentName: String,
	StudentAge: String,
});

module.exports = mongoose.model('Student', StudentSchema);