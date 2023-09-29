import { z } from 'zod';
import { userRole } from './user.constant';

//req-validation
//body--> object
//data--> object

const updateUserZodSchema = z.object({
  body: z
    .object({
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
      name: z.string({ required_error: 'firstName is required' }).optional(),
    })
    .optional(),
  contactNo: z
    .string({
      required_error: 'Contact No is required',
    })
    .optional(),
  address: z.string({ required_error: 'address is required' }).optional(),
});

export const UserValidation = {
  updateUserZodSchema,
};
