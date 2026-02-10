// Test if the API is working
const apiUrl = 'http://localhost:5000/api';

console.log('Testing API endpoints...\n');

// Test 1: Health check
console.log('1. Testing health endpoint:');
try {
  const response = await fetch(`${apiUrl}/health`);
  const data = await response.json();
  console.log('   Status:', response.status);
  console.log('   Response:', data);
} catch (error) {
  console.error('   Error:', error.message);
}

// Test 2: Try login
console.log('\n2. Testing login endpoint:');
try {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@alphapartners.ca',
      password: 'SecurePass123!@#'
    })
  });
  const data = await response.json();
  console.log('   Status:', response.status);
  console.log('   Response:', JSON.stringify(data, null, 2));
} catch (error) {
  console.error('   Error:', error.message);
}
