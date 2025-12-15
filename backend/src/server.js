import app from './app.js'
import { connectDatabase } from './config/database.js'
import { env } from './config/env.js'

async function bootstrap() {
  await connectDatabase()

  const server = app.listen(env.PORT, () => {
    console.log(`API ready on port ${env.PORT} [${env.NODE_ENV}]`)
  })

  const shutdownSignals = ['SIGINT', 'SIGTERM']
  shutdownSignals.forEach((signal) => {
    process.on(signal, () => {
      console.log(`Received ${signal}. Closing server...`)
      server.close(() => {
        console.log('HTTP server closed')
        process.exit(0)
      })
    })
  })
}

bootstrap().catch((error) => {
  console.error('Failed to start server', error)
  process.exit(1)
})
