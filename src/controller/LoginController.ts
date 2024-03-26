import { type TLogin, type TLoginResp } from '../types'
import { userModel } from '../models/UserModel'
import type express from 'express'
import bcrypt from 'bcrypt'

export const LoginController = {
  login: async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const { email, password }: TLogin = req.body
      if (!email || !password) {
        res.send(123).status(401)
      }
      console.log(email)
      const isUserExist = await userModel.getUserIDByEmail(email)
      const saltRound = 5
      const salt = await bcrypt.genSalt(saltRound)
      const hashpassword = await bcrypt.hash('test@123', salt)
      console.log(hashpassword)
      console.log(isUserExist)
      res.send(123)
    } catch (err: unknown) {
      console.log(err)
    }
  },
}
