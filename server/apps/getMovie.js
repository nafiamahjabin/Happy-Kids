let mysql = require('mysql');
let db = require('../dbms/database');

let initGetMovieApp = app => {

    app.get('/getMovies', (req, res) => {

        var sql = "SELECT mov_title,mov_src  FROM tbl_movie";
        console.log(sql);
        db.query(sql, (error, results, fields) => {
            if(error) res.send('Unknown error occured');
            else {
                res.json(results).status(200);
            }
        });
    });

};

module.exports = initGetMovieApp;