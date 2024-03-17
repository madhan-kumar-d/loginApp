import { Router } from 'express'
import { LoginController } from '../controller/LoginController'

export const userRoute: Router = Router()

userRoute.post('/', LoginController.login)
