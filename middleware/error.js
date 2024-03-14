const errorHandler = (error, request, response, next) => {

   response.status(error.statusCode || 500).json({
       success: false,
       error: error.message || "server Error"
   });
}

module.exports = errorHandler;