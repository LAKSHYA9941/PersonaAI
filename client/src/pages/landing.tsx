import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { gsap } from "../lib/gsap";

export default function Landing() {
  const [, setLocation] = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial animation
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(iconRef.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.3"
    )
    .fromTo(buttonRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );

    // Floating animation for icon
    gsap.to(iconRef.current, {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

  }, []);

  const handleEnterApp = () => {
    const tl = gsap.timeline({
      onComplete: () => setLocation("/dashboard")
    });

    tl.to(containerRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power2.inOut"
    });
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-dark-bg via-dark-secondary to-dark-tertiary"
    >
      <div className="text-center space-y-8 px-4">
        <div className="space-y-4">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-lime bg-clip-text text-transparent animate-glow"
          >
            PersonaAI
          </h1>
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-300 font-light"
          >
            Chat with AI-powered personalities
          </p>
        </div>
        <div className="space-y-6">
          <div 
            ref={iconRef}
            className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta animate-pulse-neon flex items-center justify-center"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
          </div>
          <button 
            ref={buttonRef}
            onClick={handleEnterApp}
            className="px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-lg font-semibold text-black hover:from-neon-magenta hover:to-neon-lime transition-all duration-300 transform hover:scale-105 neon-glow"
          >
            Enter the Experience
          </button>
        </div>
      </div>
    </div>
  );
}
