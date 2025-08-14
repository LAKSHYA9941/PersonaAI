import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { gsap } from "../../lib/gsap";
import { Persona } from "@shared/schema";
import { useChat } from "../../hooks/use-chat";
import Message from "./message";
import TypingIndicator from "./typing-indicator";

interface ChatInterfaceProps {
  persona: Persona;
}

export default function ChatInterface({ persona }: ChatInterfaceProps) {
  const [, setLocation] = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");

  const { 
    messages, 
    isLoading, 
    sendMessage, 
    sessionId 
  } = useChat(persona.id);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(containerRef.current, 
      { opacity: 0, x: '100%' },
      { opacity: 1, x: '0%', duration: 0.5, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const message = inputValue.trim();
    setInputValue("");
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBackToDashboard = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      x: '100%',
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => setLocation("/dashboard")
    });
  };

  const getAvatarGradient = () => {
    if (persona.color === "cyan") {
      return "bg-gradient-to-r from-neon-cyan to-blue-500";
    } else if (persona.color === "magenta") {
      return "bg-gradient-to-r from-neon-magenta to-purple-500";
    }
    return "bg-gradient-to-r from-neon-cyan to-neon-magenta";
  };

  const getTextColor = () => {
    if (persona.color === "cyan") {
      return "text-neon-cyan";
    } else if (persona.color === "magenta") {
      return "text-neon-magenta";
    }
    return "text-neon-cyan";
  };

  const getStatusText = () => {
    if (persona.id === "piyush") {
      return "Online • Single and ready to chat 💕";
    }
    return "Online • Ready to help with MERN stack";
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-dark-bg/95 backdrop-blur-md z-40 transition-all duration-500"
    >
      <div className="h-full flex flex-col">
        {/* Chat Header */}
        <div className="bg-dark-secondary/80 backdrop-blur-md border-b border-gray-800 p-4 mt-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleBackToDashboard}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
              >
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full ${getAvatarGradient()} flex items-center justify-center font-bold text-sm`}>
                  {persona.avatar}
                </div>
                <div>
                  <h3 className={`font-semibold ${getTextColor()}`}>
                    {persona.name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {getStatusText()}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">Active</span>
            </div>
          </div>
        </div>

        {/* Chat Messages Container */}
        <div 
          ref={messagesRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {/* Welcome Message */}
          <Message
            role="assistant"
            content={persona.id === "hitesh" 
              ? "Hanji! Welcome to our coding conversation! I'm here to help you with anything related to MERN stack development. What would you like to learn today?"
              : "Hey there! 👋 Ready to dive into some coding talk? Or maybe you need some life advice from your single developer friend? I'm all ears! 😄"
            }
            persona={persona}
            timestamp={new Date()}
          />

          {messages.map((message) => (
            <Message
              key={message.id}
              role={message.role as "user" | "assistant"}
              content={message.content}
              persona={persona}
              timestamp={message.createdAt}
            />
          ))}

          {isLoading && <TypingIndicator persona={persona} />}
        </div>

        {/* Chat Input */}
        <div className="bg-dark-secondary/80 backdrop-blur-md border-t border-gray-800 p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                type="text" 
                placeholder="Type your message..." 
                className="w-full bg-dark-tertiary border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition-colors duration-300"
                disabled={isLoading}
              />
            </div>
            <button 
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="p-3 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-xl hover:from-neon-magenta hover:to-neon-lime transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-3 flex flex-wrap gap-2">
            {persona.id === "hitesh" ? (
              <>
                <button 
                  onClick={() => setInputValue("Can you explain React hooks?")}
                  className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded-full transition-colors duration-300"
                >
                  Explain React
                </button>
                <button 
                  onClick={() => setInputValue("What are MongoDB basics?")}
                  className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded-full transition-colors duration-300"
                >
                  MongoDB Basics
                </button>
                <button 
                  onClick={() => setInputValue("Give me some Node.js tips")}
                  className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded-full transition-colors duration-300"
                >
                  Node.js Tips
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setInputValue("How's your dating life?")}
                  className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded-full transition-colors duration-300"
                >
                  Dating Life
                </button>
                <button 
                  onClick={() => setInputValue("Full stack development tips?")}
                  className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded-full transition-colors duration-300"
                >
                  Dev Tips
                </button>
                <button 
                  onClick={() => setInputValue("Life advice please!")}
                  className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded-full transition-colors duration-300"
                >
                  Life Advice
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
