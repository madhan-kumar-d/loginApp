import dotenv from 'dotenv'
dotenv.config()

export const staticConstant = {
  port: process.env.PORT ?? '8080',
  hashSaltRound: process.env.HASHSALTROUND ?? '5',
  JWTSECRET: process.env.JWT_SECRET ?? 'VOhkgfOEfjpdxCH',
  JWTSECRETREFRESH: process.env.JWT_SECRET_REFRESH ?? 'pGfSN774YFVHASF',
}
