import { secureFetch } from './secure-fetch'
export async function createTransaction (accountId, amount, description) {
  const res = await secureFetch('/api/transactions/', {
    body: JSON.stringify({
      accountId,
      amount,
      description
    }),
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  return await res.json()
}

export async function deleteTransaction (accountId) {
  const res = await secureFetch('/api/transactions/', {
    body: JSON.stringify({
      accountId
    }),
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  return await res.json()
}
