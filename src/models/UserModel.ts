import prisma from '../db'
const userTable = prisma.user

export const userModel = {
  getUserByID: async (useremail: string) => {
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
}
