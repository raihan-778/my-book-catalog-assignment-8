import { z } from 'zod';

//req-validation
//body--> object
//data--> object

const create = z.object({
  body: z.object({
    title: z.string({}).optional(),
    author: z.string({}).optional(),
    price: z.number({}).optional(),
    genre: z.string({}).optional(),
    publicationDate: z.string({}).optional(),
    categoryId: z.string({}).optional(),
  }),
});
const update = z.object({
  body: z.object({
    title: z.string({}).optional(),
    author: z.string({}).optional(),
    price: z.number({}).optional(),
    genre: z.string({}).optional(),
    publicationDate: z.string({}).optional(),
    categoryId: z.string({}).optional(),
  }),
});

export const BookValidation = {
  create,
  update,
};
