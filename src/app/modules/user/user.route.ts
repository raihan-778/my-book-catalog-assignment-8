import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router.post('/', UserController.insertIntoDB);
router.get('/', UserController.getAllFromDB);
router.get('/:id', UserController.getDataById);
// router.patch(
//   '/users/my-profile',
//   validateAuth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
//   validateRequest(UserValidation.updateUserZodSchema),
//   UserController.updateUserProfile

export const UserRoutes = router;
