import { Request, Response } from 'express'

import httpStatus from 'http-status'
import { paginationFields } from '../../../constantFiles/paginationConstants'
import { MyJwtPayload } from '../../../interfaces/common'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { userFilterableFields } from './user.constant'
import { IUser } from './user.interface'
import { UserService } from './user.service'

// const createUser = catchAsync(async (req: Request, res: Response) => {
//   const { ...userData } = req.body
//   const result = await UserService.createUser(userData)
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User Created Successfully',
//     data: result,
//   })
// })
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await UserService.getAllUsers(filters, paginationOptions)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrived Successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await UserService.getSingleUser(id)

  sendResponse<IUser | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single User Retrived Successfully',
    data: result,
  })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const updatedData = req.body
  const result = await UserService.updateUser(id, updatedData)

  sendResponse<IUser | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single User Updated Successfully',
    data: result,
  })
})
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await UserService.deleteUser(id)
  sendResponse<IUser | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single User deleted Successfully',
    data: result,
  })
})

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user as MyJwtPayload

  const result = await UserService.getUserProfile(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users Profile Retrived Successfully',
    data: result,
  })
})
const updateUserProfile = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user as MyJwtPayload
  console.log('update-profile', id)
  const updatedData = req.body

  const result = await UserService.updateUserProfile(id, updatedData)

  sendResponse<IUser | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users Profile Updatede Successfully',
    data: result,
  })
})
export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
}
