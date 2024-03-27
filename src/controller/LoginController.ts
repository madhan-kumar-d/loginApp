import { type TLogin } from '../types' // type TLoginResp
import { userModel } from '../models/UserModel'
import type express from 'express'
import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
// import { staticConstant } from '../utils/constants'

export const LoginController = {
  login: async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      let { email, password }: TLogin = req.body
      email = email ?? ''
      password = password ?? ''
      if (email === '' || password === '') {
        res
          .status(StatusCodes.PARTIAL_CONTENT)
          .json({ status: 'error', message: 'Email or Password is missing' })
      }
      const isUserExist = await userModel.getUserIDByEmail(email)
      if (isUserExist === null) {
        res
          .status(StatusCodes.OK)
          .json({ status: 'error', message: 'Invalid Credentials' })
      }
      // const saltRound = staticConstant.hashSaltRound
      // const salt = await bcrypt.genSalt(parseInt(saltRound))
      const userDetails = await userModel.getUserByID(isUserExist.id)
      const compare = await bcrypt.compare(password, userDetails.password)
      if (!compare) {
        res
          .status(StatusCodes.OK)
          .json({ status: 'error', message: 'Invalid Credentials' })
      }
      res
        .status(StatusCodes.OK)
        .json({ status: 'success', message: 'Login Success' })
    } catch (err: unknown) {
      console.log(err)
    }
  },
}

// API for newsletter subscribion
// Create a VL article(or map) in English
// AAE Mega menu API Url -

// wellness post date - reg end ddate post meta key
