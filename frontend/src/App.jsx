import { useEffect, useMemo, useState } from 'react'
import LoginForm from './components/LoginForm'
import AppHeader from './components/AppHeader'
import DashboardPage from './components/pages/DashboardPage'
import AddStaffPage from './components/pages/AddStaffPage'
import StaffListPage from './components/pages/StaffListPage'
import TimesheetPage from './components/pages/TimesheetPage'

const STAFF_STORAGE_KEY = 'mediboard_staff'

function App() {
  const [staff, setStaff] = useState(() => {
    if (typeof window === 'undefined') return null
    try {
      const stored = window.localStorage.getItem(STAFF_STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch (_error) {
      return null
    }
  })
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    setActiveTab('dashboard')
  }, [staff?.staffId])

  const roleLabels = {
    doctor: 'Doctor',
    receptionist: 'Receptionist',
    admin: 'Admin',
  }

  const handleLoginSuccess = (staffData) => {
    setStaff(staffData)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STAFF_STORAGE_KEY, JSON.stringify(staffData))
    }
  }

  const handleLogout = () => {
    setStaff(null)
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STAFF_STORAGE_KEY)
    }
  }

  const tabs = useMemo(() => {
    if (!staff) return []
    if (staff.role === 'admin') {
      return [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'addStaff', label: 'Add Staff' },
        { id: 'staffList', label: 'Staff List' },
      ]
    }
    if (staff.role === 'doctor') {
      return [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'timesheet', label: 'Timesheet' },
      ]
    }
    return [{ id: 'dashboard', label: 'Dashboard' }]
  }, [staff])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {staff ? (
        <>
          <AppHeader
            staff={staff}
            roleLabels={roleLabels}
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onLogout={handleLogout}
          />
          <main className="mx-auto flex min-h-[calc(100vh-90px)] w-full max-w-5xl flex-col gap-8 px-4 pb-12">

            {activeTab === 'dashboard' ? <DashboardPage staff={staff} /> : null}

            {activeTab === 'addStaff' && staff.role === 'admin' ? (
              <AddStaffPage onSuccess={() => setActiveTab('staffList')} />
            ) : null}

            {activeTab === 'staffList' && staff.role === 'admin' ? <StaffListPage /> : null}

            {activeTab === 'timesheet' && staff.role === 'doctor' ? (
              <TimesheetPage staff={staff} />
            ) : null}
          </main>
        </>
      ) : (
        <main className="flex min-h-screen items-center justify-center px-4 py-12">
          <LoginForm onSuccess={handleLoginSuccess} />
        </main>
      )}
    </div>
  )
}

export default App
