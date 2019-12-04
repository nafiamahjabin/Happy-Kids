let mysql = require('mysql');
let db = require('../dbms/database');

let initGetCartoonApp = app => {

    app.post('/getCartoon', (req, res) => {

        let {data} = req.body;
        console.log(data);
        var sql = "SELECT car_title, car_src  FROM tbl_cartoon WHERE ??=?";
        var fields = ['car_category', data];
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

module.exports = initGetCartoonApp;