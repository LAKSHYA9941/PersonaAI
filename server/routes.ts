import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatSessionSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";

const openrouterApiKey = process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_KEY || "";

async function callOpenRouter(messages: Array<{role: string, content: string}>, systemPrompt: string) {
  if (!openrouterApiKey) {
    throw new Error("OpenRouter API key not configured");
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${openrouterApiKey}`,
      "Content-Type": "application/json",
      "X-Title": "PersonaAI Chat"
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} ${error}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || "I'm having trouble responding right now. Please try again.";
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all personas
  app.get("/api/personas", async (req, res) => {
    try {
      const personas = await storage.getAllPersonas();
      res.json(personas);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch personas" });
    }
  });

  // Get specific persona
  app.get("/api/personas/:id", async (req, res) => {
    try {
      const persona = await storage.getPersona(req.params.id);
      if (!persona) {
        return res.status(404).json({ message: "Persona not found" });
      }
      res.json(persona);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch persona" });
    }
  });

  // Create chat session
  app.post("/api/chat/sessions", async (req, res) => {
    try {
      const validatedData = insertChatSessionSchema.parse(req.body);
      
      // Verify persona exists
      const persona = await storage.getPersona(validatedData.personaId);
      if (!persona) {
        return res.status(404).json({ message: "Persona not found" });
      }

      const session = await storage.createChatSession(validatedData);
      res.json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create chat session" });
    }
  });

  // Get chat session messages
  app.get("/api/chat/sessions/:sessionId/messages", async (req, res) => {
    try {
      const session = await storage.getChatSession(req.params.sessionId);
      if (!session) {
        return res.status(404).json({ message: "Chat session not found" });
      }

      const messages = await storage.getMessagesBySession(req.params.sessionId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Send message and get AI response
  app.post("/api/chat/sessions/:sessionId/messages", async (req, res) => {
    try {
      const session = await storage.getChatSession(req.params.sessionId);
      if (!session) {
        return res.status(404).json({ message: "Chat session not found" });
      }

      const persona = await storage.getPersona(session.personaId);
      if (!persona) {
        return res.status(404).json({ message: "Persona not found" });
      }

      const validatedMessage = insertMessageSchema.parse({
        sessionId: req.params.sessionId,
        role: "user",
        content: req.body.content
      });

      // Save user message
      const userMessage = await storage.addMessage(validatedMessage);

      // Get conversation history
      const allMessages = await storage.getMessagesBySession(req.params.sessionId);
      const conversationHistory = allMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Get AI response
      let aiResponse;
      try {
        aiResponse = await callOpenRouter(conversationHistory, persona.systemPrompt);
      } catch (error) {
        console.error("OpenRouter API error:", error);
        aiResponse = "I'm having trouble connecting right now. Please try again in a moment.";
      }

      // Save AI response
      const aiMessage = await storage.addMessage({
        sessionId: req.params.sessionId,
        role: "assistant",
        content: aiResponse
      });

      res.json({
        userMessage,
        aiMessage
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
