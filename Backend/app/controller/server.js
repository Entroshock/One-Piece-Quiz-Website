//import libraries
import  express  from "express";
import session from 'express-session';
import http from 'http';
import path from 'path';
import url from 'url';
import bcrypt from 'bcryptjs'
import * as db from '../model/db.js';
const app = express();
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

import { createAccount } from "../model/db.js";

import { getUserByEmail } from "../model/db.js";

console.log("database connected");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SECRET_KEY, // A secret key for session encoding
    resave: false, //won't resave the session variable if nothing is changed
    saveUninitialized: false,
    cookie: { secure: false } // Set secure: true if using HTTPS
}));

// Route to serve the index.html file
app.get('/', (req, res) => {
    if (req.session && req.session.user) {
        // User is logged in, redirect to profile or another page
        res.redirect('/homepage');
    } else {
        // User is not logged in, show the login page
        res.sendFile(path.join(__dirname, '../../../Frontend/login.html'));
    }
});


app.get('/createAccount', (req,res) => {
    res.sendFile(path.join(__dirname, '../../../Frontend/createAccount.html'))
});

app.get('/homepage', (req,res) => {
    res.sendFile(path.join(__dirname, '../../../Frontend/index.html'))
})

app.get('/profile', (req,res) => {
    res.sendFile(path.join(__dirname, '../../../Frontend/profile.html'))
})

app.get('/api/user', async (req, res) => {
    if (req.session && req.session.user) {
        try {
            const user = await db.getUserById(req.session.user.id); 
            res.json(user); // Send user data as JSON
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    } else {
        res.status(401).send('Not logged in');
    }
});

//end route

app.post('/createAccount', async (req, res) => {
    try {
        // Extract data from request body
        const { userEmail, userFirstName, userLastName, userName, userPw } = req.body;
        // Call the createAccount function
        const result = await createAccount(userEmail, userFirstName, userLastName, userName, userPw);
        // Send back a success response or redirect
        res.redirect("/")
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).send('Error creating account');
    }
});

app.post('/login', async (req, res) => {
    console.log(req.sessionID);
    try {
        const { userEmail, userPw } = req.body;
        // Fetch the user from the database by email
        const user = await db.getUserByEmail(userEmail);
        if (user && await bcrypt.compare(userPw, user.userPw)) {
            // Login success, setting up the user session
            req.session.user = { id: user.userId, email: user.userEmail }; 
            console.log("session created", req.session)
            res.redirect('/homepage'); // Redirect to the homepage or another appropriate page
        } else {
            // Login failed
            res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Set up static file serving for the Frontend directory
// This line serves all files in the Frontend directory on the server
app.use('/', express.static(path.join(__dirname, '../../../Frontend')));

// Create and start the HTTP server on port 8080
http.createServer(app).listen(8080, function() {
    console.log("Server is running on port 8080");
});

