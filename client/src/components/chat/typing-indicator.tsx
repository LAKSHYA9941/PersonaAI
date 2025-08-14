import { Persona } from "@shared/schema";

interface TypingIndicatorProps {
  persona: Persona;
}

export default function TypingIndicator({ persona }: TypingIndicatorProps) {
  const getAvatarGradient = () => {
    if (persona.color === "cyan") {
      return "bg-gradient-to-r from-neon-cyan to-blue-500";
    } else if (persona.color === "magenta") {
      return "bg-gradient-to-r from-neon-magenta to-purple-500";
    }
    return "bg-gradient-to-r from-neon-cyan to-neon-magenta";
  };

  return (
    <div className="flex items-start space-x-3 transition-opacity duration-300">
      <div className={`w-8 h-8 rounded-full ${getAvatarGradient()} flex items-center justify-center text-xs font-bold`}>
        {persona.avatar}
      </div>
      <div className="chat-bubble-ai rounded-2xl rounded-tl-sm p-4">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
