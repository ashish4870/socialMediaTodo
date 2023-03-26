const JWT = require('jsonwebtoken');

const {   
  errorResponse,
  statusCodes } = require('../../utils/response/response.handler');
const client = require('../../utils/redis/redis-utils');

const validateAuth = async (req, res, next) => {
  try {
    const errors = {}
    if (!req.headers.authorization) {
      throw { code: statusCodes.STATUS_CODE_UNAUTHORIZED, message: 'Unauthorized Access!' };
    }
    const authToken = req.headers.authorization.split(' ')[1];
    const authDecode = JWT.verify(authToken, process.env.JWT_SECRET);
    const userId = await client.getKey(authToken)
    if (authDecode.userId && userId) {
      req.userId = authDecode.userId
    } else {
        if (!userId) {
          errors.user = 'Token expired'
        } 
        if (!authDecode.userId) {
          errors.user = 'Unauthorized user'
        }
    }
    if(Object.keys(errors).length ===0){
      return next()
    }
    return errorResponse({
      res, code: statusCodes.STATUS_CODE_UNAUTHORIZED, message: 'Sign In Again', error: { errors, isValid: false },
    });
  } catch (error) {
    console.log('error: ', error)
    return errorResponse({
      res, code: statusCodes.STATUS_CODE_FAILURE, message: 'Unexpected Error', error,
    });
  }
}

module.exports = {
  validateAuth,
};
