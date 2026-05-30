async function testFlow() {
  console.log("=== Testing HTTP Authentication Flow (Following Redirects) ===");

  // 1. Post to login endpoint
  const loginRes = await fetch('http://localhost:3015/api/auth/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@geolander.ge', password: 'Geolander2026!' })
  });

  console.log("Login POST status:", loginRes.status);
  const loginData = await loginRes.json();
  console.log("Login POST body:", loginData);

  const cookieHeader = loginRes.headers.get('set-cookie');
  console.log("Set-Cookie header received:", cookieHeader ? "YES" : "NO");

  if (!cookieHeader) {
    console.error("No cookie returned!");
    return;
  }

  const match = cookieHeader.match(/app_session=([^;]+)/);
  if (!match) {
    console.error("Could not parse app_session cookie");
    return;
  }
  const sessionCookieValue = match[1];

  // 2. Fetch /admin (default locale prefix is handled as-needed, so /admin is the default)
  let targetUrl = 'http://localhost:3015/admin';
  console.log(`\nFetching: ${targetUrl}`);
  
  let adminRes = await fetch(targetUrl, {
    headers: {
      'Cookie': `app_session=${sessionCookieValue}`
    },
    redirect: 'manual'
  });

  console.log("Status:", adminRes.status);
  console.log("Location header:", adminRes.headers.get('location'));

  // If redirected, follow one more time
  if (adminRes.status === 307 || adminRes.status === 308 || adminRes.status === 302) {
    const loc = adminRes.headers.get('location');
    targetUrl = loc.startsWith('http') ? loc : `http://localhost:3015${loc}`;
    console.log(`\nFollowing redirect to: ${targetUrl}`);
    
    adminRes = await fetch(targetUrl, {
      headers: {
        'Cookie': `app_session=${sessionCookieValue}`
      },
      redirect: 'manual'
    });
    
    console.log("Status after redirect:", adminRes.status);
    console.log("Location header after redirect:", adminRes.headers.get('location'));
  }

  if (adminRes.status === 200) {
    console.log("\nSUCCESS: Managed to access the admin page!");
  } else {
    console.log("\nFAILED: Could not access the admin page.");
  }
}

testFlow().catch(console.error);
