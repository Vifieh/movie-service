const express = require('express');
const dotenv = require("dotenv");
const { Pool } = require('pg');

//load env vars
dotenv.config({path: "./config/config.env"});

const app = express();
const PORT = process.env.PORT || 3000;  // Set the port

// PostgreSQL connection configuration
const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'movie-service',
    password: ' ',
    port: 5432
});

// Middleware to parse JSON bodies
app.use(express.json());

// Home Page
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Home Page</h1><p>This is the home page of the CRUD API.</p>');
});

// Start the server
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);