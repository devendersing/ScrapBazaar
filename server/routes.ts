import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import path from "path";
import fs from "fs";
import { z } from "zod";
import { loginSchema, insertPickupSchema } from "@shared/schema";
import { upload } from "./middleware/upload";
import { authMiddleware } from "./middleware/auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize storage with default scrap rates
  await storage.initializeRates();

  // Auth routes
  app.post('/api/auth/login', express.json(), async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(validatedData.username);
      
      if (!user || user.password !== validatedData.password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      // Set user in session
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

  app.post('/api/auth/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          return res.status(500).json({ message: "Failed to logout" });
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({ message: "Logout successful" });
      });
    } else {
      return res.status(200).json({ message: "Already logged out" });
    }
  });

  app.get('/api/auth/check', authMiddleware, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      return res.status(200).json({ id: user.id, username: user.username, isAdmin: user.isAdmin });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Rates routes
  app.get('/api/rates', async (req, res) => {
    try {
      const rates = await storage.getAllRates();
      return res.status(200).json(rates);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch rates" });
    }
  });

  app.put('/api/rates/:id', authMiddleware, express.json(), async (req, res) => {
    try {
      const rateId = parseInt(req.params.id);
      const { rate, trend } = req.body;
      
      if (isNaN(rate) || !trend) {
        return res.status(400).json({ message: "Invalid rate data" });
      }
      
      const updatedRate = await storage.updateRate(rateId, rate, trend);
      
      if (!updatedRate) {
        return res.status(404).json({ message: "Rate not found" });
      }
      
      return res.status(200).json(updatedRate);
    } catch (error) {
      return res.status(500).json({ message: "Failed to update rate" });
    }
  });

  // Pickup routes
  app.post('/api/pickups', upload.single('image'), async (req, res) => {
    try {
      // Parse materials json string from form data
      const materialsStr = req.body.materials;
      let materials = [];
      try {
        materials = JSON.parse(materialsStr);
      } catch (e) {
        return res.status(400).json({ message: "Invalid materials format" });
      }

      // Create pickup data object
      const pickupData = {
        ...req.body,
        materials: materials,
        imagePath: req.file ? `/uploads/${req.file.filename}` : undefined
      };

      // Validate data
      const validatedData = insertPickupSchema.parse(pickupData);
      
      // Create pickup
      const pickup = await storage.createPickup(validatedData);
      
      return res.status(201).json(pickup);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      return res.status(500).json({ message: "Failed to create pickup request" });
    }
  });

  app.get('/api/pickups', authMiddleware, async (req, res) => {
    try {
      const pickups = await storage.getAllPickups();
      return res.status(200).json(pickups);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch pickups" });
    }
  });

  app.put('/api/pickups/:id/status', authMiddleware, express.json(), async (req, res) => {
    try {
      const pickupId = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status || !['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const updatedPickup = await storage.updatePickupStatus(pickupId, status);
      
      if (!updatedPickup) {
        return res.status(404).json({ message: "Pickup not found" });
      }
      
      return res.status(200).json(updatedPickup);
    } catch (error) {
      return res.status(500).json({ message: "Failed to update pickup status" });
    }
  });

  // Serve uploaded files
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const httpServer = createServer(app);

  return httpServer;
}
