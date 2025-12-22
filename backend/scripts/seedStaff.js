import { faker } from '@faker-js/faker'
import { connectDatabase } from '../src/config/database.js'
import { Staff } from '../src/models/staff.model.js'

const DOCTOR_COUNT = 30
const RECEPTIONIST_COUNT = 5

const doctorDepartments = [
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Oncology',
  'Orthopedics',
  'Dermatology',
  'Radiology',
  'Emergency Medicine',
]

const receptionistDepartments = ['Front Desk', 'Help Desk', 'Admissions', 'Billing']

function buildStaffSeedData() {
  const records = [
    {
      staffId: 'ADMIN001',
      name: 'System Admin',
      role: 'admin',
      department: 'Administration',
      password: 'Admin@123',
    },
  ]

  for (let i = 0; i < DOCTOR_COUNT; i += 1) {
    records.push({
      staffId: `DOC${(101 + i).toString().padStart(3, '0')}`,
      name: faker.person.fullName({ sex: faker.helpers.arrayElement(['male', 'female']) }),
      role: 'doctor',
      department: faker.helpers.arrayElement(doctorDepartments),
      password: 'Doctor@123',
    })
  }

  for (let i = 0; i < RECEPTIONIST_COUNT; i += 1) {
    records.push({
      staffId: `REC${(201 + i).toString().padStart(3, '0')}`,
      name: faker.person.fullName({ sex: faker.helpers.arrayElement(['male', 'female']) }),
      role: 'receptionist',
      department: faker.helpers.arrayElement(receptionistDepartments),
      password: 'Reception@123',
    })
  }

  return records
}

async function seedStaff() {
  await connectDatabase()

  const staffSeedData = buildStaffSeedData()

  for (const staffData of staffSeedData) {
    const passwordHash = await Staff.hashPassword(staffData.password)
    await Staff.findOneAndUpdate(
      { staffId: staffData.staffId },
      {
        staffId: staffData.staffId,
        name: staffData.name,
        role: staffData.role,
        department: staffData.department,
        passwordHash,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    )
    console.log(`Upserted staff record for ${staffData.staffId} (${staffData.role})`)
  }

  console.log('Staff seed completed.')
  process.exit(0)
}

seedStaff().catch((error) => {
  console.error('Failed to seed staff data', error)
  process.exit(1)
})
