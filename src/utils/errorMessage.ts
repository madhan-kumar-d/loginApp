import { type NextFunction, type Response } from 'express'
// import { errorType404 } from '../types'

interface errorType404 {
  message: any
  status: boolean
}

export const send404message = (
  _: any,
  res: Response,
  next: NextFunction
): Response<errorType404> => {
  const status = 404
  return res.status(status).send({
    data: 'Page not found',
    status: false,
  })
}
