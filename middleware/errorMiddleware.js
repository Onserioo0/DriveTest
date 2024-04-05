// middleware/errorMiddleware.js

const errorMiddleware = (err, req, res, next) => {
    // Log the error internally
    console.error(err);

    // Determine the status code of the response
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    // Send a generic error message to avoid leaking sensitive information
    res.status(statusCode).json({
        message: "An unexpected error occurred. Please try again later.",
        // Optionally, you can include more detailed information in development mode
        ...(process.env.NODE_ENV === 'development' && { error: err.message, stack: err.stack })
    });
};

module.exports = errorMiddleware;
