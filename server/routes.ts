import type { Express } from "express";
import express from "express";
import { createServer, Server } from "http";
import path from "path";
import fs from "fs";
import { z } from "zod";

import { storage } from "./storage";
import { loginSchema, insertPickupSchema } from "@shared/schema";
import { upload } from "./middleware/upload";
import { authMiddleware } from "./middleware/auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Ensure uploads directory exists
  const uploadsDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Serve static files from /uploads
  app.use("/uploads", express.static(uploadsDir));

  // Initialize scrap rates
  await storage.initializeRates();

  // ---------------- AUTH ROUTES ----------------
  app.post("/api/auth/login", express.json(), async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      const user = await storage.getUserByUsername(validatedData.username);

      if (!user || user.password !== validatedData.password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      if (req.session) {
        req.session.userId = user.id;
        req.session.isAdmin = user.isAdmin;
      }

      return res.status(200).json({ message: "Login successful", user: { id: user.id, username: user.username } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: "Failed to logout" });
        res.clearCookie("connect.sid");
        return res.status(200).json({ message: "Logout successful" });
      });
    } else {
      return res.status(200).json({ message: "Already logged out" });
    }
  });

  app.get("/api/auth/check", authMiddleware, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) return res.status(401).json({ message: "User not found" });
      return res.status(200).json({ id: user.id, username: user.username, isAdmin: user.isAdmin });
    } catch {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // ---------------- RATES ROUTES ----------------
  app.get("/api/rates", async (req, res) => {
    try {
      const rates = await storage.getAllRates();
      return res.status(200).json(rates);
    } catch {
      return res.status(500).json({ message: "Failed to fetch rates" });
    }
  });

  app.put("/api/rates/:id", authMiddleware, express.json(), async (req, res) => {
    try {
      const rateId = parseInt(req.params.id);
      const { rate, trend } = req.body;

      if (isNaN(rate) || !trend) {
        return res.status(400).json({ message: "Invalid rate data" });
      }

      const updatedRate = await storage.updateRate(rateId, rate, trend);
      if (!updatedRate) return res.status(404).json({ message: "Rate not found" });

      return res.status(200).json(updatedRate);
    } catch {
      return res.status(500).json({ message: "Failed to update rate" });
    }
  });

  // ---------------- PICKUP ROUTES ----------------
  app.post("/api/pickups", upload.single("image"), async (req, res) => {
    try {
      let materials = [];
      try {
        materials = JSON.parse(req.body.materials);
      } catch {
        return res.status(400).json({ message: "Invalid materials format" });
      }

      const pickupData = {
        ...req.body,
        materials,
        imagePath: req.file ? `/uploads/${req.file.filename}` : undefined,
      };

      const validatedData = insertPickupSchema.parse(pickupData);
      const pickup = await storage.createPickup(validatedData);

      return res.status(201).json(pickup);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      return res.status(500).json({ message: "Failed to create pickup request" });
    }
  });

  app.get("/api/pickups", authMiddleware, async (_req, res) => {
    try {
      const pickups = await storage.getAllPickups();
      return res.status(200).json(pickups);
    } catch {
      return res.status(500).json({ message: "Failed to fetch pickups" });
    }
  });

  app.put("/api/pickups/:id/status", authMiddleware, express.json(), async (req, res) => {
    try {
      const pickupId = parseInt(req.params.id);
      const { status } = req.body;

      const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
      if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const updatedPickup = await storage.updatePickupStatus(pickupId, status);
      if (!updatedPickup) return res.status(404).json({ message: "Pickup not found" });

      return res.status(200).json(updatedPickup);
    } catch {
      return res.status(500).json({ message: "Failed to update pickup status" });
    }
  });

  // Return HTTP server instance
  const httpServer = createServer(app);
  return httpServer;
}
