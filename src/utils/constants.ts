import dotenv from 'dotenv'
dotenv.config()

export const staticConstant = {
  port: process.env.PORT ?? '2024',
  hashSaltRound: process.env.HASHSALTROUND ?? '5',
}
