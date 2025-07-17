import logger from '../config/logger.js';
import ApiError from '../utils/apiError.js';

export const errorHandler = (err, req, res, next) => {
  let error = err;
  
  if (!(error instanceof ApiError)) {
    error = new ApiError(500, 'Error interno del servidor');
  }

  logger.error(`${error.statusCode}: ${error.message}`);
  
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};