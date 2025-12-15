import { connectDatabase } from '../src/config/database.js'
import { env } from '../src/config/env.js'
import { Staff } from '../src/models/staff.model.js'

const staffSeedData = [
  {
    staffId: 'ADMIN001',
    name: 'System Admin',
    role: 'admin',
    department: 'Administration',
    passwordHash: '$2b$10$w3um32VBcD6CQ2hWBXFSA.br0FEJNrK4X5wzIBTNJ4YE1Oks3IMB.',
  },
  {
    staffId: 'DOC101',
    name: 'Dr. Rohan Sharma',
    role: 'doctor',
    department: 'Cardiology',
    passwordHash: '$2b$10$/jTa6JRchwr/2o0PZIgtbe/Xl94I/T3Y/CNV.e82d2K79tkJtHO1G',
  },
  {
    staffId: 'REC201',
    name: 'Anita Verma',
    role: 'receptionist',
    department: 'Front Desk',
    passwordHash: '$2b$10$b3hZNwSSHu0dUmMsMUp66./mPa/Gs73h0I8DJJl3mC6WURTlo8xgW',
  },
]

async function seedStaff() {
  await connectDatabase()

  for (const staffData of staffSeedData) {
    await Staff.findOneAndUpdate(
      { staffId: staffData.staffId },
      staffData,
      { upsert: true, new: true, setDefaultsOnInsert: true },
    )
    console.log(`Upserted staff record for ${staffData.staffId}`)
  }

  console.log('Staff seed completed.')
  process.exit(0)
}

seedStaff().catch((error) => {
  console.error('Failed to seed staff data', error)
  process.exit(1)
})
