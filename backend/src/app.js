import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import routes from './routes/index.js'
import { env } from './config/env.js'
import { globalErrorHandler, notFoundHandler } from './middleware/errorHandler.js'

const app = express()

const allowedOrigins = env.CORS_ORIGIN === '*'
  ? '*'
  : env.CORS_ORIGIN.split(',').map((origin) => origin.trim())

app.use(helmet())
app.use(
  cors({
    origin: allowedOrigins === '*' ? true : allowedOrigins,
    credentials: true,
  }),
)
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compression())
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})

app.use('/api', routes)

app.use(notFoundHandler)
app.use(globalErrorHandler)

export default app
