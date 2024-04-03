import type { TLogin, TUserCreation2 } from '../types'
import { userModel } from '../models/UserModel'
import type express from 'express'
import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import { sign, verify, type JwtPayload } from 'jsonwebtoken'
import { staticConstant } from '../utils/constants'

export const login = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  let { email, password }: TLogin = req.body
  try {
    email = email ?? ''
    password = password ?? ''
    if (email === '' || password === '') {
      res
        .status(StatusCodes.PARTIAL_CONTENT)
        .json({ status: 'error', message: 'Email or Password is missing' })
    }
    const isUserExist = await userModel.getUserIDByEmail(email)
    if (isUserExist === null) {
      res
        .status(StatusCodes.OK)
        .json({ status: 'error', message: 'Invalid Credentials' })
    } else {
      const userDetails = await userModel.getUserByID(isUserExist.id)
      if (userDetails !== null) {
        const compare = await bcrypt.compare(password, userDetails.password)
        if (!compare) {
          res
            .status(StatusCodes.OK)
            .json({ status: 'error', message: 'Invalid Credentials' })
        }
        const accessToken = sign(
          { user: userDetails.id },
          staticConstant.JWTSECRET,
          { expiresIn: '10m' }
        )
        const refreshToken = sign(
          { user: userDetails.id },
          staticConstant.JWTSECRETREFRESH,
          { expiresIn: '1d' }
        )
        res
          .status(StatusCodes.OK)
          .json({ status: 'success', accessToken, refreshToken })
      }
    }
  } catch (err: unknown) {
    console.log(err)
  }
}

export const register = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const {
      username: userName,
      email,
      password,
      phone,
    }: TUserCreation2 = req.body
    if (
      userName === null ||
      email === null ||
      password === null ||
      phone === null
    ) {
      res
        .status(StatusCodes.OK)
        .json({ status: 'error', message: 'missing inputs' })
    }
    const isUserExist = await userModel.getUserIDByEmail(email)
    if (isUserExist !== null) {
      res.status(StatusCodes.CONFLICT).json({
        status: 'error',
        message: 'Email Already used, Please Use Sign In',
      })
    }
    const saltRound = staticConstant.hashSaltRound
    const salt = await bcrypt.genSalt(parseInt(saltRound))
    const passwordHashed = await bcrypt.hash(password, salt)
    console.log(userName)
    const userDetails = await userModel.createUser({
      username: userName,
      password: passwordHashed,
      email,
      phone,
    })
    console.log(userDetails)
    const accessToken = sign(
      { user: userDetails.id },
      staticConstant.JWTSECRET,
      { expiresIn: '10m' }
    )
    const refreshToken = sign(
      { user: userDetails.id },
      staticConstant.JWTSECRETREFRESH,
      { expiresIn: '1d' }
    )
    res
      .status(StatusCodes.OK)
      .json({ status: 'success', accessToken, refreshToken })
  } catch (error: unknown) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}
export const verifyToken = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { authorization } = req.headers
  try {
    if (authorization === null) {
      res.sendStatus(StatusCodes.UNAUTHORIZED)
    }
    const accessToken =
      authorization?.replace('Bearer ', '').replace('bearer ', '') ?? ''
    if (accessToken === '') res.sendStatus(StatusCodes.UNAUTHORIZED)
    verify(accessToken, staticConstant.JWTSECRET, {
      complete: true,
    }) as JwtPayload
    res.status(StatusCodes.OK).json({ status: 'success', message: 'valid' })
  } catch (error: unknown) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: 'error', message: 'invalid' })
  }
}
export const createAccessToken = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { authorization } = req.headers
    if (authorization === null) {
      res.sendStatus(StatusCodes.UNAUTHORIZED)
    }
    const refreshToken =
      authorization?.replace('Bearer ', '').replace('bearer ', '') ?? ''
    if (refreshToken === '') res.sendStatus(StatusCodes.UNAUTHORIZED)
    console.log(staticConstant.JWTSECRETREFRESH)
    const jwtDecode = verify(
      refreshToken,
      staticConstant.JWTSECRETREFRESH
    ) as JwtPayload
    const { user } = jwtDecode
    const accessToken = sign({ user }, staticConstant.JWTSECRET, {
      expiresIn: '10m',
    })
    const refreshTokenNew = sign({ user }, staticConstant.JWTSECRETREFRESH, {
      expiresIn: '1d',
    })
    res
      .status(StatusCodes.OK)
      .json({ status: 'success', accessToken, refreshToken: refreshTokenNew })
  } catch (error: unknown) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: 'error', message: 'invalid token' })
  }
}
