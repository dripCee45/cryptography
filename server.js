const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const dotenv = require('dotenv').config();
const cors = require('cors');
const crypt = require('./lib/crypt');

const port = 2355;
const app = express();

// Load allowed domains from JSON file
let allowedOrigins = [];

try {
  allowedOrigins = JSON.parse(fs.readFileSync('./allowed-origins.json', 'utf-8'));
  if (!Array.isArray(allowedOrigins)) {
    allowedOrigins = [];
  }
} catch (e) {
  console.error("Error loading allowed origins:", e.message);
  allowedOrigins = [];
}

console.log(allowedOrigins)

// CORS config
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
        console.log('allowed');
      return callback(null, true);
    } else {
      return callback(new Error('CORS not allowed for this domain'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/encrypting', (req, res) => {
  res.sendFile(path.join(__dirname, 'encrypt.html'));
});

app.post('/encrypt', (req, res) => {
  const { data } = req.body;
  res.json(crypt.encrypt(data));
});

app.post('/decrypt', (req, res) => {
  const { data } = req.body;
  console.log(data)
  console.log(crypt.decrypt(data));
  res.json(crypt.decrypt(data));
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
