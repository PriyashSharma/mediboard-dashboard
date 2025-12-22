import { Router } from 'express'
import { createStaffController, listStaffController } from '../controllers/staff.controller.js'

const router = Router()

router.get('/', listStaffController)
router.post('/', createStaffController)

export default router
