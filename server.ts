import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Route to send BOQ request
  app.post("/api/send-boq", upload.array("files"), async (req, res) => {
    const { fullName, companyName, address, notes, isUrgent } = req.body;
    const files = req.files as Express.Multer.File[];

    try {
      if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is not configured");
      }

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
        console.error("Resend error:", error);
        return res.status(400).json({ error });
      }

      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error" });
    }
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
