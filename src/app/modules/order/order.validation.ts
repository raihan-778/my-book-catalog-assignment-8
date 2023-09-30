import { z } from 'zod';
import { orderStatus } from './order.constant';

//req-validation
//body--> object
//data--> object

// userId
// status
// createdAt

const create = z.object({
  body: z.object({
    userId: z.string({ required_error: 'userId is required' }),
    status: z.enum([...orderStatus] as [string, ...string[]], {
      required_error: 'Status is required',
    }),
  }),
});
const update = z.object({
  body: z.object({
    userId: z.string().optional(),
    status: z
      .enum([...orderStatus] as [string, ...string[]], {
        required_error: 'Status is required',
      })
      .optional(),
  }),
});

export const OrderValidation = {
  create,
  update,
};
