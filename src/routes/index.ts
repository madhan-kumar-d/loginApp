import { Router } from 'express'
import * as LoginController from '../controller/LoginController'

export const userRoute: Router = Router()

userRoute.post('/login', LoginController.login)
userRoute.post('/register', LoginController.register)
userRoute.get('/verifyToken', LoginController.verifyToken)
userRoute.get('/refreshToken', LoginController.createAccessToken)
