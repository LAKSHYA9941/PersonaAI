import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";
import { Message, ChatSession } from "@shared/schema";

export function useChat(personaId: string) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Create chat session
  const createSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/chat/sessions", {
        personaId,
        userId: null // Anonymous for now
      });
      return response.json();
    },
    onSuccess: (session: ChatSession) => {
      setSessionId(session.id);
    }
  });

  // Get messages for the session
  const { data: messages = [], refetch: refetchMessages } = useQuery<Message[]>({
    queryKey: ["/api/chat/sessions", sessionId, "messages"],
    enabled: !!sessionId,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!sessionId) throw new Error("No active session");
      
      const response = await apiRequest("POST", `/api/chat/sessions/${sessionId}/messages`, {
        content
      });
      return response.json();
    },
    onSuccess: () => {
      // Refetch messages to get the latest
      refetchMessages();
    }
  });

  // Create session on mount
  useEffect(() => {
    if (personaId && !sessionId) {
      createSessionMutation.mutate();
    }
  }, [personaId]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || sendMessageMutation.isPending) return;
    
    try {
      await sendMessageMutation.mutateAsync(content);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return {
    sessionId,
    messages,
    isLoading: sendMessageMutation.isPending,
    sendMessage,
    error: sendMessageMutation.error || createSessionMutation.error
  };
}
