const express = require("express");
const http = require("http");
const path = require("path");
const db = require('../model/db');// Import db.js
var app = express();

// Set up static file serving for the Frontend directory
// This line serves all files in the Frontend directory on the server
app.use('/', express.static(path.join(__dirname, '../../../Frontend')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Route to serve the index.html file
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../../Frontend/index.html'));
});


app.post('/createAccount', (req, res) => {
    const userData = req.body;
    
    // Simple validation (you should enhance this)
    if (!userData.username || !userData.userEmail) {
        return res.status(400).send('Username and email are required');
    }

    db.createUser(userData, (err, result) => {
        if (err) {
            return res.status(500).send('Error registering new user');
        }
        res.status(201).send('User registered successfully');
    });
});


// Create and start the HTTP server on port 8080
http.createServer(app).listen(8080, function() {
    console.log("Server is running on port 8080");
});
