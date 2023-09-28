import express from 'express'
import validateRequest from '../../middleware/validationRequest'
import { AuthController } from './auth.controller'
import { AuthValidation } from './auth.validation'

const router = express.Router()

router.post(
  '/signup',
  validateRequest(AuthValidation.signupUserZodSchema),
  AuthController.signupUser
)
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
)
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
)

export const AuthRoutes = router