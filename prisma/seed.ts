import prisma from '../src/db'
import { type TUserCreation } from '../src/types'

export const seed = async (): Promise<void> => {
  await prisma.user.deleteMany()
  console.log('user Deleted Successfully')
  const userData: TUserCreation = {
    username: 'Madhan Kumar',
    email: 'madhandvmk@gmail.com',
    phone: '9090909090',
    password: 'admin',
    lastLoginAt: new Date(),
    lastLogin: 'india'
  }
  await prisma.user.create({
    data: {
      ...userData,
    },
  })
}
void seed()
