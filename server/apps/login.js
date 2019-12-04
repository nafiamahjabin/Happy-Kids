let mysql = require('mysql');
let db = require('../dbms/database');
let bcrypt = require('bcrypt');
let token = require('./token');

let loginFunc = (req, res) => {
    let {username, password} = req.body;

    if (username && password) {


        let sql = 'SELECT * from tbl_user where ??=?';
        let data = ['username', username];

        let query = mysql.format(sql, data);

        let noUser = 'No user found with this mail address';

        db.query(query, (error, results, fields) => {
            if (error) {
                res.json({message: noUser}).status(400);
            } else {
                if (results.length === 0) {
                    res.json({message: noUser}).status(400);
                } else {
                    let user = results[0];
                    bcrypt.hash(password, user.salt, (err, hash) => {
                        if (err) {
                            res.send({message: 'Login hash error'}).status(200);
                        } else if (hash == user.en_password) {
                            let _token = token.loggedInUserToken(user);
                            res.json({
                                access_token: _token,
                                message: 'Login Successful'
                            }).status(200);
                        } else {
                            res.send({message: 'Login failed'}).status(200);
                        }
                    });
                }
            }
        });
    } else {
        res.status(400).json({message: 'Invalid Form Submission'});
    }
}

const initLoginApp = (app) => {
    app.post('/login', loginFunc);
};

module.exports = initLoginApp;
