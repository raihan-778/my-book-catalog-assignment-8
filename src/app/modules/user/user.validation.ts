import { z } from 'zod'
import { userRole } from './user.constant'

//req-validation
//body--> object
//data--> object
const createUserZodSchema = z.object({
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

const updateUserZodSchema = z.object({
  body: z.object({
    role: z
      .enum([...userRole] as [string, ...string[]], {
        required_error: 'role is required',
      })
      .optional(),
    password: z
      .string({
        required_error: 'password is required',
      })
      .optional(),
    name: z
      .object({
        firstName: z
          .string({
            required_error: 'firstName is required',
          })
          .optional(),
        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .optional(),
      })
      .optional(),
    phoneNumber: z
      .string({
        required_error: 'phoneNumber is required',
      })
      .optional(),
    address: z
      .string({
        required_error: 'address is required',
      })
      .optional(),
    budget: z
      .string({
        required_error: 'budget is required',
      })
      .optional(),
    income: z
      .string({
        required_error: 'income is required',
      })
      .optional(),
  }),
})
export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
}
