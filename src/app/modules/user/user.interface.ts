/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export type IRoleTitle = 'buyer' | 'seller' | 'admin'

export type IUser = {
  _id?: string
  password: string
  role: IRoleTitle
  needPasswordChange: false | true
  name: {
    firstName: string
    lastName?: string
  }
  phoneNumber: string
  address: string
  budget: number
  income: number
}

export type IUserFilters = {
  searchTerm?: string
}

export type IUserMethods = {
  isUserExists(phoneNumber: string): Promise<Partial<IUser> | null>
  isPasswordMatched(
    givenPassword: string,
    currentPassword: string
  ): Promise<boolean>
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>
