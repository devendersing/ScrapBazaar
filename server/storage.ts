import { 
  users, 
  type User, 
  type InsertUser, 
  scrapRates, 
  type ScrapRate, 
  type InsertScrapRate, 
  pickups, 
  type Pickup, 
  type InsertPickup 
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Rate methods
  initializeRates(): Promise<void>;
  getAllRates(): Promise<ScrapRate[]>;
  getRateById(id: number): Promise<ScrapRate | undefined>;
  updateRate(id: number, rate: number, trend: string): Promise<ScrapRate | undefined>;
  
  // Pickup methods
  createPickup(pickup: InsertPickup): Promise<Pickup>;
  getAllPickups(): Promise<Pickup[]>;
  getPickupById(id: number): Promise<Pickup | undefined>;
  updatePickupStatus(id: number, status: string): Promise<Pickup | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private rates: Map<number, ScrapRate>;
  private pickups: Map<number, Pickup>;
  
  private userCurrentId: number;
  private rateCurrentId: number;
  private pickupCurrentId: number;

  constructor() {
    this.users = new Map();
    this.rates = new Map();
    this.pickups = new Map();
    
    this.userCurrentId = 1;
    this.rateCurrentId = 1;
    this.pickupCurrentId = 1;
    
    // Add default admin user
    this.createUser({
      username: "admin",
      password: "admin123",
      isAdmin: true
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Rate methods
  async initializeRates(): Promise<void> {
    // Only initialize if rates are empty
    if (this.rates.size === 0) {
      const defaultRates: InsertScrapRate[] = [
        {
          materialName: "Copper",
          rate: 550,
          icon: "bolt",
          color: "primary",
          trend: "up",
        },
        {
          materialName: "Aluminum",
          rate: 120,
          icon: "layers",
          color: "accent",
          trend: "stable",
        },
        {
          materialName: "Brass",
          rate: 330,
          icon: "settings",
          color: "secondary",
          trend: "up",
        },
        {
          materialName: "Iron/Steel",
          rate: 32,
          icon: "construction",
          color: "chart-4",
          trend: "stable",
        },
        {
          materialName: "Paper",
          rate: 13,
          icon: "description",
          color: "accent",
          trend: "stable",
        },
        {
          materialName: "Plastic",
          rate: 25,
          icon: "local_drink",
          color: "chart-5",
          trend: "up",
        }
      ];
      
      for (const rate of defaultRates) {
        const id = this.rateCurrentId++;
        const newRate: ScrapRate = { 
          ...rate, 
          id, 
          lastUpdated: new Date() 
        };
        this.rates.set(id, newRate);
      }
    }
  }
  
  async getAllRates(): Promise<ScrapRate[]> {
    return Array.from(this.rates.values());
  }
  
  async getRateById(id: number): Promise<ScrapRate | undefined> {
    return this.rates.get(id);
  }
  
  async updateRate(id: number, rate: number, trend: string): Promise<ScrapRate | undefined> {
    const existingRate = this.rates.get(id);
    
    if (!existingRate) {
      return undefined;
    }
    
    const updatedRate: ScrapRate = {
      ...existingRate,
      rate,
      trend,
      lastUpdated: new Date()
    };
    
    this.rates.set(id, updatedRate);
    return updatedRate;
  }
  
  // Pickup methods
  async createPickup(insertPickup: InsertPickup): Promise<Pickup> {
    const id = this.pickupCurrentId++;
    const pickup: Pickup = { 
      ...insertPickup, 
      id, 
      createdAt: new Date() 
    };
    this.pickups.set(id, pickup);
    return pickup;
  }
  
  async getAllPickups(): Promise<Pickup[]> {
    return Array.from(this.pickups.values());
  }
  
  async getPickupById(id: number): Promise<Pickup | undefined> {
    return this.pickups.get(id);
  }
  
  async updatePickupStatus(id: number, status: string): Promise<Pickup | undefined> {
    const existingPickup = this.pickups.get(id);
    
    if (!existingPickup) {
      return undefined;
    }
    
    const updatedPickup: Pickup = {
      ...existingPickup,
      status
    };
    
    this.pickups.set(id, updatedPickup);
    return updatedPickup;
  }
}

export const storage = new MemStorage();
