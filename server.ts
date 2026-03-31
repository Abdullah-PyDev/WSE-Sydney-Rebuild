import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import { Resend } from "resend";
import db from "./src/lib/db.ts";

dotenv.config();

export const app = express();

const resend = new Resend(process.env.RESEND_API_KEY);
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const UPLOADS_DIR = "/tmp/uploads";

// Ensure uploads directory exists
try {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
  // Test writability
  const testFile = path.join(UPLOADS_DIR, ".test-write");
  fs.writeFileSync(testFile, "test");
  fs.unlinkSync(testFile);
  console.log(`[${new Date().toISOString()}] Uploads directory is writable: ${UPLOADS_DIR}`);
} catch (error: any) {
  console.error(`[${new Date().toISOString()}] Uploads directory error:`, error.message);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

async function startServer() {
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({
    origin: (origin, callback) => {
      // Allow all origins for now, but specify it for credentials
      callback(null, true);
    },
    credentials: true,
    exposedHeaders: ['x-user-id']
  }));
  app.use(cookieParser());

  // User ID Cookie Middleware
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] Incoming request: ${req.method} ${req.url}`);
    const cookieName = "user_id_cookie";
    const headerName = "x-user-id";
    let userIdCookie = req.cookies[cookieName] || req.headers[headerName];
    
    if (!userIdCookie) {
      userIdCookie = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      res.cookie(cookieName, userIdCookie, { 
        maxAge: 365 * 24 * 60 * 60 * 1000, 
        httpOnly: true,
        sameSite: 'none',
        secure: true
      });
      console.log(`[${new Date().toISOString()}] New user_id_cookie generated: ${userIdCookie}`);
    } else {
      console.log(`[${new Date().toISOString()}] Existing user_id_cookie found: ${userIdCookie}`);
    }
    
    (req as any).user_id_cookie = userIdCookie;
    // Also set it in a header for the response so the client can store it
    res.setHeader(headerName, userIdCookie as string);
    next();
  });

  // Request logging
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Serve static files from uploads
  app.use("/uploads", express.static(UPLOADS_DIR));

  // Admin Auth Middleware
  const adminAuth = (req: any, res: any, next: any) => {
    const token = req.cookies.admin_token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      (req as any).admin = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  // API routes
  app.get("/api/health", (req, res) => {
    try {
      // Test DB connection
      db.prepare("SELECT 1").get();
      res.json({ 
        status: "ok", 
        database: "connected",
        env: process.env.NODE_ENV
      });
    } catch (error: any) {
      res.status(500).json({ 
        status: "error", 
        database: "disconnected", 
        error: error.message 
      });
    }
  });

  app.get("/api/debug-db", adminAuth, (req, res) => {
    const submissions = db.prepare("SELECT * FROM submissions").all();
    const verification = db.prepare("SELECT * FROM verification").all();
    res.json({ submissions, verification });
  });

  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    const admin = db.prepare("SELECT * FROM admins WHERE username = ?").get(username);
    if (!admin || !bcrypt.compareSync(password, admin.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: "1d" });
    res.cookie("admin_token", token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
    res.json({ success: true });
  });

  app.post("/api/admin/logout", (req, res) => {
    res.clearCookie("admin_token");
    res.json({ success: true });
  });

  app.get("/api/admin/check", adminAuth, (req, res) => {
    res.json({ authenticated: true, admin: (req as any).admin });
  });

  app.get("/api/admin/stats", adminAuth, (req, res) => {
    const totalSubmissions = db.prepare("SELECT count(*) as count FROM submissions").get().count;
    const totalVerifications = db.prepare("SELECT count(*) as count FROM verification").get().count;
    const pendingSubmissions = db.prepare("SELECT count(*) as count FROM submissions WHERE status = 'pending'").get().count;
    const urgentSubmissions = db.prepare("SELECT count(*) as count FROM submissions WHERE isUrgent = 1").get().count;
    
    res.json({
      totalSubmissions,
      totalVerifications,
      pendingSubmissions,
      urgentSubmissions
    });
  });

  app.get("/api/admin/verifications", adminAuth, (req, res) => {
    const verifications = db.prepare("SELECT * FROM verification ORDER BY createdAt DESC").all();
    res.json(verifications);
  });

  app.get("/api/debug-cookie", (req: any, res) => {
    res.json({ 
      userIdCookie: req.user_id_cookie,
      allCookies: req.cookies
    });
  });

  // Submission Routes
  app.get("/api/submission-status", (req: any, res) => {
    const userIdCookie = req.user_id_cookie;
    console.log(`[${new Date().toISOString()}] Checking status for user: ${userIdCookie}`);
    const submissionCount = db.prepare("SELECT count(*) as count FROM submissions WHERE userIdCookie = ?").get(userIdCookie) as { count: number };
    const verification = db.prepare("SELECT * FROM verification WHERE userIdCookie = ?").get(userIdCookie);

    // Debug: log all submissions for this cookie
    const allSubmissions = db.prepare("SELECT id, createdAt FROM submissions WHERE userIdCookie = ?").all(userIdCookie);
    console.log(`[${new Date().toISOString()}] All submissions for ${userIdCookie}:`, allSubmissions);

    const needsVerification = submissionCount.count >= 1 && (!verification || !verification.isVerified);
    console.log(`[${new Date().toISOString()}] Status for ${userIdCookie}: count=${submissionCount.count}, verified=${verification ? !!verification.isVerified : false}, needsVerification=${needsVerification}`);

    res.json({
      count: submissionCount.count,
      isVerified: verification ? !!verification.isVerified : false,
      needsVerification: needsVerification
    });
  });

  app.post("/api/verify", async (req: any, res: any) => {
    const { name, email, phone, company } = req.body;
    const userIdCookie = req.user_id_cookie;
    console.log(`[${new Date().toISOString()}] POST /api/verify for user: ${userIdCookie}`);
    console.log(`[${new Date().toISOString()}] Data:`, { name, email, phone, company });

    try {
      // Generate 6-digit verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store verification info with isVerified = 0
      const result = db.prepare(`
        INSERT OR REPLACE INTO verification (userIdCookie, name, email, phone, company, verificationCode, isVerified) 
        VALUES (?, ?, ?, ?, ?, ?, 0)
      `).run(userIdCookie, name, email, phone, company, verificationCode);
      
      console.log(`[${new Date().toISOString()}] Verification info saved for ${userIdCookie}. Code: ${verificationCode}`);

      // Send email via Resend
      if (process.env.RESEND_API_KEY) {
        console.log(`[${new Date().toISOString()}] Attempting to send verification email to ${email}...`);
        try {
          await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Your Estimator Verification Code",
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; rounded: 12px;">
                <h2 style="color: #1e293b; margin-bottom: 16px;">Verify Your Email</h2>
                <p style="color: #475569; line-height: 1.5;">Thank you for using our estimator tool. Please use the following code to unlock the tool and continue your project planning.</p>
                <div style="background-color: #f8fafc; padding: 24px; text-align: center; border-radius: 8px; margin: 24px 0;">
                  <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #0f172a;">${verificationCode}</span>
                </div>
                <p style="color: #64748b; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
              </div>
            `
          });
          console.log(`[${new Date().toISOString()}] Verification email sent successfully.`);
        } catch (emailError: any) {
          console.error(`[${new Date().toISOString()}] Failed to send verification email:`, emailError);
          // In development, we might want to log the code so the user can still proceed if email fails
          console.log(`[DEBUG] Verification code for ${email}: ${verificationCode}`);
        }
      } else {
        console.log(`[DEBUG] RESEND_API_KEY not set. Verification code for ${email}: ${verificationCode}`);
      }

      res.json({ success: true, message: "Verification code sent to your email." });
    } catch (error: any) {
      console.error(`[${new Date().toISOString()}] Error in /api/verify:`, error);
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/verify/code", async (req: any, res: any) => {
    const { code } = req.body;
    const userIdCookie = req.user_id_cookie;
    console.log(`[${new Date().toISOString()}] POST /api/verify/code for user: ${userIdCookie}, code: ${code}`);

    try {
      const verification = db.prepare("SELECT * FROM verification WHERE userIdCookie = ?").get(userIdCookie);
      
      if (!verification) {
        return res.status(404).json({ error: "Verification session not found. Please submit your details again." });
      }

      if (verification.verificationCode === code) {
        db.prepare("UPDATE verification SET isVerified = 1 WHERE userIdCookie = ?").run(userIdCookie);
        console.log(`[${new Date().toISOString()}] User ${userIdCookie} verified successfully.`);
        res.json({ success: true });
      } else {
        res.status(400).json({ error: "Invalid verification code. Please try again." });
      }
    } catch (error: any) {
      console.error(`[${new Date().toISOString()}] Error in /api/verify/code:`, error);
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/submissions", (req, res, next) => {
    console.log(`[${new Date().toISOString()}] POST /api/submissions - Content-Type: ${req.get('Content-Type')}`);
    console.log(`[${new Date().toISOString()}] Headers:`, req.headers);
    console.log(`[${new Date().toISOString()}] Cookies:`, req.cookies);
    upload.single("file")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        console.error(`[${new Date().toISOString()}] Multer error:`, err);
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      } else if (err) {
        console.error(`[${new Date().toISOString()}] Unknown upload error:`, err);
        return res.status(500).json({ error: `Unknown upload error: ${err.message}` });
      }
      next();
    });
  }, (req: any, res) => {
    const { fullName, companyName, address, notes, isUrgent } = req.body;
    const fileName = req.file ? req.file.filename : null;
    const fileMimeType = req.file ? req.file.mimetype : null;
    const userId = null; // Anonymous submission
    const userIdCookie = req.user_id_cookie;
    console.log(`[${new Date().toISOString()}] Processing submission for: ${userIdCookie}`);
    console.log(`[${new Date().toISOString()}] Body:`, req.body);

    // Check if user needs verification
    const submissionCount = db.prepare("SELECT count(*) as count FROM submissions WHERE userIdCookie = ?").get(userIdCookie) as { count: number };
    const verification = db.prepare("SELECT * FROM verification WHERE userIdCookie = ?").get(userIdCookie);

    if (submissionCount.count >= 1 && (!verification || !verification.isVerified)) {
      console.log(`[${new Date().toISOString()}] Submission blocked for ${userIdCookie}: count=${submissionCount.count}, needs verification`);
      return res.status(403).json({ error: "Verification required after 1 estimate." });
    }

    try {
      const result = db.prepare(`
        INSERT INTO submissions (userId, userIdCookie, fullName, companyName, address, notes, isUrgent, fileName, fileMimeType)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(userId, userIdCookie, fullName, companyName, address, notes, isUrgent === "true" ? 1 : 0, fileName, fileMimeType);
      console.log(`[${new Date().toISOString()}] Submission saved with ID: ${result.lastInsertRowid}`);
      res.json({ id: result.lastInsertRowid });
    } catch (error: any) {
      console.error(`[${new Date().toISOString()}] Database error during submission:`, error);
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/submissions", adminAuth, (req: any, res) => {
    const submissions = db.prepare("SELECT * FROM submissions ORDER BY createdAt DESC").all();
    res.json(submissions);
  });

  app.patch("/api/submissions/:id", adminAuth, (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    try {
      db.prepare("UPDATE submissions SET status = ? WHERE id = ?").run(status, id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/submissions/:id/upload", adminAuth, upload.single("file"), (req, res) => {
    const { id } = req.params;
    const finalDocName = req.file ? req.file.filename : null;
    const finalDocMimeType = req.file ? req.file.mimetype : null;

    try {
      db.prepare("UPDATE submissions SET finalDocName = ?, finalDocMimeType = ?, status = 'delivered' WHERE id = ?").run(finalDocName, finalDocMimeType, id);
      res.json({ success: true, finalDocName });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/submissions/:id", adminAuth, (req, res) => {
    const { id } = req.params;
    try {
      db.prepare("DELETE FROM submissions WHERE id = ?").run(id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Content Routes
  app.get("/api/content", (req, res) => {
    const content = db.prepare("SELECT * FROM content").all();
    res.json(content);
  });

  app.post("/api/content", adminAuth, (req, res) => {
    const { key, value } = req.body;
    db.prepare("INSERT OR REPLACE INTO content (key, value) VALUES (?, ?)").run(key, value);
    res.json({ success: true });
  });

  app.all("/api/*", (req, res) => {
    console.log(`API 404: ${req.method} ${req.url}`);
    res.status(404).json({ error: `API route ${req.method} ${req.url} not found` });
  });

  // Global error handler
  app.use((err: any, req: any, res: any, next: any) => {
    console.error("Unhandled Server Error:", err);
    res.status(err.status || 500).json({
      error: err.message || "Internal Server Error",
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});

export default app;
