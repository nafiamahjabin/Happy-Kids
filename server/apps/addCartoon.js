const mysql = require('mysql');
const db = require('../dbms/database');

const initAddCartoonApp = (app) => {
    app.post('/addCartoon', (req, res) => {
        let {title, src, category} = req.body;
        var sql = "INSERT INTO tbl_cartoon (car_id, ??, ??, ??, car_date) VALUES (NULL, ?, ?, ?, CURRENT_DATE())";
        var fields = ['car_title', 'car_src','car_category', title,src,category];
        var query = mysql.format(sql, fields);
        console.log(query);
        db.query(query, (error, results, fields) => {
            if(error){
                res.json({message: 'There is an error in query processing'}).status(400);
            }else{
                res.json({message: 'Cartoon added'}).status(200);
            }
        })
    
    });
};

module.exports = initAddCartoonApp;