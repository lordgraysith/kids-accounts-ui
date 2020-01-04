import { secureFetch } from './secure-fetch'
export async function getKidById (id) {
  const res = await secureFetch(`/api/kids/${id}`)
  return await res.json()
}

export async function getAllKids () {
  const res = await secureFetch('/api/kids')
  return await res.json()
}
