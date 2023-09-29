import { z } from 'zod';

//req-validation
//body--> object
//data--> object

const create = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
  }),
});
const update = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const CategoryValidation = {
  create,
  update,
};
