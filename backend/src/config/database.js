import mongoose from 'mongoose'
import { env } from './env.js'

mongoose.set('strictQuery', true)

export async function connectDatabase() {
  try {
    await mongoose.connect(env.MONGO_URI)
    const { host } = mongoose.connection
    console.log(`MongoDB connected: ${host}`)
  } catch (error) {
    console.error('MongoDB connection error', error)
    process.exit(1)
  }
}
