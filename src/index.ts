import express from 'express'
import { staticConstant } from './utils/constants'
import { userRoute } from './routes'
import { send404message } from './utils/errorMessage'
import helmet from 'helmet'
import { limiter } from './middleware/ratelimiter'

const port: string = staticConstant.port
const app: express.Express = express()

app.use(helmet())
app.use(limiter)
app.use(express.json())
app.use('/auth', userRoute)
app.use(send404message)
app.listen(port, () => {
  console.log(`App is running on Port ${port}`)
})
