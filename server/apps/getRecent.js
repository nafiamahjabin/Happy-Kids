let mysql = require('mysql');
let db = require('../dbms/database');

let initGetRecentQuiz = app => {

    app.get('/recent-quiz', (req, res) => {

        var sql = "SELECT quizTitle FROM tbl_quiz where endTime< Current_Time() ORDER BY endTime DESC  LIMIT 0,1";

        db.query(sql, (error, results, fields) => {
            if (error) res.send('Unknown error occured');
            else {
                let quizTitle = results[0].quizTitle;
                let sql = "SELECT firstname, lastname,class,school, r.quizTitle, r.username FROM tbl_result as r, tbl_user as u where r.username=u.username and ??=?  ORDER BY r.score desc,r.time ";
                let fields = ['r.quizTitle', quizTitle];
                let query = mysql.format(sql, fields);
                console.log(query);
                db.query(query, (error, result, fields) => {
                    if (error) {
                        res.json({ message: 'Server error' }).status(400);
                    }
                    else {
                        res.json(result).status(200);
                    }
                })
            }
        });
    });

};
let initGetRecentCartoon = app => {

    app.get('/recent-cartoon', (req, res) => {

        var sql = "SELECT * FROM tbl_cartoon ORDER BY car_date DESC";

        db.query(sql, (error, results, fields) => {
            if (error) res.send('Unknown error occured');
            else {
                res.json(results).status(200);
            }


        });
    });

};
let initGetRecentMovie = app => {

    app.get('/recent-movie', (req, res) => {

        var sql = "SELECT * FROM tbl_movie ORDER BY mov_date DESC";

        db.query(sql, (error, results, fields) => {
            if (error) res.send('Unknown error occured');
            else {
                res.json(results).status(200);
            }


        });
    });

};
let initGetRecentPoem = app => {

    app.get('/recent-poem', (req, res) => {

        var sql = "SELECT * FROM tbl_poem ORDER BY po_date DESC";

        db.query(sql, (error, results, fields) => {
            if (error) res.send('Unknown error occured');
            else {
                res.json(results).status(200);
            }


        });
    });

};



module.exports = {
    getRecentQuiz: initGetRecentQuiz,
    getRecentCartoon: initGetRecentCartoon,
    getRecentMovie: initGetRecentMovie,
    getRecentPoem: initGetRecentPoem
}