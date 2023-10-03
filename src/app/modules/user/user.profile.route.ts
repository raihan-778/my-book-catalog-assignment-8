import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

import { UserController } from './user.controller';

const router = Router();

import { NextFunction, Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

// import validateRequest from '../../middlewares/validateRequest';

export const decodeTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  try {
    // Verify and decode the JWT token
    const decodedToken = jwtHelpers.verifyToken(
      token as string,
      config.jwt.secret as Secret
    );

    // Attach user information to the request
    req.user = decodedToken;
    next();
  } catch (error) {
    // Handle token verification errors (e.g., token expired, invalid token)
    console.error('Token verification error:', error);
    res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
};

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  decodeTokenMiddleware,
  UserController.getUserProfile
);

export const UserProfileRoutes = router;
