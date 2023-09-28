import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'

import validateAuth from '../../middleware/validateAuth'
import validateRequest from '../../middleware/validationRequest'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'

const router = express.Router()
//get users profile route
router.get(
  '/users/my-profile',
  validateAuth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.getUserProfile
)
router.patch(
  '/users/my-profile',
  validateAuth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUserProfile
)
//create user route
// router.post(
//   '/create-user',
//   validateAuth(ENUM_USER_ROLE.ADMIN),
//   validateRequest(UserValidation.createUserZodSchema),
//   UserController.createUser
// )

//get singel users route
router.get(
  '/users/:id',
  validateAuth(ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUser
)

//updatesingel users route
router.patch(
  '/users/:id',
  validateAuth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
)

//delete singel users route
router.delete(
  '/users/:id',
  validateAuth(ENUM_USER_ROLE.ADMIN),

  UserController.deleteUser
)

//get all users route
router.get(
  '/users',
  validateAuth(ENUM_USER_ROLE.ADMIN),

  UserController.getAllUsers
)

export const UserRoutes = router

//route & service level validation steps for update semesters
//01-->Ensure o1--> Route Level:Update--> title & code must be given or neither.
//02--> Ensure 2-->Servide Level:Update-->Mapping title & code
