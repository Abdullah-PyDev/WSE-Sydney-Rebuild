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
    userIdCookie TEXT,
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

  CREATE TABLE IF NOT EXISTS verification (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userIdCookie TEXT UNIQUE,
    name TEXT,
    email TEXT,
    phone TEXT,
    company TEXT,
    isVerified BOOLEAN DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS content (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS user_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip_address TEXT,
    session_token TEXT UNIQUE,
    usage_count INTEGER DEFAULT 0,
    last_used DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_blocked BOOLEAN DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER,
    name TEXT,
    email TEXT,
    phone TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(session_id) REFERENCES user_sessions(id)
  );

  CREATE TABLE IF NOT EXISTS boq_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER,
    name TEXT,
    email TEXT,
    phone TEXT,
    project_type TEXT,
    description TEXT,
    file_name TEXT,
    file_path TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(session_id) REFERENCES user_sessions(id)
  );
`);

// Migration: Ensure all required columns exist in 'verification' and handle legacy 'verifications' table
try {
  // 1. Ensure 'verification' table has all required columns first
  const columns = db.prepare("PRAGMA table_info(verification)").all();
  const columnNames = columns.map((col: any) => col.name);
  
  const requiredColumns = ['name', 'email', 'phone', 'company', 'isVerified'];
  requiredColumns.forEach(col => {
    if (!columnNames.includes(col)) {
      console.log(`Migration: Adding "${col}" column to "verification" table`);
      const type = col === 'isVerified' ? 'BOOLEAN DEFAULT 0' : 'TEXT';
      db.exec(`ALTER TABLE verification ADD COLUMN ${col} ${type}`);
    }
  });

  // 2. Check if legacy table exists and migrate data carefully
  const legacyTable = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='verifications'").get();
  if (legacyTable) {
    console.log('Migration: Found legacy "verifications" table, migrating data to "verification"');
    
    // Check columns in legacy table to avoid "no such column" errors during migration
    const legacyColumns = db.prepare("PRAGMA table_info(verifications)").all();
    const legacyColumnNames = legacyColumns.map((col: any) => col.name);
    
    // Build a safe SELECT statement
    const selectFields = ['userIdCookie', 'name', 'email', 'phone', 'company', 'isVerified', 'createdAt']
      .map(field => legacyColumnNames.includes(field) ? field : `NULL as ${field}`)
      .join(', ');

    try {
      db.exec(`INSERT OR IGNORE INTO verification (userIdCookie, name, email, phone, company, isVerified, createdAt) 
               SELECT ${selectFields} FROM verifications`);
      console.log('Migration: Data moved successfully');
      
      // Optionally drop legacy table after successful migration
      // db.exec("DROP TABLE verifications");
    } catch (moveError) {
      console.error('Migration: Error moving data:', moveError);
    }
  }
} catch (error) {
  console.error('Migration failed for "verification" table:', error);
}

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
