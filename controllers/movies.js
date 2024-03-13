
// @desc     Get all movies
// @route    Get /api/movies
// @access   Public
exports.getMovies = (request, response, next) => {
    response.status(200).json({success: true, message: "Show all movies"});
}

// @desc     Create movies
// @route    Post /api/movies
// @access   Public
exports.createMovie = (request, response, next) => {
    response.status(201).json({success: true, message: "Create movie"});
}

// @desc     Create movies
// @route    Post /api/movies
// @access   Public
exports.getMovie = (request, response, next) => {
    response.status(200).json({success: true, message: `Get movie ${request.params.id}`});
}

// @desc     Create movies
// @route    Post /api/movies
// @access   Public
exports.updateMovie = (request, response, next) => {
    response.status(204).json({success: true, message: `Update movie ${request.params.id}`});
}

// @desc     Create movies
// @route    Post /api/movies
// @access   Public
exports.deleteMovie = (request, response, next) => {
    response.status(204).json({success: true, message: `Delete movie ${request.params.id}`});
}

// @desc     Create movies
// @route    Post /api/movies
// @access   Public
exports.deleteMovies = (request, response, next) => {
    response.status(204).json({success: true, message: `Delete movies`});
}