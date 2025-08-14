import { type User, type InsertUser, type Persona, type InsertPersona, type ChatSession, type InsertChatSession, type Message, type InsertMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Persona methods
  getAllPersonas(): Promise<Persona[]>;
  getPersona(id: string): Promise<Persona | undefined>;
  createPersona(persona: InsertPersona): Promise<Persona>;
  
  // Chat session methods
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  getChatSession(id: string): Promise<ChatSession | undefined>;
  getChatSessionsByPersona(personaId: string): Promise<ChatSession[]>;
  
  // Message methods
  addMessage(message: InsertMessage): Promise<Message>;
  getMessagesBySession(sessionId: string): Promise<Message[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private personas: Map<string, Persona>;
  private chatSessions: Map<string, ChatSession>;
  private messages: Map<string, Message>;

  constructor() {
    this.users = new Map();
    this.personas = new Map();
    this.chatSessions = new Map();
    this.messages = new Map();
    
    // Initialize default personas
    this.initializePersonas();
  }

  private initializePersonas() {
    const hitesh: Persona = {
      id: "hitesh",
      name: "Hitesh Choudhary",
      title: "MERN Stack Guru",
      description: "Hanji! Your friendly MERN stack teacher who makes complex concepts simple. Expert in MongoDB, Express, React, and Node.js with years of teaching experience.",
      avatar: "HC",
      color: "cyan",
      systemPrompt: "You are Hitesh Choudhary, a passionate MERN stack teacher. You always start your responses with 'Hanji!' and explain complex programming concepts in simple, easy-to-understand terms. You're enthusiastic about teaching and love helping students learn web development. You specialize in MongoDB, Express.js, React, and Node.js.",
      isActive: true,
    };

    const piyush: Persona = {
      id: "piyush",
      name: "Piyush Garg",
      title: "Full Stack Developer",
      description: "A passionate developer who's single and ready to mingle! 💕 Great at coding and equally great at giving life advice. Always up for tech talks and maybe some dating tips!",
      avatar: "PG",
      color: "magenta",
      systemPrompt: "You are Piyush Garg, a skilled full-stack developer who is single and looking for love. You often make jokes about being single and relate coding concepts to dating and relationships. You're friendly, humorous, and enjoy giving both technical advice and life advice. You sometimes use dating metaphors to explain programming concepts.",
      isActive: true,
    };

    this.personas.set(hitesh.id, hitesh);
    this.personas.set(piyush.id, piyush);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Persona methods
  async getAllPersonas(): Promise<Persona[]> {
    return Array.from(this.personas.values()).filter(p => p.isActive);
  }

  async getPersona(id: string): Promise<Persona | undefined> {
    return this.personas.get(id);
  }

  async createPersona(insertPersona: InsertPersona): Promise<Persona> {
    const id = randomUUID();
    const persona: Persona = { ...insertPersona, id, isActive: true };
    this.personas.set(id, persona);
    return persona;
  }

  // Chat session methods
  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    const id = randomUUID();
    const now = new Date();
    const session: ChatSession = {
      ...insertSession,
      userId: insertSession.userId || null,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.chatSessions.set(id, session);
    return session;
  }

  async getChatSession(id: string): Promise<ChatSession | undefined> {
    return this.chatSessions.get(id);
  }

  async getChatSessionsByPersona(personaId: string): Promise<ChatSession[]> {
    return Array.from(this.chatSessions.values()).filter(
      session => session.personaId === personaId
    );
  }

  // Message methods
  async addMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.messages.set(id, message);
    return message;
  }

  async getMessagesBySession(sessionId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => message.sessionId === sessionId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
}

export const storage = new MemStorage();
