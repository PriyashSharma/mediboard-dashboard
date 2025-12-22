import { asyncHandler } from '../utils/asyncHandler.js'
import { apiResponse } from '../utils/apiResponse.js'
import { createStaffSchema } from '../validations/staff.validation.js'
import { createStaffMember, listStaffMembers } from '../services/staff.service.js'

export const createStaffController = asyncHandler(async (req, res) => {
  const payload = createStaffSchema.parse(req.body)
  const staff = await createStaffMember(payload)

  return apiResponse(res, {
    statusCode: 201,
    message: 'Staff member created successfully',
    data: {
      staff,
    },
  })
})

export const listStaffController = asyncHandler(async (req, res) => {
  const filter = {}
  if (req.query.role) {
    filter.role = req.query.role
  }

  const staff = await listStaffMembers(filter)
  return apiResponse(res, {
    message: 'Staff list retrieved successfully',
    data: {
      staff,
    },
  })
})
