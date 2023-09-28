import { Schema, model } from 'mongoose'
import { AuthModel, IAuth } from './auth.interface'

const authSchema = new Schema(
  {
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Auth = model<IAuth, AuthModel>('Auth', authSchema)
