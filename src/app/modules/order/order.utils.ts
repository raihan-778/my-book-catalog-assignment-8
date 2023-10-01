import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { NextFunction, Request, Response } from 'express';

export const decodeTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  const verifyToken = jwtHelpers.verifyToken(
    token as string,
    config.jwt.refresh_secret as Secret
  );

  // Verify and decode the JWT here, and attach the user information to req.user
  // You can use libraries like 'jsonwebtoken' for this purpose
  // Assuming the token is in the 'Authorization' header
  // Verify and decode the token here
  // ...

  // Attach user information to the request
  req.user = verifyToken; // Replace with the decoded token
  next();
};
