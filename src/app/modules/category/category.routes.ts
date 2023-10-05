import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = Router();

// router.post('/', UserController.insertIntoDB);
router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.insertIntoDB
);
router.get('/', CategoryController.getAllFromDB);
router.get('/:id', CategoryController.getDataById);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteDataById
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.update),
  CategoryController.updateIntoDB
);

export const CategoryRoutes = router;
