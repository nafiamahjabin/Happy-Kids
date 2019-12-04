let mysql = require('mysql');
let db = require('../dbms/database');

let getRunningQuiz = app => {

    app.get('/running-quiz', (req, res) => {

        var sql = "SELECT *  FROM tbl_quiz Where startTime<=CURRENT_TIMESTAMP() AND endTime>=CURRENT_TIMESTAMP()";
        console.log(sql);
        db.query(sql, (error, results, fields) => {
            if(error) res.send('Unknown error occured');
            else {
                res.json(results).status(200);
            }
        });
    });

};
let getUpcommingQuiz = app => {

    app.get('/upcomming-quiz', (req, res) => {

        var sql = "SELECT *  FROM tbl_quiz Where startTime>CURRENT_TIMESTAMP()";
        console.log(sql);
        db.query(sql, (error, results, fields) => {
            if(error) res.send('Unknown error occured');
            else {
                res.json(results).status(200);
            }
        });
    });

};

let getPastQuiz = app => {

    app.get('/past-quiz', (req, res) => {

        var sql = "SELECT *  FROM tbl_quiz Where endTime<CURRENT_TIMESTAMP()";
        console.log(sql);
        db.query(sql, (error, results, fields) => {
            if(error) res.send('Unknown error occured');
            else {
                res.json(results).status(200);
            }
        });
    });

};

let getQuizQues = app => {

    app.post('/get-quiz-ques', (req, res) => {
        let {quizTitle} = req.body;
        var sql = "SELECT *  FROM tbl_quizques Where ??=?";
        var fields = ['quizTitle', quizTitle];
        var query = mysql.format(sql,fields);
        console.log(query);
        db.query(query, (error, results, fields) => {
            if(error) res.send('Unknown error occured');
            else {
                res.json(results).status(200);
            }
        });
    });

};
module.exports = {
    running: getRunningQuiz,
    upcomming: getUpcommingQuiz,
    past: getPastQuiz,
    getQues: getQuizQues
};
