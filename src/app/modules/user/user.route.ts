import { Router } from 'express';

const router = Router();
// //get users profile route
// router.get(
//   '/users/my-profile',
//   validateAuth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
//   UserController.getUserProfile
// )
// router.patch(
//   '/users/my-profile',
//   validateAuth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
//   validateRequest(UserValidation.updateUserZodSchema),
//   UserController.updateUserProfile

export const UserRoutes = router;
