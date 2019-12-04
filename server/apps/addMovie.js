const mysql = require('mysql');
const db = require('../dbms/database');

const initAddMovieApp = (app) => {
    app.post('/addMovie', (req, res) => {
        let {title, src} = req.body;
        var sql = "INSERT INTO tbl_movie (mov_id, ??, ??,mov_date) VALUES (NULL, ?, ?, CURRENT_DATE())";
        var fields = ['mov_title', 'mov_src', title,src];
        var query = mysql.format(sql, fields);
        console.log(query);
        db.query(query, (error, results, fields) => {
            if(error){
                res.json({message: 'There is an error in query processing'}).status(400);
            }else{
                res.json({message: '1 movie added'}).status(200);
            }
        })
    
    });
};

module.exports = initAddMovieApp;