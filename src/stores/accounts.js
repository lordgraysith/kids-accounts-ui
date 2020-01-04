import { secureFetch } from './secure-fetch'
export async function getKidWithAccounts (id) {
  const res = await secureFetch(`/api/kids/${id}/accounts`)
  return await res.json()
}
export async function getKidAndAccount (kidId, accountId) {
  const res = await secureFetch(`/api/kids/${kidId}/accounts/${accountId}`)
  return await res.json()
}
