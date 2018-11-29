var express    = require('express');
var app        = express();                 
var bodyParser = require('body-parser');
var Student     = require('./app/models/student');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/stdsys');

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) {
    console.log('Working...');
    next();
});


router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


router.route('/students')

    // create a student
    .post(function(req, res) {

        var student = new Student();   
        student.StudentId = req.body.StudentId;
		student.StudentName = req.body.StudentName;
		student.StudentAge = req.body.StudentAge;

        student.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Student created!' });
        });
    })
	
	//get all students
	.get(function(req, res) {
        Student.find(function(err, students) {
            if (err)
                res.send(err);

            res.json(students);
        });
    });
	
router.route('/students/:student_id')

    // get the student with id
    .get(function(req, res) {
        Student.findById(req.params.student_id, function(err, student) {
            if (err)
                res.send(err);
            res.json(student);
        });
    })
	
	  .put(function(req, res) {

        // update a student
        Student.findById(req.params.student_id, function(err, student) {

            if (err)
                res.send(err);

            student.StudentId = req.body.StudentId;
			student.StudentName = req.body.StudentName;
			student.StudentAge = req.body.StudentAge;
            
            student.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Student updated!' });
            });

        });
    })
	
	  // delete the Student
    .delete(function(req, res) {
        Student.remove({
            _id: req.params.student_id
        }, function(err, student) {
            if (err)
                res.send(err);

            res.json({ message: 'Student Successfully deleted' });
        });
    });

app.use('/api', router);

app.listen(port);
console.log('Server starts on port ' + port);
