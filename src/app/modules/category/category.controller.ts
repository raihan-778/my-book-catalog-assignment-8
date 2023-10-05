import { Category } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './cagtegory.service';
import { categoryFilterableFields } from './category.constant';
const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { ...categoryData } = req.body;
  const result = await CategoryService.insertIntoDB(categoryData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Created Successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, categoryFilterableFields);
  const options = pick(req.query, paginationFields);

  // console.log('Filters:', filters);
  // console.log('Options:', options);
  const result = await CategoryService.getAllFromDB(filters, options);
  sendResponse<Category[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category data Fatched!!',
    meta: result.meta,
    data: result.data,
  });
});
const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getDataById(req.params.id);
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Single data Fatched!!',
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CategoryService.updateIntoDB(id, req.body);
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Data Updated Successfully!!',
    data: result,
  });
});

const deleteDataById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoryService.deleteDataById(id);
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Data Deleted Successfully!!',
    data: result,
  });
});

export const CategoryController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteDataById,
};
