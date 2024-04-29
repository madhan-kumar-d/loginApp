import type { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

export const validator = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    const valid = error == null
    if (valid) {
      next()
    } else {
      const { details } = error
      const errorMessage = details
        .map((detail: any) => detail.message)
        .join(', ')
      res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .send({ message: errorMessage })
    }
  }
}
