import prisma from '../db'
const userTable = prisma.user

export const userModel = {
  getUserIDByEmail: async (useremail: string) => {
    const createdUser = await userTable.findUnique({
      where: {
        email: useremail,
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
}
