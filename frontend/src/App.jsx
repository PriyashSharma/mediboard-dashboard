import { useState } from 'react'
import LoginForm from './components/LoginForm'

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

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-12 text-slate-100">
      {staff ? (
        <div className="w-full max-w-xl space-y-6 rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">
            mediboard
          </p>
          <h1 className="mt-6 text-4xl font-semibold text-white">
            Hello {roleLabels[staff.role] || 'Team Member'}
          </h1>
          <p className="mt-4 text-base text-slate-300">
            Welcome back{staff.name ? `, ${staff.name}` : ''}! You&apos;re
            logged in as {roleLabels[staff.role] || staff.role}.
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-emerald-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            Log out
          </button>
        </div>
      ) : (
        <LoginForm onSuccess={handleLoginSuccess} />
      )}
    </main>
  )
}

export default App
