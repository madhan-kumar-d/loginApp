import express from 'express'
import dotenv from 'dotenv'
import { userRoute } from './routes'
import { send404message } from './utils/errorMessage'

dotenv.config()
const port: string = process.env.PORT ?? '2024'
const app: express.Express = express()

app.use(express.json())
app.use('/login', userRoute)
// Return empty window for all Request
// app.use(
//   '/',
//   (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     res.send('').status(400)
//   }
// )
app.use(send404message)
app.listen(port, () => {
  console.log(`App is running on Port ${port}`)
})
