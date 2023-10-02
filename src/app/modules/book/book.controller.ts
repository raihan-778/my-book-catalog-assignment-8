import { Book } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookFilterableFields } from './book.constant';
import { BookService } from './book.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { ...BookData } = req.body;
  const result = await BookService.insertIntoDB(BookData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Inserted Successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const options = pick(req.query, paginationFields);

  // console.log('Filters:', filters);
  // console.log('Options:', options);
  const result = await BookService.getAllFromDB(filters, options);
  console.log(req.params);
  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book data Fatched!!',
    meta: result.meta,
    data: result.data,
  });
});
const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getDataById(req.params.id);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Single data Fatched!!',
    data: result,
  });
});
const getDataByCategoryId = catchAsync(async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;

    const result = await BookService.getDataByCategoryId(categoryId);
    console.log('result', result);

    if (result?.length === 0) {
      // No books found for the specified category
      return sendResponse<Book[]>(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'No books found for the specified category',
        data: [],
      });
    }

    sendResponse<Book[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Books retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error retrieving books by category:', error);
    sendResponse<Book[]>(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Internal server error',
      data: [],
    });
  }
});
const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookService.updateIntoDB(id, req.body);
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Data Updated Successfully!!',
    data: result,
  });
});

const deleteDataById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.deleteDataById(id);
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Data Deleted Successfully!!',
    data: result,
  });
});

export const BookController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteDataById,
  getDataByCategoryId,
};
