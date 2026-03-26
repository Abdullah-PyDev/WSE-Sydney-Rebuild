import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { Resend } from "resend";
import dotenv from "dotenv";
import multer from "multer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "./src/lib/db";

dotenv.config();

const UPLOADS_DIR = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";
const resend = new Resend(process.env.RESEND_API_KEY);
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024 // 25MB limit
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      env: process.env.NODE_ENV,
      resendConfigured: !!process.env.RESEND_API_KEY
    });
  });

  // Admin Auth
  app.post("/api/admin/login", (req, res) => {
    const username = req.body.username?.trim();
    const password = req.body.password?.trim();
    
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username) as any;
    
    if (admin && bcrypt.compareSync(password, admin.password)) {
      const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '24h' });
      return res.json({ success: true, token });
    }
    
    res.status(401).json({ error: "Invalid credentials" });
  });

  // Middleware to verify JWT
  const authenticateAdmin = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1] || req.query.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.admin = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  // Admin: Get Submissions
  app.get("/api/admin/submissions", authenticateAdmin, (req, res) => {
    const submissions = db.prepare('SELECT * FROM submissions ORDER BY createdAt DESC').all();
    res.json({ success: true, submissions });
  });

  // Admin: Get Content
  app.get("/api/admin/content", (req, res) => {
    const content = db.prepare('SELECT * FROM content').all();
    const contentMap = content.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json({ success: true, content: contentMap });
  });

  // Admin: Update Content
  app.post("/api/admin/content", authenticateAdmin, (req, res) => {
    const { key, value } = req.body;
    db.prepare('INSERT OR REPLACE INTO content (key, value) VALUES (?, ?)').run(key, value);
    res.json({ success: true });
  });

  // Admin: Get Stats
  app.get("/api/admin/stats", authenticateAdmin, (req, res) => {
    const total = db.prepare('SELECT count(*) as count FROM submissions').get() as any;
    const urgent = db.prepare('SELECT count(*) as count FROM submissions WHERE isUrgent = 1').get() as any;
    const pending = db.prepare("SELECT count(*) as count FROM submissions WHERE status = 'pending'").get() as any;
    const processed = db.prepare("SELECT count(*) as count FROM submissions WHERE status = 'processed'").get() as any;
    
    res.json({ 
      success: true, 
      stats: { 
        total: total.count, 
        urgent: urgent.count, 
        pending: pending.count,
        processed: processed.count
      } 
    });
  });

  // Admin: Update Submission Status
  app.patch("/api/admin/submissions/:id/status", authenticateAdmin, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.prepare('UPDATE submissions SET status = ? WHERE id = ?').run(status, id);
    res.json({ success: true });
  });

  // Admin: Delete Submission
  app.delete("/api/admin/submissions/:id", authenticateAdmin, (req, res) => {
    const { id } = req.params;
    // Optionally delete file too
    const sub = db.prepare('SELECT fileName FROM submissions WHERE id = ?').get(id) as any;
    if (sub?.fileName) {
      const filePath = path.join(UPLOADS_DIR, sub.fileName);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    db.prepare('DELETE FROM submissions WHERE id = ?').run(id);
    res.json({ success: true });
  });

  // Admin: Download File
  app.get("/api/admin/submissions/:id/file", authenticateAdmin, (req, res) => {
    const { id } = req.params;
    const sub = db.prepare('SELECT fileName, fileMimeType FROM submissions WHERE id = ?').get(id) as any;
    
    if (!sub || !sub.fileName) {
      return res.status(404).json({ error: "File not found" });
    }

    const filePath = path.join(UPLOADS_DIR, sub.fileName);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found on disk" });
    }

    const isPreview = req.query.preview === 'true';
    res.setHeader('Content-Type', sub.fileMimeType || 'application/octet-stream');
    if (!isPreview) {
      res.setHeader('Content-Disposition', `attachment; filename="${sub.fileName}"`);
    } else {
      res.setHeader('Content-Disposition', 'inline');
    }
    fs.createReadStream(filePath).pipe(res);
  });

  // Test email route
  app.get("/api/test-email", async (req, res) => {
    try {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "RESEND_API_KEY not configured" });
      }
      const { data, error } = await resend.emails.send({
        from: "WSE Sydney <onboarding@resend.dev>",
        to: ["f250039@cfd.nu.edu.pk"],
        subject: "Test Email from WSE Sydney",
        html: "<p>This is a test email to verify Resend configuration.</p>"
      });
      if (error) {
        return res.status(400).json({ error });
      }
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error" });
    }
  });

  // API Route to send BOQ request
  app.post("/api/send-boq", (req, res, next) => {
    console.log("Received POST /api/send-boq request");
    next();
  }, (req, res, next) => {
    upload.array("files")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        console.error("Multer error:", err);
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      } else if (err) {
        console.error("Unknown upload error:", err);
        return res.status(500).json({ error: "Unknown upload error" });
      }
      next();
    });
  }, async (req, res) => {
    console.log("Processing BOQ request body:", JSON.stringify(req.body, null, 2));
    const { fullName, companyName, address, notes, isUrgent } = req.body;
    const files = req.files as Express.Multer.File[];
    console.log("Files received:", files?.map(f => ({ name: f.originalname, size: f.size })) || []);

    try {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        console.error("RESEND_API_KEY is missing in environment");
        throw new Error("RESEND_API_KEY is not configured on the server");
      }

      console.log("Attempting to send email via Resend...");
      const attachments = files?.map((file) => ({
        filename: file.originalname,
        content: file.buffer,
      })) || [];

      const { data, error } = await resend.emails.send({
        from: "WSE Sydney <onboarding@resend.dev>",
        to: ["f250039@cfd.nu.edu.pk"],
        subject: `New BOQ Request: ${companyName} ${isUrgent === "true" ? "(URGENT)" : ""}`,
        html: `
          <h1>New BOQ Request Received</h1>
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Company Name:</strong> ${companyName}</p>
          <p><strong>Project Address:</strong> ${address}</p>
          <p><strong>Urgent:</strong> ${isUrgent === "true" ? "Yes" : "No"}</p>
          <p><strong>Notes:</strong></p>
          <p>${notes || "No additional notes provided."}</p>
          <hr />
          <p>This email was sent from the WSE Sydney Estimating Portal.</p>
        `,
        attachments,
      });

      if (error) {
        console.error("Resend API returned an error:", JSON.stringify(error, null, 2));
        return res.status(400).json({ error });
      }

      console.log("Email sent successfully:", JSON.stringify(data, null, 2));
      
      // Save file to disk if exists
      let savedFileName = null;
      let savedMimeType = null;
      if (files && files.length > 0) {
        const file = files[0];
        savedFileName = `${Date.now()}-${file.originalname}`;
        savedMimeType = file.mimetype;
        fs.writeFileSync(path.join(UPLOADS_DIR, savedFileName), file.buffer);
      }

      // Store in DB
      db.prepare('INSERT INTO submissions (fullName, companyName, address, notes, isUrgent, fileName, fileMimeType) VALUES (?, ?, ?, ?, ?, ?, ?)')
        .run(fullName, companyName, address, notes, isUrgent === "true" ? 1 : 0, savedFileName, savedMimeType);

      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Server error during BOQ processing:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error" });
    }
  });

  // Catch-all for API routes to prevent falling through to Vite
  app.all("/api/*", (req, res) => {
    res.status(404).json({ error: `API route not found: ${req.method} ${req.url}` });
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
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
