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

import { getUserById } from "../model/db.js";

import { deleteUserById } from "../model/db.js";

import { updateUserProfile } from "../model/db.js";

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

// API endpoints for quiz results
app.get('/api/luffy', (req, res) => {
    res.status(200).json(
        { name: 'Monkey D. Luffy',
          age: 19,
          imageUrl: 'https://cdn.discordapp.com/attachments/516294200711446549/1182334842290061442/15867fa528a99f651fabcfcfb94c6e25.jpg?ex=65845221&is=6571dd21&hm=c31b561101f51ca89c9f8c243035822862a8c7ab607845b8447b00a9f49d9101&',
          description: 'Individuals with Luffys personality are free-spirited, adventurous, and full of energy. They tend to be optimistic, fearless, and have a strong sense of loyalty towards their friends. Luffy is the captain of the Straw Hat Pirates, known for his cheerful and determined nature. He possesses the ability of the Gum-Gum Fruit, granting him rubber-like abilities, and he dreams of becoming the Pirate King.'

        });
  });
  
  app.get('/api/zoro', (req, res) => {
    res.status(200).json(
        { name: 'Roronoa Zoro',
          age: 21,
          imageUrl: 'https://cdn.discordapp.com/attachments/516294200711446549/1182333081793859644/ba0e8fca261197d524790ce1d30fecd9.jpg?ex=6584507d&is=6571db7d&hm=4e4135096545e5876303e5de7e1fb036627b975bbef673c6f02d4b29be8cdaa2&',
          description: 'Those akin to Zoro are fiercely determined, disciplined, and focused individuals. They display exceptional strength, dedication to their goals, and a sense of honor. Zoro is the swordsman of the Straw Hat Pirates, highly skilled in wielding three swords, and has a strong ambition to become the worlds greatest swordsman.'

        });
  });
  
  app.get('/api/sanji', (req, res) => {
    res.status(200).json(
        { name: 'Sanji',
          age: 21, 
          imageUrl: 'https://cdn.discordapp.com/attachments/516294200711446549/1182333161049423924/b953240a84721b265ad91d383b6bba21.jpg?ex=65845090&is=6571db90&hm=57c02099d68c440fbb6d7d2d7d13c9b0391648bbf40125cee8f736771b50b747&',
          description: 'People resembling Sanji are charming, suave, and have a charismatic personality. They tend to be passionate about their interests, possess great culinary skills, and show chivalry towards others. Sanji is the cook of the Straw Hat Pirates, known for his culinary expertise and combat skills using his legs. He dreams of finding the All Blue, a sea with fish from all over the world.'

        });
  });
  
  app.get('/api/nami', (req, res) => {
    res.status(200).json(
        { name: 'Nami',
          age: 20, 
          imageUrl: 'https://cdn.discordapp.com/attachments/516294200711446549/1182334924406136842/main-qimg-0e40301245c5ebdddb69a0084491381a-lq.jpeg?ex=65845234&is=6571dd34&hm=a773c38cc8903b422c26085de05017a8cecc618827b007bca40a09209251ba25&',
          description: 'Individuals sharing traits with Nami are adventurous, intelligent, and have a knack for exploration. They value knowledge, have a sharp wit, and can navigate through challenging situations. Nami is the navigator of the Straw Hat Pirates, highly skilled in cartography and navigation. Her goal is to map the entire world.'

        });
  });
  
  app.get('/api/usopp', (req, res) => {
    res.status(200).json(
        { name: 'Usopp',
          age: 19,
          imageUrl: 'https://cdn.discordapp.com/attachments/516294200711446549/1182334747314245722/how-is-usopp-going-to-be-really-brave-v0-gpnl7b8dafpb1.webp?ex=6584520a&is=6571dd0a&hm=a34f0603a4ef1eac42ee8b255b2c42140e9fdce47e28b64684f2f1d6f025b3ae&',
          description: 'Those similar to Usopp are imaginative, creative, and resourceful individuals. They have a knack for storytelling, problem-solving, and often display courage when faced with adversity. Usopp is the sniper and the crews storyteller, known for his tall tales and his skill with a slingshot. He aspires to become a brave warrior of the sea.'

        });
  });
  
  app.get('/api/chopper', (req, res) => {
    res.status(200).json(
        { name: 'Tony Tony Chopper',
          age: 17, 
          imageUrl: 'https://cdn.discordapp.com/attachments/516294200711446549/1182333549525876816/8c5.jpg?ex=658450ec&is=6571dbec&hm=50e9e5227923f174c0cee0d53dc525bc1ddffebd5276936cd01466eccf1e97a3&',
          description: 'Individuals akin to Chopper are compassionate, caring, and nurturing. They have a deep empathy towards others, especially animals, and possess a heartwarming nature. Chopper is the doctor of the Straw Hat Pirates, a reindeer with the ability to transform into different forms using the Human-Human Fruit. He dreams of becoming a great doctor.'

        });
  });
  
  app.get('/api/robin', (req, res) => {
    res.status(200).json(
        { name: 'Nico Robin',
          age: 30, 
          imageUrl: 'https://cdn.discordapp.com/attachments/516294200711446549/1182335289293807626/1_-AOtii9rKb8l1RYKAMfbOA.jpg?ex=6584528b&is=6571dd8b&hm=5abfaece45de85230de83bb8d4df6e0c421353548bccfe4b48444f73cdbb4ffa&',
          description: 'People resembling Robin are intellectual, curious, and possess a great interest in history and culture. They are often knowledgeable, calm, and have a profound understanding of the world. Robin is the archaeologist of the Straw Hat Pirates, seeking the secrets of the Void Century and the history of the world.'

        });
  });
  
  app.get('/api/franky', (req, res) => {
    res.status(200).json(
        { name: 'Franky',
          age: 36 ,
          imageUrl: 'https://cdn.discordapp.com/attachments/516294200711446549/1182333912723247164/E7_lTkWWUAUDTa1.jpg?ex=65845143&is=6571dc43&hm=573b22da1f47e060ee572a4921a413590344220aec1c0a02932a0c9de9214788&',
          description: 'Individuals with Frankys traits are builders, inventors, and possess mechanical prowess. They are outgoing, energetic, and have a passion for creating and repairing things. Franky is the shipwright of the Straw Hat Pirates, known for his cyborg enhancements and his dream to build a ship that can circumnavigate the world.'
        });
  });
  
  app.get('/api/brook', (req, res) => {
    res.status(200).json(
        { name: 'Brook',
          age: 90,
          imageUrl: 'https://cdn.discordapp.com/attachments/516294200711446549/1182334238368997376/Luffy_Asks_Brook_to_Join_Again.PNG.webp?ex=65845191&is=6571dc91&hm=0fa8533fb22b16d790e5e86cc7710696aee6a7bfa1433a9437ae5966b9a70842&',
          description: 'Those similar to Brook are cheerful, entertaining, and have a love for music and performance. They often bring joy to others and have a lively and humorous nature. Brook is the musician of the Straw Hat Pirates, a living skeleton with musical abilities. He dreams of reuniting with Laboon, a whale he befriended.'
        });
  });
  
  app.get('/api/jimbei', (req, res) => {
    res.status(200).json(
        { name: 'Jimbei',
          age: 46,
          imageUrl: 'https://cdn.discordapp.com/attachments/516294200711446549/1182334476362199100/jinbei_wtf_face_by_law67_d3eat6b-fullview.jpg?ex=658451c9&is=6571dcc9&hm=9aa01918b6d4c8f66e95246bf46c4a88d18875b75373a07fe5f562726037098c&',
          description: 'Individuals with Jimbeis traits are wise, serene, and have a strong sense of justice and honor. They are calm, balanced, and often possess martial arts skills. Jimbei is a Fish-Man karate master and a helmsman for the Straw Hat Pirates. He values camaraderie and has a sense of responsibility towards others.'
        });
  });
//api end points for other operations
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

app.post('/api/deleteAccount', async (req, res) => {
    if (req.session && req.session.user) {
        try {
            await db.deleteUserById(req.session.user.id);
            req.session.destroy(); // Destroy the session after account deletion
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    } else {
        res.status(401).send('Not logged in');
    }
});


app.post('/api/updateProfile', async (req, res) => {
    console.log("is this working?")
    if (req.session && req.session.user) {
        try {
            console.log("will this work?")
            await db.updateUserProfile(req.session.user.id, req.body);
            res.json({ message: 'Profile successfully updated' });
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

