import dotenv from 'dotenv'
dotenv.config()

export const staticConstant = {
  port: process.env.PORT ?? '2024',
  hashSaltRound: process.env.HASHSALTROUND ?? '5',
  JWTSECRET: process.env.JWT_SECRET ?? 'dummy_message',
  JWTSECRETREFRESH: process.env.JWT_SECRET_REFRESH ?? 'dummy_message',
  COOKIENAME: process.env.JWT_SECRET ?? 'AUTHCOOKIE',
}
