import prisma from '../src/db'
import { type TUserCreation } from '../src/types'

export const seed = async (): Promise<void> => {
  await prisma.user.deleteMany()
  console.log('user Deleted Successfully')
  const userData: TUserCreation = {
    username: 'Madhan Kumar',
    email: 'madhandvmk@gmail.com',
    phone: '9090909090',
    password: '$2b$05$W9ziTPNV/lfSqE535kN/JOpcDG5X2Wi39rHDWYT68LzEWUzONAneW', // test@123
    lastLoginAt: new Date(),
    lastLogin: 'india',
  }
  await prisma.user.create({
    data: {
      ...userData,
    },
  })
}
void seed()
