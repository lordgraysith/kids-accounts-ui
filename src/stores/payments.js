import { secureFetch } from './secure-fetch'
export async function makePayment (kidId, amount, description) {
  const res = await secureFetch('/api/payments/', {
    body: JSON.stringify({
      kidId,
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
