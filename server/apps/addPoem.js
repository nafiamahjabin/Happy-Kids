const mysql = require('mysql');
const db = require('../dbms/database');

const initAddPoemApp = (app) => {
    app.post('/addPoem', (req, res) => {
        let {title, src, category} = req.body;
        var sql = "INSERT INTO tbl_poem (po_id, ??, ??, ??, po_date) VALUES (NULL, ?, ?, ?, CURRENT_DATE())";
        var fields = ['po_title', 'po_src','po_category', title,src,category];
        var query = mysql.format(sql, fields);
        console.log(query);
        db.query(query, (error, results, fields) => {
            if(error){
                res.json({message: 'There is an error in query processing'}).status(400);
            }else{
                res.json({message: '1 poem added'}).status(200);
            }
        })
    
    });
};

module.exports = initAddPoemApp;