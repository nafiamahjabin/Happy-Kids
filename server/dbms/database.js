let mysql = require('mysql');

let db = mysql.createConnection(
    {
        host: 'localhost',
        database: 'db_happykids',
        user: 'root',
        password: ''
    }
);

db.connect();
module.exports = db;