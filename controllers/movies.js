const { Movie } = require("../models/Movie");
const sequelize = require("../config/sequelize");

// @desc     Get all movies
// @route    Get /api/movies
// @access   Public
exports.getMovies = async (request, response, next) => {
    console.log("here");
    try {
        const movies = await sequelize.models.Movie.findAll();
        console.log(movies)
        response.status(200).json({movieResponseList: movies});
    } catch (error) {
        console.log(error)
        response.status(500).json({error: 'Unable to retrieve movies'});
    }
}

// @desc     Create movies
// @route    Post /api/movies
// @access   Public
exports.createMovie = async (request, response, next) => {
    try {
        const {title, genre, releaseDate, language, rating} = request.body;
        const movie = await sequelize.models.Movie.create({
            title,
            genre,
            releaseDate,
            language,
            rating
        });
        response.status(201).json({movieResponse: movie});
    } catch (error) {
        response.status(500).json({error: "Unable to create movie"});
    }
}

// @desc     Get movie
// @route    Get /api/movies/:id
// @access   Public
exports.getMovie = async (request, response, next) => {
    try {
        const {id} = request.params;
        const movie = await sequelize.models.Movie.findByPk(id);
        if (movie) {
            response.status(200).json({movieResponse: movie});
        } else
            response.status(404).json({error: "Movie not found"});
    } catch (error) {
        response.status(500).json({error: 'Unable to retrieve movie'});
    }
}

// @desc     Update movie
// @route    Put /api/movies/:id
// @access   Public
exports.updateMovie = async (request, response, next) => {
    try {
        const {id} = request.params;
        const {title, genre, releaseDate, language, rating} = request.body;
        const [movieUpdated] = await sequelize.models.Movie.update(
            {title, genre, releaseDate, language, rating},
            {where: {id}}
        );
        if (movieUpdated === 0) {
            response.status(404).json({error: "Movie not found"});
        } else
            response.status(204).json({success: true, message: `Updated movie: ${request.params.id}`});
    } catch (error) {
        response.status(500).json({error: 'Unable to update movie'});
    }
}

// @desc     Delete movie
// @route    Delete /api/movies/:id
// @access   Public
exports.deleteMovie = async (request, response, next) => {
    try {
        const {id} = request.params
        const [movieDeleted] = await sequelize.models.Movie.destroy({where: {id}});
        if (movieDeleted === 0)
            response.status(404).json({error: "Movie not found"});
        else
            response.status(204).json({success: true, message: `Deleted movie: ${request.params.id}`});
    } catch (error) {
        res.status(500).json({error: 'Unable to delete movie'});
    }
}

// @desc     Delete movies
// @route    Delete /api/movies
// @access   Public
exports.deleteMovies = async (request, response, next) => {
    try {
        await sequelize.models.Movie.destroy({truncate: true});
        response.status(204).json({message: `Movies Deleted`});
    } catch (error) {
        response.status(500).json({error: 'Unable to delete movies'});
    }
}

// @desc     Search movie by title
// @route    Get /api/movies
// @access   Public
exports.searchMoviesByTitle = async (request, response, next) => {
    console.log("type");
    try {
        const {title} = request.query;
        const movies = await sequelize.models.Movie.findAll({
            where: {title: {[Op.like]: ` %${title}% `}},
        });
        response.status(200).json({movieResponseList: movies});
    } catch (error) {
        response.status(500).json({error: 'Unable to search movies'});
    }
}

// @desc     Get recent movies
// @route    Get /api/movies/recent
// @access   Public
exports.getRecentMovies = async (request, response, next) => {
    try {
        const movies = await sequelize.models.Movie.findAll({
            order: [["releaseDate", "DESC"]],
            limit: 5,
        });
        console.log(movies)

        response.status(200).json({movieResponseList: movies});
    } catch (error) {
        console.log(error)
        response.status(500).json({error: 'Unable to retrieve recent movies'});
    }
}

