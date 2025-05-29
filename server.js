const express = require('express');
const path = require('path');
const axios = require('axios');
// const axios = require('axios/dist/browser/axios.cjs'); // browser
// const axios = require('axios/dist/node/axios.cjs'); // node
const bodyparser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require('cors'); // Enable CORS middleware for cross-origin requests.
const nodemailer = require('nodemailer'); // Import the nodemailer library for email sending functionality.
const port=2355;

//Fetch API Libraries
const crypt = require('./lib/crypt');


const app = express();

app.use(express.urlencoded({
    extended: true
}));

const allowedOrigins = [
    'https://example.com',
    'https://myapp.com',
    'http://localhost:2355'  // Dev environment (Vite)
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
        return callback(null, true);
        } else {
        return callback(new Error('CORS not allowed for this domain'));
        }
    },
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
 
 // Apply JSON parsing and CORS with configured options as global middleware.
 app.use(express.json());
//  app.use(cors(corsOptions));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/encrypting', (req, res)=>{
    res.sendFile(path.join(__dirname, 'encrypt.html'));
});

app.post('/encrypt', (req,res)=>{
    var data = req.body.data;
    res.json(crypt.encrypt(data));
});
app.post('/decrypt', (req,res)=>{
    var data = req.body.data;
    res.json(crypt.decrypt(data));
});


//404 Page
app.use((req, res)=>{
    res.status(404);
    res.sendFile(path.join(__dirname, '404.html'));
})


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});