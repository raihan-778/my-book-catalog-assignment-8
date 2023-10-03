import { NextFunction, Request, Response, Router } from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from './../../../enums/user';
// import validateRequest from '../../middlewares/validateRequest';

import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { OrderController } from './order.controller';

const router = Router();

// Middleware to decode and verify the JWT token
const decodeTokenMiddleware = async (
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
router.post(
  '/create-Order',

  auth(ENUM_USER_ROLE.CUSTOMER),
  decodeTokenMiddleware,
  //   validateRequest(BookValidation.create),
  OrderController.createOrder
);
// router.get(
//   '/',

//   auth(ENUM_USER_ROLE.ADMIN),
//   decodeTokenMiddleware,
//   OrderController.getAllFromDB
// );
router.get(
  '/',

  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  decodeTokenMiddleware,
  OrderController.getAllOrders
);
router.get(
  '/:id',

  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  decodeTokenMiddleware,
  OrderController.getDataById
);
// router.get('/:id', BookController.getDataById);
// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.ADMIN),
//   BookController.deleteDataById
// );
// router.patch(
//   '/:id',
//   auth(ENUM_USER_ROLE.ADMIN),
//   validateRequest(BookValidation.update),
//   BookController.updateIntoDB
// );

export const OrderRoutes = router;
