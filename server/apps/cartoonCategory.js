let mysql = require('mysql');
let db = require('../dbms/database');

let initGetCategoryApp = app => {

    app.get('/getCategory', (req, res) => {

        let sql = 'SELECT Distinct car_category FROM tbl_cartoon';


        db.query(sql, (error, results, fields) => {
            if(error) res.send('Unknown error occured');
            else {
                res.json(results).status(200);
            }
        });
    });

};

module.exports = initGetCategoryApp;