import { type TLogin, type TLoginResp } from '../types'
import { userModel } from '../models/UserModel'

export const LoginController = {
  login: async (
    LoginElement: TLogin
  ): Promise<TLoginResp | null | undefined> => {
    const { email, password } = LoginElement
    let isUserExist = userModel.getUserByID(email)
    console.log(isUserExist)
    return null
  },
}
