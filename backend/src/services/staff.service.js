import { Staff } from '../models/staff.model.js'
import { AppError } from '../utils/AppError.js'

export async function createStaffMember({ staffId, name, role, department, password }) {
  const normalizedStaffId = staffId.trim().toUpperCase()
  const staffExists = await Staff.findOne({ staffId: normalizedStaffId })
  if (staffExists) {
    throw new AppError(409, 'A staff member with this ID already exists.')
  }

  const passwordHash = await Staff.hashPassword(password)

  const staff = await Staff.create({
    staffId: normalizedStaffId,
    name: name.trim(),
    role,
    department: department.trim(),
    passwordHash,
  })

  return staff.toObject({ versionKey: false })
}

export async function listStaffMembers(filter = {}) {
  const staff = await Staff.find(filter, '-passwordHash')
    .sort({ createdAt: -1 })
    .lean()

  return staff
}
