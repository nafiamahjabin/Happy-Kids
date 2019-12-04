const mysql = require('mysql');
const db = require('../dbms/database');

const initSetQuiz = (app) => {
    app.post('/set-quiz', (req, res) => {
        
        for (var key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                
                if (key == 0) {
                    let { quizTitle, startTime, endTime } = req.body[key];
                    var sqlOne = "INSERT INTO tbl_quiz (??, ??, ??) VALUES (?, ?, ?)";
                    var fields1 = ['quizTitle', 'startTime', 'endTime', quizTitle, startTime, endTime];
                    var query1 = mysql.format(sqlOne, fields1);
                    
                    db.query(query1, (error, results, fields) => {
                        if (error) {
                            res.json({ message: 'There is an error in inserting quiz processing' }).status(400);
                        }
                    })
                }
                let {quizTitle,  quesTitle, optionA, optionB, optionC, optionD, correctAns } = req.body[key];


                var sqlTwo = "INSERT INTO db_happykids.tbl_quizques (??, ??, ??,??,??,??,??) VALUES (?, ?, ?,?,?,?,?)";
                var fields2 = ['quizTitle', 'quesTitle', 'optionA', 'optionB', 'optionC', 'optionD', 'correctAns', quizTitle, quesTitle, optionA, optionB, optionC, optionD, correctAns];
                var query2 = mysql.format(sqlTwo, fields2);
               
                db.query(query2, (error, results, fields) => {
                    if (error) {
                        res.json({ message: 'There is an error in inserting quizques processing' }).status(400);
                    }
                })
            }
        }
        res.json({ message: 'Quiz Test is Set' }).status(200);

    });
};

module.exports = initSetQuiz;