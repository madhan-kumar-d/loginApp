import prisma from '../db'
const User = prisma.user

export const userModel: any = {
  getUserByID: async (useremail: string) => {
    return await User.findUnique({
      where: {
        email: useremail,
      },
      select: {
        id: true,
      },
    })
  },
}
