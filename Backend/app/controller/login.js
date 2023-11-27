var express = require('express');
var http = require('http');
var app = express();
var session = require('express-session');
var validator = require('validator');
var bcrypt = require('bcrypt');
var redis = require('redis');
const RedisStore = require("connect-redis").default;

var model = require('../model/db');

app.use('/', express.static(path.join(__dirname, '../../../Frontend')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const saltRounds = 10;

let redisClient = redis.createClient();
redisClient.connected().catch(console.error);

app.use(
    session({
        store: new RedisStore({ client: redisClient }),  
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
        })
); 

app.post("/login", function (req, res){
    var user  = req.body.user;
    var pwd  = req.body.pwd;

    user = validator.blacklist(user, '/\{}:;'); // missing  ' and "" for full JSON sanitization
    // don't edit the pwd, it will not be inserted plain in the DB, no risk of code injection

    console.log("user: " + user + " pwd: " + pwd);

    bcrypt.hash(pwd, saltRounds, function(err, hash) { // every time you calculate an hash it will be different, but match the same origin
    		console.log("hashed: " + hash);
    });
    
    var mySavedPwd;
    
    for (i in users)
        if (users[i].username == user)
            mySavedPwd = users[i].hashed_pwd;	

    bcrypt.compare(pwd, mySavedPwd, function(err, result) {
  			if(result) {
            // Passwords match
            console.log("Logged In.");
            req.session.user = user;
            // res.redirect("/bar");
            res.send("Welcome, " + user);
        } else {
            // Passwords don't match
            console.log("Sorry.");
            res.send("Invalid details");
        } 
    });
});