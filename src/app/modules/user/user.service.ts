import { Prisma, User } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { userSearchableFields } from './user.constant';
import { IUserFilterRequest } from './user.interface';

const insertIntoDB = async (userData: User): Promise<User> => {
  const result = await prisma.user.create({
    data: userData,
  });
  return result;
};

const getAllFromDB = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  console.log(filters);
  const andConditions = [];
  console.log(options);

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.user.findMany({
    where: whereConditions,
    // where: andConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            name: 'desc',
          },
  });
  const total = await prisma.user.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};
// const updateIntoDB = async (
//   id: string,
//   payload: Partial<Student>
// ): Promise<Student> => {
//   const result = await prisma.student.update({
//     where: {
//       id,
//     },
//     data: payload,
//     include: {
//       academicSemester: true,
//       academicFaculty: true,
//       academicDepartment: true,
//     },
//   });
//   return result;
// };

// const deleteDataById = async (id: string): Promise<Student> => {
//   const result = await prisma.student.delete({
//     where: {
//       id,
//     },
//     include: {
//       academicSemester: true,
//       academicFaculty: true,
//       academicDepartment: true,
//     },
//   });
//   return result;
// };

export const UserService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  // updateIntoDB,
  // deleteDataById,
};
