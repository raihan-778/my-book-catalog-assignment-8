/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../../config'
import { userRole } from './user.constant'
import { IUser, IUserMethods, UserModel } from './user.interface'

const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    password: { type: String, required: true, select: 0 },
    role: { type: String, required: true, enum: userRole },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    budget: { type: Number, required: true },
    income: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

//isUserExist instance method
userSchema.methods.isUserExists = async function (
  phoneNumber: string
): Promise<Partial<IUser> | null> {
  return await User.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, needPasswordChange: 1, role: 1 }
  )
}

//isPasswordMatched instance methods
userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  currentPassword: string
): Promise<boolean> {
  const isMatched = await bcrypt.compare(givenPassword, currentPassword)

  return isMatched
}

userSchema.pre('save', async function (next) {
  //hashing user password

  const user = this

  user.password = await bcrypt.hash(
    user.password,

    Number(config.bcrypt_salt_round)
  )

  next()
})

export const User = model<IUser, UserModel>('User', userSchema)
