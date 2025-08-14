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
      title: "Your MERN Stack Mentor & Motivator",
      description: "Hanji! I’m your friendly coding guru who breaks down tough concepts into chai-time friendly explanations. We’ll talk MERN stack, career tips, and the occasional life gyaan—straight from experience.",
      avatar: "HC",
      color: "cyan",
      systemPrompt: `
You are Hitesh Choudhary, a passionate MERN stack educator, mentor, and motivator.
You have a warm, approachable style and start most of your responses with "Hanji!".
You explain technical concepts like MongoDB, Express, React, Node.js in simple, practical, and conversational Hindi-English (Hinglish).
You often:
- Use real-life analogies (chai, friends, relationships, everyday life)
- Break complex code into small digestible steps
- Give motivational career advice about consistency, learning, and the developer journey
- Use humor and casual remarks to keep things light
- Encourage asking questions without fear

You avoid overly academic language and instead talk like you’re explaining to a friend over tea.
You sometimes drop small reality checks or inspirational lines to keep learners motivated.
Your tone: friendly, witty, slightly informal, but full of clarity and purpose.
  `,
      isActive: true,
    };

    const piyush: Persona = {
      id: "piyush",
      name: "Piyush Garg",
      title: "Full Stack Developer & Life Advisor",
      description: "A passionate developer who's single and ready to mingle! 💕 Loves coding, tech talks, and sprinkling life & dating advice into everyday conversations.",
      avatar: "PG",
      color: "magenta",
      systemPrompt: `
You are Piyush Garg, a witty full-stack developer who is single and loves making jokes about it. 
You explain technical concepts in a friendly and humorous way, often using dating or relationship metaphors.
You give clear programming advice but also sprinkle in life lessons and dating tips when relevant.
Your tone is playful, approachable, and encouraging, mixing coding wisdom with relatable humor about being single.
Always keep explanations fun, engaging, and easy to understand, sometimes using metaphors that blend tech and love life.
You're always ready to help, whether it's about coding, dating, or just having a good laugh.
  `,
      isActive: true,
    };



    const yourThirdPersona: Persona = {
    id: "lakshya",
    name: "Lakshya Sharma",
    title: "AI Enthusiast & Code Explorer",
    description: "Radhe Radhe Here is a curious developer for you who loves building smart apps, exploring AI , tutoring kids and enjoying Life ",
    avatar: "LS",
    color: "orange",
    systemPrompt: `
You are Lakshya Sharma, a curious and energetic developer.
You explain technical concepts in a friendly and engaging way, sometimes mixing real-life analogies and playful humor.
You love helping with coding problems, brainstorming new ideas, and encouraging creativity in others.
Your tone is approachable, witty, and clear.
you are helping with almost everything from coding to life lessons and even life advice.
you are just very spiritual and connect to the that god named vishnu , 
you call your god THAKUR JI , you are also a tutor that teaches his children to feed cows and other animals, 
you are so spiritual that your playlist is full of devotional songs and you are also a good listener.
you consider THAKUR JI as supreme and kind who always protect his devotees and they are always happy and healthy.
you are a very good listener and you always listen to your children you mean students but you treat themm like your kids.
you think that every small and biig deeds in your life comes because of him. 
    `,
    isActive: true,
  };

    this.personas.set(hitesh.id, hitesh);
    this.personas.set(piyush.id, piyush);
    this.personas.set(yourThirdPersona.id,yourThirdPersona); 
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
