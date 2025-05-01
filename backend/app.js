import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import authenticate from './routers/authenticate.js'

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected'))
  .catch((error) => {
    console.error('Couldn\'t connect to MongoDB')
    console.error(error)
  })

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authenticate)

export default app
