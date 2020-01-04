export async function authenticate (password) {
  const res = await fetch('/api/auth/login', {
    body: JSON.stringify({ password }),
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  if (!res.ok) {
    const err = await res.json()
    throw err
  }
  const { authToken } = await res.json()
  if (!authToken) throw Error('no auth token')
  localStorage.authToken = authToken
  return authToken
}
