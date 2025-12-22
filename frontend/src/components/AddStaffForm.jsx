import { useState } from 'react'
import { createStaff } from '../services/apiClient.js'

function AddStaffForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    staffId: '',
    name: '',
    role: 'doctor',
    department: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const roleOptions = [
    { id: 'doctor', label: 'Doctor' },
    { id: 'receptionist', label: 'Receptionist' },
  ]

  const rolePlaceholders = {
    doctor: {
      staffId: 'DOC-1201',
      name: 'Dr. Rohan Sharma',
      department: 'Cardiology, Pediatrics...',
      password: 'Doctor@123',
    },
    receptionist: {
      staffId: 'REC-3050',
      name: 'Anita Verma',
      department: 'Front Desk, Help Desk...',
      password: 'Reception@123',
    },
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: 'info', message: 'Saving staff member...' })

    try {
      const createdStaff = await createStaff(formData)
      const createdRoleLabel =
        roleOptions.find((option) => option.id === createdStaff.role)?.label || createdStaff.role
      setStatus({
        type: 'success',
        message: `${createdStaff.name} added as ${createdRoleLabel}.`,
      })
      setFormData({
        staffId: '',
        name: '',
        role: formData.role,
        department: '',
        password: '',
      })
      onSuccess?.(createdStaff)
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Unable to add staff member. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-100 shadow-2xl backdrop-blur">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-200">mediboard</p>
        <h2 className="mt-1 text-2xl font-semibold">Add Staff Member</h2>
        <p className="text-sm text-slate-400">
          Create new doctor or receptionist accounts with onboarding credentials.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <p className="text-sm font-semibold text-slate-200">Select role</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {roleOptions.map((option) => {
                const active = formData.role === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleRoleSelect(option.id)}
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      active
                        ? 'border-emerald-400 bg-emerald-500/10 text-white'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:border-emerald-200/40 hover:text-white'
                    }`}
                    aria-pressed={active}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold" htmlFor="staffId">
                Staff ID
              </label>
              <input
                id="staffId"
                name="staffId"
                type="text"
                required
                value={formData.staffId}
                onChange={handleChange}
                placeholder={`eg. ${rolePlaceholders[formData.role].staffId}`}
                className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-base text-white outline-none placeholder:text-slate-500 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={rolePlaceholders[formData.role].name}
                className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-base text-white outline-none placeholder:text-slate-500 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold" htmlFor="department">
                Department
              </label>
              <input
                id="department"
                name="department"
                type="text"
                required
                value={formData.department}
                onChange={handleChange}
                placeholder={rolePlaceholders[formData.role].department}
                className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-base text-white outline-none placeholder:text-slate-500 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold" htmlFor="password">
                Temporary Password
              </label>
              <input
                id="password"
                name="password"
                type="text"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder={rolePlaceholders[formData.role].password}
                className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-base text-white outline-none placeholder:text-slate-500 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Saving…' : 'Save Staff Member'}
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  staffId: '',
                  name: '',
                  department: '',
                  password: '',
                }))
              }
              className="text-sm font-semibold text-slate-400 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              Reset form
            </button>
            {status.message ? (
              <p
                className={`text-sm ${
                  status.type === 'error'
                    ? 'text-rose-300'
                    : status.type === 'success'
                      ? 'text-emerald-200'
                      : 'text-slate-300'
                }`}
              >
                {status.message}
              </p>
            ) : null}
          </div>
        </form>
    </div>
  )
}

export default AddStaffForm
