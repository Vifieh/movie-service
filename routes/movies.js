const express = require("express");
const {getMovies, createMovie, getMovie, updateMovie, deleteMovie, deleteMovies} = require("../controllers/movies")

const router = express.Router();

router
    .route("/")
    .get(getMovies)
    .post(createMovie)
    .delete(deleteMovies);

router
    .route("/:id")
    .get(getMovie)
    .put(updateMovie)
    .delete(deleteMovie);


module.exports = router;