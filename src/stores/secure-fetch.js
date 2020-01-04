import { get } from 'lodash'
export async function secureFetch (path, options) {
  const headers = get(options, 'headers', new Headers())
  headers.set('authToken', localStorage.authToken)
  const newOptions = Object.assign({}, options, { headers })
  const res = await fetch(path, newOptions)
  if (res.status === 401) {
    window.location = '/login'
  }
  return res
}
