import express from 'express'
import { staticConstant } from './utils/constants'
import { userRoute } from './routes'
import { send404message } from './utils/errorMessage'

const port: string = staticConstant.port
const app: express.Express = express()

app.use(express.json())
app.use('/auth', userRoute)
app.use(send404message)
app.listen(port, () => {
  console.log(`App is running on Port ${port}`)
})
