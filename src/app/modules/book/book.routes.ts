import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = Router();

// router.post('/', UserController.insertIntoDB);
router.post(
  '/create-book',
  validateRequest(BookValidation.create),
  BookController.insertIntoDB
);
router.get('/', BookController.getAllFromDB);
router.get('/:id', BookController.getDataById);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.deleteDataById
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.update),
  BookController.updateIntoDB
);

export const BookRoutes = router;
