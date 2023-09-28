import { z } from 'zod'
import { userRole } from '../user/user.constant'

//req-validation
//body--> object
//data--> object
const loginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone Number is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
})
const signupUserZodSchema = z.object({
  body: z.object({
    role: z.enum([...userRole] as [string, ...string[]], {
      required_error: 'role is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'firstName is required',
      }),
      lastName: z
        .string({
          required_error: 'Last name is required',
        })
        .optional(),
    }),
    phoneNumber: z.string({
      required_error: 'phoneNumber is required',
    }),
    address: z.string({
      required_error: 'address is required',
    }),
    budget: z.number({
      required_error: 'budget is required',
    }),
    income: z.number({
      required_error: 'income is required',
    }),
  }),
})
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
})

export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
  signupUserZodSchema,
}
