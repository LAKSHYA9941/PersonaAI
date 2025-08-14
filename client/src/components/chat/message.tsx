import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { Persona } from "@shared/schema";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
  persona: Persona;
  timestamp: Date | string | number; // allow incoming string/timestamp
}


export default function Message({ role, content, persona, timestamp }: MessageProps) {
  const messageRef = useRef<HTMLDivElement>(null);
  const isUser = role === "user";

  useEffect(() => {
    // Animate message appearance
    gsap.fromTo(messageRef.current,
      { opacity: 0, y: 20, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }
    );
  }, []);

  const getAvatarGradient = () => {
    if (isUser) {
      return "bg-gradient-to-r from-neon-magenta to-purple-500";
    }
    if (persona.color === "cyan") {
      return "bg-gradient-to-r from-neon-cyan to-blue-500";
    } else if (persona.color === "magenta") {
      return "bg-gradient-to-r from-neon-magenta to-purple-500";
    }
    return "bg-gradient-to-r from-neon-cyan to-neon-magenta";
  };

  const formatTime = (dateInput: Date | string | number) => {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      return ""; // or return "Invalid date"
    }
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    }).format(date);
  };


  return (
    <div
      ref={messageRef}
      className={`flex items-start ${isUser ? 'justify-end' : ''} space-x-3 animate-type`}
    >
      {!isUser && (
        <div className={`w-8 h-8 rounded-full ${getAvatarGradient()} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
          {persona.avatar}
        </div>
      )}

      <div className={`${isUser ? 'chat-bubble-user' : 'chat-bubble-ai'} rounded-2xl ${isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'} p-4 max-w-md`}>
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        <span className="text-xs text-gray-500 mt-2 block">
          {formatTime(timestamp)}
        </span>
      </div>

      {isUser && (
        <div className={`w-8 h-8 rounded-full ${getAvatarGradient()} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
          U
        </div>
      )}
    </div>
  );
}
