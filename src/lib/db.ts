import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const dbPath = path.join(process.cwd(), 'data.db');

// Ensure data directory exists if needed, but here it's just root
const db = new Database(dbPath);

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT,
    companyName TEXT,
    address TEXT,
    notes TEXT,
    isUrgent BOOLEAN,
    fileName TEXT,
    fileMimeType TEXT,
    status TEXT DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS content (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// Seed admin if not exists
const adminCount = db.prepare('SELECT count(*) as count FROM admins').get() as { count: number };
if (adminCount.count === 0) {
  const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', 10);
  db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').run('admin', hashedPassword);
  console.log('Default admin created: admin / ' + (process.env.ADMIN_PASSWORD || 'admin123'));
}

export default db;
