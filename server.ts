import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

export const app = express();

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
  app.use(cors());

  // Request logging
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Serve static files from uploads
  app.use("/uploads", express.static(UPLOADS_DIR));

// API routes
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      env: process.env.NODE_ENV
    });
  });

  app.post("/api/boq-request", upload.single('file'), (req, res) => {
    const { name, email, phone, projectType, description } = req.body;
    const file = req.file;

    console.log(`[${new Date().toISOString()}] New BOQ Request:`, {
      name,
      email,
      phone,
      projectType,
      description,
      file: file ? file.filename : 'No file'
    });

    // In a real app, we would save this to a database or send an email
    // For now, we'll just return success
    res.status(200).json({ 
      message: "BOQ request received successfully",
      requestId: Date.now()
    });
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
