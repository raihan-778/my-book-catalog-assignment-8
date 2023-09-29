import { z } from 'zod';
import { userRole } from '../user/user.constant';

//req-validation
//body--> object
//data--> object
const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});
const signupUserZodSchema = z.object({
  body: z.object({
    role: z.enum([...userRole] as [string, ...string[]], {
      required_error: 'role is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    email: z.string({ required_error: 'email is required' }),
    name: z.string({ required_error: 'Name is required' }),

    contactNo: z.string({
      required_error: 'contactNo is required',
    }),
    address: z.string({
      required_error: 'address is required',
    }),
    profileImg: z.string({
      required_error: 'profileImg is required',
    }),
  }),
});
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
  signupUserZodSchema,
};
