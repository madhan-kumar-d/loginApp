import prisma from '../db'
import { type TUserCreation2 } from '../types/userType'
const userTable = prisma.user

export const userModel = {
  getUserIDByEmail: async (email: string) => {
    const createdUser = await userTable.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    })
    return createdUser
  },
  getUserByID: async (id: number) => {
    const userDetails = await userTable.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    })
    return userDetails
  },
  createUser: async ({ username, password, email, phone }: TUserCreation2) => {
    console.log(username)
    const createdUserData = await userTable.create({
      data: {
        email,
        username,
        password,
        phone,
      },
      select: {
        id: true,
        email: true,
      },
    })
    return createdUserData
  },
}
