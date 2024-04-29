/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as LoginController from '../controller/LoginController'
// import joi from 'joi'
import { loginSchema, signupSchema } from '../middleware/validation'
import { validator } from '../middleware/validator.middleware'

export const userRoute: Router = Router()

userRoute.post('/login', validator(loginSchema), LoginController.login)
userRoute.post('/register', validator(signupSchema), LoginController.register)
userRoute.get('/verifyToken', LoginController.verifyToken)
userRoute.get('/refreshToken', LoginController.createAccessToken)
