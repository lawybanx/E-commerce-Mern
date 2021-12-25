import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

export const auth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Add user from payload
      req.user = decoded;

      next();
    } catch (error) {
      // Verify token
      res.status(400);
      throw new Error('Token is not valid');
    }
  }
  if (!token) {
    // Check for token
    res.status(401);
    throw new Error('No token, authorization denied');
  }
});
