import fetch from 'node-fetch';

fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@alphapartners.ca',
    password: 'SecurePass123!@#',
    role: 'admin'
  })
})
.then(r => r.json())
.then(d => console.log(JSON.stringify(d, null, 2)))
.catch(e => console.error('Error:', e.message))
