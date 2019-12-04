let mysql = require('mysql');
let db = require('../dbms/database');

let initGetPoemApp = app => {

    app.post('/getPoem', (req, res) => {

        let {data} = req.body;
        console.log(data);
        var sql = "SELECT po_title, po_src  FROM tbl_poem WHERE ??=?";
        var fields = ['po_category', data];
        var query = mysql.format(sql, fields);
        console.log(query);
        db.query(query, (error, results, fields) => {
            if(error) res.send('Unknown error occured');
            else {
                res.json(results).status(200);
            }
        });
    });

};

module.exports = initGetPoemApp;