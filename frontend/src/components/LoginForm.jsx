import { useState } from 'react'
import { loginStaff } from '../services/apiClient.js'

function LoginForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    staffId: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: 'info', message: 'Signing you in...' })

    try {
      const staff = await loginStaff(formData)
      setStatus({
        type: 'success',
        message: `Welcome back, ${staff?.name || 'team member'}!`,
      })
      setFormData((prev) => ({
        ...prev,
        password: '',
      }))
      onSuccess?.(staff)
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Unable to sign in. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const statusVariants = {
    success: 'text-emerald-200',
    error: 'text-rose-300',
    info: 'text-slate-300',
    idle: 'text-slate-300',
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">
            mediboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white">
            Staff Portal Login
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Use your staff credentials to continue — we&apos;ll detect your role
            automatically.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              className="text-sm font-semibold text-slate-200"
              htmlFor="staffId"
            >
              Staff ID
            </label>
            <input
              id="staffId"
              name="staffId"
              type="text"
              required
              value={formData.staffId}
              onChange={handleChange}
              placeholder="eg. DOC-1056 / REC-3021 / ADM-4001"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-base text-white outline-none placeholder:text-slate-500 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-semibold text-slate-200"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 pr-12 text-base text-white outline-none placeholder:text-slate-500 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-2 flex items-center rounded-full p-2 text-slate-400 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 0 0 1.06-1.06L20.4 18.34C18.74 20.03 15.85 21.5 12 21.5c-4.72 0-8.5-2.73-10.4-6.34a2.25 2.25 0 0 1 0-2.32 13.47 13.47 0 0 1 3.27-4.18L3.53 2.47Z" />
                    <path d="M9.53 6.35A7.67 7.67 0 0 1 12 6c5 0 8.5 3.1 9.9 6.3.06.14.1.3.1.45s-.04.31-.1.45c-.94 2.08-2.58 3.95-4.67 5.2l-1.66-1.66A4 4 0 0 0 9 9.1L9.53 6.35Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M12 5c5 0 8.5 3.1 9.9 6.3.06.14.1.3.1.45s-.04.31-.1.45C20.5 15.9 17 19 12 19c-5 0-8.5-3.1-9.9-6.3-.06-.14-.1-.3-.1-.45s.04-.31.1-.45C3.5 8.1 7 5 12 5Zm0 2C8.21 7 5.25 9.46 4.1 12c1.15 2.54 4.1 5 7.9 5s6.75-2.46 7.9-5C18.75 9.46 15.79 7 12 7Zm0 2.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-emerald-500 px-5 py-3 text-base font-semibold text-emerald-950 transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Authenticating…' : 'Sign in'}
          </button>

          {status.message ? (
            <p
              className={`text-center text-sm ${statusVariants[status.type]}`}
              role="status"
              aria-live="polite"
            >
              {status.message}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  )
}

export default LoginForm
