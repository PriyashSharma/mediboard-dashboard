import { authenticateStaff } from '../services/auth.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { apiResponse } from '../utils/apiResponse.js'
import { loginSchema } from '../validations/auth.validation.js'

export const loginController = asyncHandler(async (req, res) => {
  const payload = loginSchema.parse(req.body)
  const staff = await authenticateStaff(payload)

  return apiResponse(res, {
    message: 'Login successful',
    data: {
      staff,
    },
  })
})
