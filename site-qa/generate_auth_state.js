const fs = require('fs');
const path = require('path');

async function loginStudent() {
  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'priya.patel@gmail.com',
      password: 'Student@123',
    }),
  });

  const data = await res.json();
  const token = data.data?.token || data.token;
  if (!token) {
    throw new Error('Failed to get token: ' + JSON.stringify(data));
  }

  const user = data.data?.user || data.user;

  const storageState = {
    cookies: [
      {
        name: 'token',
        value: token,
        domain: 'localhost',
        path: '/',
        expires: -1,
        httpOnly: false,
        secure: false,
        sameSite: 'Lax',
      },
      {
        name: 'user_role',
        value: user.role || 'student',
        domain: 'localhost',
        path: '/',
        expires: -1,
        httpOnly: false,
        secure: false,
        sameSite: 'Lax',
      },
    ],
    origins: [
      {
        origin: 'http://localhost:3000',
        localStorage: [
          { name: 'token', value: token },
          { name: 'user', value: JSON.stringify(user) },
        ],
      },
    ],
  };

  const authDir = path.join(__dirname, '.auth');
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });
  fs.writeFileSync(path.join(authDir, 'student.json'), JSON.stringify(storageState, null, 2));
  console.log('Successfully saved auth state for', user.email, 'to site-qa/.auth/student.json');
}

loginStudent().catch((err) => {
  console.error(err);
  process.exit(1);
});
