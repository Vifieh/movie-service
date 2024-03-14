const express = require('express');
const dotenv = require("dotenv");
const morgan = require("morgan");
const errorHandler = require("./middleware/error");

const app = express();

//Route files
const movies = require("./routes/movies");

//load env vars
dotenv.config({path: "./config/config.env"});


//Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Middleware to parse JSON bodies
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/api/movies", movies);
app.use(errorHandler);
const PORT = process.env.PORT || 3000;  // Set the port

// Start the server
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);