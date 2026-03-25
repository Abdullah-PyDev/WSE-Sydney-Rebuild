import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

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
