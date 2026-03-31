import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const dbPath = path.join(process.cwd(), 'data.db');
console.log(`[${new Date().toISOString()}] Initializing database at ${dbPath}`);

// Ensure data directory exists if needed, but here it's just root
let db: any;
try {
  db = new Database(dbPath);
  console.log(`[${new Date().toISOString()}] Database connected successfully`);
} catch (error: any) {
  console.error(`[${new Date().toISOString()}] Database connection failed:`, error.message);
  // Fallback to in-memory if file fails
  db = new Database(':memory:');
  console.log(`[${new Date().toISOString()}] Falling back to in-memory database`);
}

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    fullName TEXT,
    role TEXT DEFAULT 'user',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    fullName TEXT,
    companyName TEXT,
    address TEXT,
    notes TEXT,
    isUrgent BOOLEAN,
    fileName TEXT,
    fileMimeType TEXT,
    status TEXT DEFAULT 'pending',
    finalDocName TEXT,
    finalDocMimeType TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS content (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// Seed admin if not exists
const adminCount = db.prepare('SELECT count(*) as count FROM admins').get() as { count: number };
const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
const hashedPassword = bcrypt.hashSync(defaultPassword, 10);

if (adminCount.count === 0) {
  db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').run('admin', hashedPassword);
  console.log('Default admin created: admin / ' + defaultPassword);
} else {
  // Force update admin password to ensure it matches environment or default
  db.prepare('UPDATE admins SET password = ? WHERE username = ?').run(hashedPassword, 'admin');
  console.log('Admin password synchronized');
}

export default db;
