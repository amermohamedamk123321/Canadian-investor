const data = JSON.stringify({
  email: 'admin@alphapartners.ca',
  password: 'SecurePass123!@#',
  role: 'admin'
});

try {
  const response = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data
  });
  
  const result = await response.json();
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error('Error:', error.message);
}
