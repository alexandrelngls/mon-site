export async function login(email, password) {
  return fetch('https://secure.alexandrelanglois.me/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
}
