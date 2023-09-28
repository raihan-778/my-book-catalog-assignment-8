import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import { IUser } from '../user/user.interface'
import { User } from '../user/user.model'
import {
  IAuth,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface'
//function for signup user
const signupUser = async (user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_user_pass as string
  }
  const result = await User.create(user)
  return result
}
/* functino for login User start */
const loginUser = async (payload: IAuth): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload

  const user = new User()

  const isUserExist = await user.isUserExists(phoneNumber)
  console.log(password, isUserExist?.password)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password mismatch')
  }
  //create accessToken & refreshToken

  const {
    phoneNumber: userPhoneNumber,
    role,
    needPasswordChange,
    _id,
  } = isUserExist

  const accessToken = jwtHelpers.createToken(
    { userPhoneNumber, role, _id },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_secret_expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    { userPhoneNumber, role, _id },
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_experies_in as string
  )

  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  }
}
/*functino for login User end  */

/* function for create access token start */

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifiedToken(
      token,
      config.jwt.jwt_refresh_secret as Secret
    )
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh token')
  }

  const { userPhoneNumber } = verifiedToken
  // console.log('auth-phone', verifiedToken)

  const user = new User()
  const isUserExist = await user.isUserExists(userPhoneNumber)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      phoneNumber: isUserExist.phoneNumber,
      role: isUserExist.role,
      _id: isUserExist._id,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_secret_expires_in as string
  )
  return { accessToken: newAccessToken }
}

/* function for create access token end */

export const AuthService = {
  loginUser,
  refreshToken,
  signupUser,
}
