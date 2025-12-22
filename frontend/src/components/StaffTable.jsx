import { useEffect, useMemo, useState } from 'react'
import { fetchStaffList } from '../services/apiClient.js'

function StaffTable() {
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshToken, setRefreshToken] = useState(0)
  const [roleFilter, setRoleFilter] = useState('all')
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    setError('')

    fetchStaffList({ role: roleFilter })
      .then((data) => {
        if (isMounted) {
          setStaff(data)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Unable to load staff list.')
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [refreshToken, roleFilter])

  const roleLabels = useMemo(
    () => ({
      doctor: 'Doctor',
      receptionist: 'Receptionist',
      admin: 'Admin',
    }),
    [],
  )

  return (
    <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-200">
            mediboard
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-white">Staff Directory</h2>
          <p className="text-sm text-slate-400">
            Track all registered doctors, receptionists, and admins.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-emerald-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              {roleFilter === 'all'
                ? 'All roles'
                : roleFilter === 'doctor'
                  ? 'Doctors'
                  : 'Receptionists'}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`h-4 w-4 transition ${isFilterMenuOpen ? 'rotate-180' : ''}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {isFilterMenuOpen ? (
              <div className="absolute left-0 top-full mt-2 w-44 rounded-xl border border-white/10 bg-slate-900/95 p-1 text-sm shadow-2xl backdrop-blur">
                {[
                  { id: 'all', label: 'All roles' },
                  { id: 'doctor', label: 'Doctors' },
                  { id: 'receptionist', label: 'Receptionists' },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setRoleFilter(option.id)
                      setIsFilterMenuOpen(false)
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-4 py-2 text-left transition ${
                      roleFilter === option.id
                        ? 'bg-emerald-500/20 text-white'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {option.label}
                    {roleFilter === option.id ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 text-emerald-300"
                      >
                        <path
                          fillRule="evenodd"
                          d="M20.047 7.716a.75.75 0 0 1 .237 1.032l-8 12a.75.75 0 0 1-1.154.132l-5-5a.75.75 0 0 1 1.06-1.06l4.353 4.353 7.493-11.24a.75.75 0 0 1 1.011-.217Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => setRefreshToken((prev) => prev + 1)}
            className="rounded-2xl border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-emerald-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-slate-300">Loading staff members…</p>
      ) : error ? (
        <p className="text-sm text-rose-300">{error}</p>
      ) : staff.length === 0 ? (
        <p className="text-sm text-slate-300">No staff members found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3">Staff ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Last Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-100">
              {staff.map((member) => (
                <tr key={member.staffId}>
                  <td className="px-4 py-3 font-semibold">{member.staffId}</td>
                  <td className="px-4 py-3">{member.name}</td>
                  <td className="px-4 py-3">{roleLabels[member.role] || member.role}</td>
                  <td className="px-4 py-3">{member.department || '—'}</td>
                  <td className="px-4 py-3 text-slate-400">
                    {member.lastLoginAt
                      ? new Date(member.lastLoginAt).toLocaleString()
                      : 'Never'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default StaffTable
