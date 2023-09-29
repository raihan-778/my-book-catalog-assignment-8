import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Order): Promise<Order> => {
  const result = await prisma.order.create({
    data,
    include: {
      orderedBooks: true,
    },
  });
  return result;
};

export const OrderService = {
  insertIntoDB,
};
