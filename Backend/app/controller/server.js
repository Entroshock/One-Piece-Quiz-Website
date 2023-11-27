var express = require("express");
var http = require("http");
var path = require("path");
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

// Create and start the HTTP server on port 8080
http.createServer(app).listen(8080, function() {
    console.log("Server is running on port 8080");
});
