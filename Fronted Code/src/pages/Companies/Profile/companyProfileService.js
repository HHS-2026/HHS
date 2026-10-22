const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

async function companyRequest(path, options = {}) {
  const token = sessionStorage.getItem('token')

  if (!token) {
    throw new Error('Please log in before submitting a company or recruiter application.')
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  })

  let result = {}
  try {
    result = await response.json()
  } catch {
    if (response.status !== 204) {
      throw new Error('The server returned an unreadable response. Please try again.')
    }
  }

  if (!response.ok) {
    const message = response.status === 404 && options.method !== 'PUT'
      ? 'No saved company profile was found. You can start a new application below.'
      : result.message || 'Unable to complete your application. Please try again.'
    throw new Error(message)
  }

  return result.data ?? result
}

function toFormData(values) {
  const formData = new FormData()

  Object.entries(values).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value)
    } else if (typeof value === 'boolean') {
      formData.append(key, String(value))
    } else {
      formData.append(key, value ?? '')
    }
  })

  return formData
}

export function getCompanyProfile() {
  return companyRequest('/api/companies/me')
}

export function saveCompanyProfile(profile) {
  return companyRequest('/api/companies/profile', {
    method: 'PUT',
    body: toFormData(profile),
  })
}

export function saveRecruiterProfile(profile) {
  return companyRequest('/api/recruiters/profile', {
    method: 'PUT',
    body: toFormData(profile),
  })
}
