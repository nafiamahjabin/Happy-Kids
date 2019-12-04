let mysql = require('mysql');
let db = require('../dbms/database');

let checkResult = app => {
    app.post('/check-result', (req,res) => {
        let {username, quizTitle} = req.body;
     
        let sql = "Select * from tbl_result where ?? =? and ??=?";
        let fields = ['username',username,'quizTitle',quizTitle];
        let query = mysql.format(sql, fields);
        db.query(query, (err,result,field)=>{
            if(err) res.json({message: "Server Error"}).status(400);
            else
            {
                if(result.length===0) res.json({
                    submitted: false,
                    message: 'result 0'
                }).status(200);
                else res.json({
                    submitted: true,
                    score: result[0].score,
                    time: result[0].time
                }).status(200)

            }
        })

    });
};
let setScore = app => {
    app.post('/set-score', (req,res) => {
        let {username, quizTitle, score, time} = req.body;
        
        let sql = "INSERT INTO db_happykids.tbl_result (id, ??, ??,??,??) VALUES (NULL, ?, ?, ?,?)";
        let fields = ['username','quizTitle','time', 'score',username,quizTitle,time,  score];
        let query = mysql.format(sql, fields);
        
        db.query(query, (error, results, fields) => {
            if(error){
                res.json({message: 'There is an error in query processing'}).status(400);
            }else{
                res.json({message: 'score added'}).status(200);
            }
        })

    });
};
let getStandings = app => {
    app.post('/standings', (req,res) => {
        let {quizTitle} = req.body;
        let sql = "SELECT firstname, lastname,class,school,score,time, r.username FROM tbl_result as r, tbl_user as u where r.username=u.username and ??=?  ORDER BY r.score desc,r.time ";
        let fields = ['r.quizTitle', quizTitle];
        let query = mysql.format(sql,fields);
        console.log(query);
        db.query(query, (error, result, fields) => {
            if(error){
                res.json({message: 'Server error'}).status(400);
            }
            else {
                console.log(result);
                res.json(result).status(200);
            }
        })
    });

};

module.exports = {
    checkResult: checkResult,
    setScore: setScore,
    getStandings: getStandings
}