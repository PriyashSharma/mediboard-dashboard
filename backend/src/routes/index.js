import { Router } from 'express'
import authRoutes from './auth.routes.js'
import staffRoutes from './staff.routes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/staff', staffRoutes)

export default router
