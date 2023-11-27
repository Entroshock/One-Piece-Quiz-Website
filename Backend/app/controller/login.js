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

