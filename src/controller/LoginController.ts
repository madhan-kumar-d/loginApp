import { type TLogin, type TLoginResp } from '../types'
import { userModel } from '../models/UserModel'
import type express from 'express'

export const LoginController = {
  login: async (
    req: express.Request,
    _: any,
    next: express.NextFunction
  ): Promise<TLoginResp | null | undefined> => {
    const { email }: TLogin = req.body
    const isUserExist = userModel.getUserByID(email)
    console.log(isUserExist)
    return null
  },
}
