import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const port: string = process.env.PORT ?? '2024'
const app: express.Express = express()

app.use(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('Hi you are in wrong window').status(200)
  }
)

app.listen(port, () => {
  console.log(`App is running on Port ${port}`)
})
