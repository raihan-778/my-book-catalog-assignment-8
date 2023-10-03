import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
const signupUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await AuthService.signupUser(userData);

  if (result) {
    delete result?.password;
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  const { refreshToken, token } = result;

  //set refresh token

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    token,
  });
});

//function for get new token
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
  const { token } = result;
  //set refresh token
  const cookeiOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookeiOptions);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: 'New access token generated successfully',
    token,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  signupUser,
};
