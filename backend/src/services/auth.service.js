import { Staff } from '../models/staff.model.js'
import { AppError } from '../utils/AppError.js'

export async function authenticateStaff({ staffId, password }) {
  const normalizedId = staffId.trim().toUpperCase()

  const staff = await Staff.findOne({ staffId: normalizedId }).select('+passwordHash')
  if (!staff) {
    throw new AppError(401, 'Invalid credentials. Please check your ID and password.')
  }

  const isPasswordValid = await staff.comparePassword(password)
  if (!isPasswordValid) {
    throw new AppError(401, 'Invalid credentials. Please check your ID and password.')
  }

  staff.lastLoginAt = new Date()
  await staff.save()

  const { passwordHash, ...safeStaff } = staff.toObject()
  return safeStaff
}
