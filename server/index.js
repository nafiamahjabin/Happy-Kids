let express = require('express');

let middlewares = require('./middlewares');

let addCartoon = require('./apps/addCartoon');
let getCategory = require('./apps/cartoonCategory');
let getCartoon = require('./apps/getCartoon');
let getMovie = require('./apps/getMovie');
let addMovie = require('./apps/addMovie');
let addPoem = require('./apps/addPoem');
let setQuiz = require('./apps/setQuiz');
let token =  require('./apps/token')
let login = require('./apps/login');
let register = require('./apps/register');
let getQuiz = require('./apps/getQuizes')
let result = require('./apps/result');
let profile = require('./apps/getProfile');
let recent= require('./apps/getRecent');
let poem = require('./apps/getPoem');
let port = 3000;

let app = express();

// initializing middlewares
middlewares(app);

// initializing applications

addCartoon(app);
addPoem(app);
addMovie(app);
getCategory(app);
getCartoon(app);
getMovie(app);
setQuiz(app);
token.decode(app);
token.loggedOutUserToken(app);
login(app);
register(app);
getQuiz.past(app);
getQuiz.running(app);
getQuiz.upcomming(app);
getQuiz.getQues(app);
result.setScore(app);
result.checkResult(app);
result.getStandings(app);
profile.getProfile(app);
profile.updateProfile(app);
recent.getRecentCartoon(app);
recent.getRecentMovie(app);
recent.getRecentQuiz(app);
recent.getRecentPoem(app);
poem(app);
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});