import { type User } from '@prisma/client'

export type TUserID = User['id']
export type TLogin = Pick<User, 'email' | 'password'>
export type TLoginResp = Pick<User, 'id' | 'username' | 'email' | 'phone'>
export type TLoginValidate = Pick<User, 'email'>
