//import libraries
import  express  from "express";
import session from 'express-session';
import http from 'http';
import path from 'path';
import url from 'url';
import bcrypt from 'bcryptjs'
import * as db from '../model/db.js';
const app = express();
import cookie from 'cookie-parser';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

import { createAccount } from "../model/db.js";

import { getUserByEmail } from "../model/db.js";

console.log("database connected");


// Set up static file serving for the Frontend directory
// This line serves all files in the Frontend directory on the server
app.use('/', express.static(path.join(__dirname, '../../../Frontend')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookie());
// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../Frontend/index.html'));
});

app.get('/createAccount', (req,res) => {
    res.sendFile(path.join(__dirname, '../../../Frontend/createAccount.html'))
});

app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname, '../../../Frontend/login.html'))
})
//end route

app.use(session({
    secret: 'your_secret_key', // A secret key for session encoding
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure: true if using HTTPS
}));


app.post('/createAccount', async (req, res) => {
    try {
        // Extract data from request body
        const { userEmail, userFirstName, userLastName, userName, userPw } = req.body;
        // Call the createAccount function
        const result = await createAccount(userEmail, userFirstName, userLastName, userName, userPw);
        // Send back a success response or redirect
        res.redirect("/login")
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).send('Error creating account');
    }
});

app.post('/login', async (req, res) => {
    try {
        const { userEmail, userPw } = req.body;
        // Fetch the user from the database by email
        const user = await db.getUserByEmail(userEmail);

        if (user && await bcrypt.compare(userPw, user.userPw)) {
            // Login success, setting up the user session
            req.session.user = { id: user.id, email: user.userEmail }; // Adjust as per your user object
            res.redirect('/');
        } else {
            // Login failed
            res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Create and start the HTTP server on port 8080
http.createServer(app).listen(8080, function() {
    console.log("Server is running on port 8080");
});

