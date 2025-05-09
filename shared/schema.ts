import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for admin access
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isAdmin: true,
});

// Scrap rates table
export const scrapRates = pgTable("scrap_rates", {
  id: serial("id").primaryKey(),
  materialName: text("material_name").notNull(),
  rate: integer("rate").notNull(), // Rate in rupees per kg
  icon: text("icon").notNull(), // Icon name or class
  color: text("color").notNull(), // Color for UI display
  trend: text("trend").notNull().default("stable"), // up, down, stable
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

export const insertScrapRateSchema = createInsertSchema(scrapRates).pick({
  materialName: true,
  rate: true,
  icon: true,
  color: true,
  trend: true,
});

// Pickup requests table
export const pickups = pgTable("pickups", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  materials: text("materials").array().notNull(),
  date: text("date").notNull(),
  imagePath: text("image_path"),
  notes: text("notes"),
  status: text("status").notNull().default("pending"), // pending, confirmed, completed, cancelled
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPickupSchema = createInsertSchema(pickups).pick({
  name: true,
  phone: true,
  address: true,
  materials: true,
  date: true,
  imagePath: true,
  notes: true,
  status: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type ScrapRate = typeof scrapRates.$inferSelect;
export type InsertScrapRate = z.infer<typeof insertScrapRateSchema>;

export type Pickup = typeof pickups.$inferSelect;
export type InsertPickup = z.infer<typeof insertPickupSchema>;

// Login schema
export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export type LoginData = z.infer<typeof loginSchema>;

// Extended pickup schema for form validation
export const pickupFormSchema = insertPickupSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Please provide a complete address"),
  materials: z.array(z.string()).min(1, "Please select at least one material type"),
  date: z.string().min(1, "Please select a pickup date"),
});
