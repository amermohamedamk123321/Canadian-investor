// Test login endpoint with detailed output
(async () => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@alphapartners.ca',
        password: 'SecurePass123!@#'
      })
    });
    
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('OK:', response.ok);
    console.log('Headers:');
    response.headers.forEach((value, key) => console.log('  ', key, ':', value));
    
    const text = await response.text();
    console.log('\nBody:', text);
    
    try {
      const json = JSON.parse(text);
      console.log('\nParsed JSON:', JSON.stringify(json, null, 2));
    } catch (e) {
      console.log('\nCould not parse as JSON');
    }
  } catch (error) {
    console.error('Request failed:', error.message);
  }
})();
