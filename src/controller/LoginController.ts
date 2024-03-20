import { type TLogin, type TLoginResp } from '../types'
import { userModel } from '../models/UserModel'
import type express from 'express'

export const LoginController = {
  login: async (
    req: express.Request,
    _: any,
    next: express.NextFunction
  ): Promise<TLoginResp | null | undefined> => {
    try {
      const { email }: TLogin = req.body
      const isUserExist = await userModel.getUserByID(email)
      console.log(isUserExist)
      return null
    } catch (err: any) {
      console.log(err.message)
    }
  },
}
