const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  })

  let responseBody = null
  try {
    responseBody = await response.json()
  } catch (_error) {
    // ignore json parse errors for empty responses
  }

  if (!response.ok) {
    const message = responseBody?.message || 'Request failed'
    const error = new Error(message)
    error.status = response.status
    error.details = responseBody?.details
    throw error
  }

  return responseBody
}

export async function loginStaff(credentials) {
  const result = await request('/auth/login', {
    method: 'POST',
    body: credentials,
  })
  return result?.data?.staff
}

export async function createStaff(staffData) {
  const result = await request('/staff', {
    method: 'POST',
    body: staffData,
  })
  return result?.data?.staff
}

export async function fetchStaffList(params = {}) {
  const query = new URLSearchParams()
  if (params.role && params.role !== 'all') {
    query.set('role', params.role)
  }

  const result = await request(`/staff${query.toString() ? `?${query.toString()}` : ''}`, {
    method: 'GET',
  })
  return result?.data?.staff ?? []
}
