import { SortOrder } from 'mongoose'

import { paginationHelper } from '../../../helpers/paginationHelpers'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { userSearchableFields } from './user.constant'
import { IUser, IUserFilters } from './user.interface'
import { User } from './user.model'

// const createUser = async (user: IUser): Promise<IUser | null> => {
//   if (!user.password) {
//     user.password = config.default_user_pass as string
//   }
//   const result = await User.create(user)
//   return result
// }

const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)

  /* code for searching by field start */

  const { searchTerm, ...filteredData } = filters

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      //dynamic search tearm
      $or: userSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    })
  }
  // console.log(Object.entries(filteredData));
  //here object.entries will get all properties with values as key value pairs.on the other hand object.keys will get only properties

  if (Object.keys(filteredData).length) {
    andConditions.push({
      $and: Object.entries(filteredData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const sortCondition: { [key: string]: SortOrder } = {} // here [key:string]:string is a mapped type where we have defined an object property & its value type.here here key is the property.mongoose has a default sort order type so that in sort condition we can difined the value type as sortorder type imported from mongoose insted of type string.

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }
  const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {} // this code block is used to create conditions if any searching options is not found then an empty object will be added in query paramas.
  const result = await User.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await User.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id)
  return result
}

const getUserProfile = async (id: string) => {
  const result = await User.findById(id)
  return result
}
const updateUserProfile = async (id: string, payload: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id)
  return result
}

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
}
