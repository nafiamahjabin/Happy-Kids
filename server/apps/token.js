let jwt = require('jsonwebtoken');

let SECRET_KEY = 'k0Hb,RUwr!fub?ABPwUdUo>EnqwM&St9uW1Q@1}Z';

const getToken = (payload) => {
    let access_token = jwt.sign(payload, SECRET_KEY);
    return access_token;
};

const getAnonymousToken = () => {
    let payload = {
        username: 'Unknown',
        firstname: 'Unknown',
        lastname: 'Unknown',
        email: 'Unknown',
        class: 'Unknown',
        school: 'Unknown',
        logged_in: false
    };

    return getToken(payload);
};

const handleToken = (app) => {
    app.post('/token-decode', (req, res) => {
        let {access_token} = req.body;
     
        
        let payload = jwt.decode(access_token, SECRET_KEY);
        res.json(payload).status(200);
    })
};

const getTokenForLoggedOutUser = (app) => {
    app.get('/logout', (req, res) => {
        
        res.json({
            access_token: getAnonymousToken()
        }).status(200);
    })
};
const getTokenForLoggedInUser = (userData) => {
    let payload = {
        username: userData.username,
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        class: userData.class,
        school: userData.school,
        logged_in: true
    };
    return getToken(payload);
};


module.exports = {

    decode: handleToken,
    loggedInUserToken: getTokenForLoggedInUser,
    loggedOutUserToken: getTokenForLoggedOutUser
};



