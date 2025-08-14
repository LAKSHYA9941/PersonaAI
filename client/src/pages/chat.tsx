import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ChatInterface from "../components/chat/chat-interface";
import { Persona } from "@shared/schema";

export default function Chat() {
  const { personaId } = useParams<{ personaId: string }>();

  const { data: persona, isLoading, error } = useQuery<Persona>({
    queryKey: [`/api/personas/${personaId}`],
    enabled: !!personaId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (error || !persona) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Persona Not Found</h2>
          <p className="text-gray-400">The requested persona could not be found.</p>
          <a 
            href="/dashboard"
            className="mt-4 inline-block px-6 py-2 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-lg font-semibold text-black hover:from-neon-magenta hover:to-neon-lime transition-all duration-300"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return <ChatInterface persona={persona} />;
}
