let mysql = require('mysql');
let db = require('../dbms/database');
let bcrypt = require('bcrypt');
let _config = require('../config');
let config = _config();
let token = require('./token');

let initGetProfileApp = app => {

    app.post('/get-profile', (req, res) => {
        let { username } = req.body;
        var sql = "SELECT * FROM tbl_user WHERE ??=?";
        var fields = ['username', username];
        var query = mysql.format(sql, fields);
        console.log(query);
        db.query(query, (error, results, fields) => {
            if (error) res.send('Unknown error occured');
            else {
                res.json(results).status(200);
            }
        });
    });

};
let initUpdateProfileApp = app => {

    app.post('/update-profile', (req, res) => {
        let { firstname, lastname, email, mobile, cls, school, oldPassword, newPassword, username } = req.body;


        let sql = 'SELECT * from tbl_user where ??=?';
        let data = ['username', username];

        let query = mysql.format(sql, data);

        let noUser = 'No user found with this mail address';

        db.query(query, (error, results, fields) => {
            if (error) {
                res.json({ message: noUser }).status(400);
            } else {
                if (results.length === 0) {
                    res.json({ message: noUser }).status(400);
                } else {
                    let user = results[0];
                    bcrypt.hash(oldPassword, user.salt, (err, oldHash) => {
                        if (err) {
                            res.send({message: 'Login hash error'}).status(200);
                        } else if (oldHash == user.en_password) {
                            bcrypt.genSalt(config.saltRounds, (err1, salt) => {

                                if (err1) {
                                    res.send({ message: 'Salt generation failed' });
                                } else {
                    
                                    bcrypt.hash(newPassword, salt, (err, hash) => {
                    
                                        if (err) res.status(400).send({ message: 'Hash Generation Failed' });
                                        else {
                    
                                            let sql = "UPDATE tbl_user SET ??=?, ??=?,??=?,??=?,??=?,??=?,??=?,??=? WHERE ??=?";
                                            let data = ['firstname',firstname, 'lastname', lastname,'email', email,'mobile',mobile, 'class', cls,'school',school, 'en_password',hash, 'salt',salt, 'username',username ];
                                            let query = mysql.format(sql, data);
                                            console.log(query);
                                            db.query(query, (error, results, fields) => {
                                                if (error) {
                                                    res.status(400).send({
                                                        message: 'User registration failed'
                                                    })
                                                } else {
                                                    let user = {
                                                        username: username,
                                                        firstname: firstname,
                                                        lastname: lastname,
                                                        email: email,
                                                        class: cls,
                                                        school: school
                                                    }
                                                    let _token = token.loggedInUserToken(user);
                                                    res.json({
                                                        access_token: _token,
                                                        message: 'Update Successful'
                                                    }).status(200);
                                                }
                                            });
                    
                                        }
                                    })
                    
                                }
                    
                            });
                        } else {
                            res.send({message: 'Password did not matched'}).status(200);
                        }
                    });

                    
                }
            }
        });

    });

};

module.exports = {
    getProfile: initGetProfileApp,
    updateProfile: initUpdateProfileApp
};