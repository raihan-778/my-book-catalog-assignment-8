import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

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

// router.post('/', UserController.insertIntoDB);
router.get('/', UserController.getAllFromDB);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  decodeTokenMiddleware,
  UserController.getUserProfile
);
router.get('/:id', UserController.getDataById);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteDataById
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateIntoDB
);

export const UserRoutes = router;
