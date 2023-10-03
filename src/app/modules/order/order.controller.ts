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

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, orderFilterableFields);
  const options = pick(req.query, paginationFields);
  const userType: string = req.user?.role; // Modify to match your actual user role property
  const userId: string = userType === 'customer' ? req.user?.userId : undefined;
  console.log('user:', userId, userType);
  const result = await OrderService.getAllOrders(
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

  try {
    if (
      userRole === 'admin' ||
      (userRole === 'customer' && userId === req.params.id)
    ) {
      const result = await OrderService.getDataById(req.params.id);
      sendResponse<Order>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order Single data Fatched!!',
        data: result,
      });
    } else {
      throw new Error('You are not authorized See This Order Details');
    }
  } catch (error) {
    console.error('Error fetching order data:', error);
    sendResponse(res, {
      statusCode: httpStatus.FORBIDDEN, // You can choose an appropriate HTTP status code
      success: false,
      message: 'Access Denied',
    });
  }
});

export const OrderController = {
  getDataById,
  createOrder,
  getAllOrders,
};
