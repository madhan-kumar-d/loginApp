import { Router } from 'express'
import { LoginController } from '../controller/LoginController'

export const userRoute: Router = Router()

//  eslint-disable-next-line @typescript-eslint/no-misused-promises
userRoute.post('/', LoginController.login)
