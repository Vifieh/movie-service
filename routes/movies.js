const express = require("express");
const {getMovies, createMovie, getMovie, updateMovie, deleteMovie, deleteMovies, searchMoviesByTitle, getRecentMovies} = require("../controllers/movies")

const router = express.Router();

router
    .route("/recent")
    .get(getRecentMovies)

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

router
    .route("/?")
    .get(searchMoviesByTitle)

module.exports = router;