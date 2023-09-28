import { Model } from 'mongoose'

export type IAuth = {
  phoneNumber: string
  password: string
}

export type ILoginUserResponse = {
  accessToken: string
  refreshToken?: string
  needPasswordChange: boolean | undefined
}

export type IRefreshTokenResponse = {
  accessToken: string
}
export type AuthModel = Model<IAuth, Record<string, unknown>>
