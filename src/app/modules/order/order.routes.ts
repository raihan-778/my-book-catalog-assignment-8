import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

import { OrderController } from './order.controller';

const router = Router();

// router.post('/', UserController.insertIntoDB);
router.post(
  '/create-Order',
  //   validateRequest(BookValidation.create),
  OrderController.insertIntoDB
);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), OrderController.getAllFromDB);
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
