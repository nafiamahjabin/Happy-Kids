let mysql = require('mysql');
let db = require('../dbms/database');

let bcrypt = require('bcrypt');
let _config = require('../config');
let config = _config();
let token = require('./token');

const initRegistrationApp = (app) => {
    app.post('/register', (req, res) => {

        console.log(req.body);

        let { firstname, lastname, email, username, cls, school, mobile, password } = req.body;
        bcrypt.genSalt(config.saltRounds, (err1, salt) => {

            if (err1) {
                res.send({ message: 'Salt generation failed' });
            } else {

                bcrypt.hash(password, salt, (err, hash) => {

                    if (err) res.status(400).send({ message: 'Hash Generation Failed' });
                    else {

                        let sql = "INSERT INTO tbl_user(??,??,??,??,??,??,??,??,??) values(?,?,?,?,?,?,?,?,?)";
                        let data = ['firstname', 'lastname', 'email', 'mobile', 'class', 'school', 'username', 'en_password', 'salt', firstname, lastname, email, mobile, cls, school, username, hash, salt];

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
                                    message: 'Registration Successful'
                                }).status(200);
                            }
                        });

                    }
                })

            }

        });

    });
};

module.exports = initRegistrationApp;
