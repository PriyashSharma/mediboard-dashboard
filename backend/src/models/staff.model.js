import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const staffSchema = new mongoose.Schema(
  {
    staffId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['doctor', 'receptionist', 'admin'],
      required: true,
    },
    department: {
      type: String,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    lastLoginAt: {
      type: Date,
    },
  },
  { timestamps: true },
)

staffSchema.methods.comparePassword = async function comparePassword(password) {
  return bcrypt.compare(password, this.passwordHash)
}

staffSchema.statics.hashPassword = function hashPassword(password) {
  const saltRounds = 10
  return bcrypt.hash(password, saltRounds)
}

export const Staff = mongoose.model('Staff', staffSchema)
