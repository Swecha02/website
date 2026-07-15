// Usage: node scripts/hash-password.js "YourNewPassword123!"
// Copy the printed hash into an INSERT statement for the admin_users table.
import bcrypt from 'bcryptjs';

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-password.js "YourPassword"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log('\nBcrypt hash:\n');
console.log(hash);
console.log('\nExample SQL to create/update the admin user:\n');
console.log(
  `INSERT INTO admin_users (email, password_hash) VALUES ('admin@swecha.com', '${hash}')\n` +
  `  ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash;\n`
);
