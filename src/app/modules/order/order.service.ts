import { Order, OrderedBook, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { bookSearchableFields } from '../book/book.constant';
import { IOrderFilterRequest } from './order.interface';

const createOrder = async (
  userId: string,
  orderedBooks: OrderedBook[]
): Promise<Partial<OrderedBook>> => {
  try {
    // Create the order in the database
    const order = await prisma.order.create({
      data: {
        userId,
        orderedBooks: {
          create: orderedBooks.map(({ bookId, quantity }) => ({
            bookId,
            quantity,
          })),
        },
      },
      include: {
        orderedBooks: true,
      },
    });

    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

const getAllFromDB = async (
  filters: IOrderFilterRequest,
  options: IPaginationOptions,
  userType: string, // Add userType as a parameter
  userId?: string
): Promise<IGenericResponse<Order[]>> => {
  const { searchTerm } = filters;

  // console.log('ac_service', searchTerm);
  const { page, size, skip } = paginationHelpers.calculatePagination(options);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (userType === 'customer' && userId) {
    andConditions.push({
      userId, // Filter by the user's ID
    });
  }

  const whereConditions: Prisma.OrderWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.order.findMany({
    where: whereConditions,

    // where: andConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'asc',
          },
    include: {
      orderedBooks: true,
    },
  });
  const total = await prisma.order.count();
  const totalPage = Math.ceil(total / 10);

  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      orderedBooks: true,
    },
  });
  return result;
};

export const OrderService = {
  getAllFromDB,
  getDataById,
  createOrder,
};
