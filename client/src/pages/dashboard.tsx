import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { gsap } from "../lib/gsap";
import PersonaCard from "../components/persona-card";
import { Persona } from "@shared/schema";

export default function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const { data: personas, isLoading } = useQuery<Persona[]>({
    queryKey: ["/api/personas"],
  });

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(containerRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );

  }, []);

  useEffect(() => {
    if (personas) {
      // Animate persona cards
      gsap.fromTo(".persona-card",
        { opacity: 0, y: 30, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          ease: "back.out(1.7)",
          stagger: 0.2
        }
      );
    }
  }, [personas]);

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

  return (
    <div ref={containerRef} className="min-h-full pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent mb-4"
          >
            Choose Your AI Personality
          </h2>
          <p 
            ref={subtitleRef}
            className="text-xl text-gray-400"
          >
            Select a persona to start your conversation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          
          {personas?.map((persona, index) => (
            <PersonaCard 
              key={persona.id} 
              persona={persona} 
              animationDelay={index * 0.5}
            />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm">
            Click on any persona card to start chatting • Powered by OpenRouter AI
          </p>
        </div>
      </div>
    </div>
  );
}
