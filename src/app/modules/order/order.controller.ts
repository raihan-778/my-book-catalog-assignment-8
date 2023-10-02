import { Order } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { orderFilterableFields } from './order.constant';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  // Extract user information from the decoded token

  console.log('order-controller', req.user);
  const { id } = req.user as JwtPayload;

  // Request body containing ordered books
  const { orderedBooks } = req.body;

  // Create the order using the service function
  const order = await OrderService.createOrder(id, orderedBooks);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Created Successfully',
    data: order,
  });
});
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, orderFilterableFields);
  const options = pick(req.query, paginationFields);

  const userType: string = req.user?.role; // Modify to match your actual user role property
  const userId: string = userType === 'customer' ? req.user?.userId : undefined;
  console.log('user', req.user);

  // console.log('Filters:', filters);
  // console.log('Options:', options);

  const result = await OrderService.getAllFromDB(
    filters,
    options,
    userType,
    userId
  );
  sendResponse<Order[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order data Fatched!!',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const userRole = req.user?.role;
  console.log(req.user);

  const result = await OrderService.getDataById(req.params.id);
  console.log(result);

  if (userRole !== 'admin' && userId !== result?.userId) {
    throw new Error('You are not authorized See This Order Details');
  }
  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Single data Fatched!!',
    data: result,
  });
});

export const OrderController = {
  getAllFromDB,
  getDataById,
  createOrder,
};
