const {Movie} = require("../models/Movie");
const sequelize = require("../config/sequelize");
const ErrorResponse = require("../utils/errorResponse");
const {Op} = require("sequelize");
const asyncHandler = require("../middleware/async");

// @desc     Get all movies
// @route    Get /api/movies
// @access   Public
exports.getMovies = asyncHandler(async (request, response, next) => {
        const {title} = request.query;
        if (!title) {
            const movies = await sequelize.models.Movie.findAll();
            response.status(200).json({totalItems: movies.length, movieResponseList: movies});
        } else
            this.searchMoviesByTitle(request, response, next);
    }
);

// @desc     Create movies
// @route    Post /api/movies
// @access   Public
exports.createMovie = asyncHandler(async (request, response, next) => {
    const {title, genre, releaseDate, language, rating} = request.body;
    const movie = await sequelize.models.Movie.create({
        title,
        genre,
        releaseDate,
        language,
        rating
    });
    response.status(201).json({movieResponse: movie});
});

// @desc     Get movie
// @route    Get /api/movies/:id
// @access   Public
exports.getMovie = asyncHandler(async (request, response, next) => {
    const {id} = request.params;
    const movie = await sequelize.models.Movie.findByPk(id);
    if (movie) {
        response.status(200).json({movieResponse: movie});
    } else
        return next(new ErrorResponse(`Movie not found with id of ${id}`, 404));
});

// @desc     Update movie
// @route    Put /api/movies/:id
// @access   Public
exports.updateMovie = asyncHandler(async (request, response, next) => {
    const {id} = request.params;
    const {title, genre, releaseDate, language, rating} = request.body;
    const [movieUpdated] = await sequelize.models.Movie.update(
        {title, genre, releaseDate, language, rating},
        {where: {id}}
    );
    if (movieUpdated === 0) {
        return next(new ErrorResponse(`Movie not found with id of ${id}`, 404));
    } else
        response.status(204).json({success: true, message: `Updated movie: ${request.params.id}`});
});

// @desc     Delete movie
// @route    Delete /api/movies/:id
// @access   Public
exports.deleteMovie = async (request, response, next) => {
    try {
        const {id} = request.params
        const [movieDeleted] = await sequelize.models.Movie.destroy({where: {id}});
        if (movieDeleted === 0)
            return next(new ErrorResponse(`Movie not found with id of ${id}`, 404));
        else
            response.status(204).json({success: true, message: `Deleted movie: ${request.params.id}`});
    } catch (error) {
        next(error);
    }
}

// @desc     Delete movies
// @route    Delete /api/movies
// @access   Public
exports.deleteMovies = asyncHandler(async (request, response, next) => {
    await sequelize.models.Movie.destroy({truncate: true});
    response.status(204).json({message: `Movies Deleted`});
});

// @desc     Search movie by title
// @route    Get /api/movies
// @access   Public
exports.searchMoviesByTitle = asyncHandler(async (request, response, next) => {
    const {title} = request.query;
    const movies = await sequelize.models.Movie.findAll({
        where: {title: {[Op.like]: ` %${title}% `}},
    });
    response.status(200).json({movieResponseList: movies});
});

// @desc     Get recent movies
// @route    Get /api/movies/recent
// @access   Public
exports.getRecentMovies = asyncHandler(async (request, response, next) => {
    const movies = await sequelize.models.Movie.findAll({
        order: [["releaseDate", "DESC"]],
        limit: 5,
    });
    response.status(200).json({movieResponseList: movies});
});

