// src/presentation/middlewares/errorHandler.js
function errorHandler(err, req, res, next) {
    console.error('❌ Error:', err.message);
    
    let statusCode = 500;
    
    // Validation errors → 400
    if (err.message.includes('required') || 
        err.message.includes('Invalid') ||
        err.message.includes('must be') ||
        err.message.includes('cannot') ||
        err.message.includes('Cannot')) {
        statusCode = 400;
    }
    
    // Not found errors → 404
    if (err.message.includes('not found')) {
        statusCode = 404;
    }

    // Validation error จาก SQLite หรือ library อื่น
    if (err.message && err.message.includes('SQLITE_CONSTRAINT')) {
        return res.status(409).json({
            error: 'Database constraint error'
        });
    }
    
    res.status(statusCode).json({
        error: err.message || 'Internal server error'
    });
}

module.exports = errorHandler;