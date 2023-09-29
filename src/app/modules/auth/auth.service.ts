import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { isPasswordMatched, isUserExists } from '../../../shared/utils';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
//function for signup user
const signupUser = async (userData: User): Promise<User> => {
  if (!userData.password) {
    userData.password = config.default_user_pass as string;
  }
  const result = await prisma.user.create({
    data: userData,
  });
  return result;
};

/* functino for login User start */

// Login function using Prisma and PostgreSQL
export const loginUser = async (
  payload: Partial<User>
): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  // Check if the user exists by email
  const isUserExist = await isUserExists(email as string);
  console.log('user', isUserExist);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // Check if the provided password matches the hashed password in the database
  const isPasswordMatch = await isPasswordMatched(
    password as string,
    isUserExist.password as string
  );
  console.log(isPasswordMatch);

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password mismatch');
  }
  //create accessToken & refreshToken

  const { role, id } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { email, role, id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { email, role, id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};
/*functino for login User end  */

/* function for create access token start */

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh token');
  }

  const { userPhoneNumber } = verifiedToken;
  // console.log('auth-phone', verifiedToken)

  const isUserExist = await isUserExists(userPhoneNumber);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      phoneNumber: isUserExist.contactNo,
      role: isUserExist.role,
      id: isUserExist.id,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return { accessToken: newAccessToken };
};

/* function for create access token end */

export const AuthService = {
  loginUser,
  refreshToken,
  signupUser,
};
