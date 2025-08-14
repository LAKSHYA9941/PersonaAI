import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { gsap } from "../lib/gsap";
import { Persona } from "@shared/schema";

interface PersonaCardProps {
  persona: Persona;
  animationDelay?: number;
}

export default function PersonaCard({ persona, animationDelay = 0 }: PersonaCardProps) {
  const [, setLocation] = useLocation();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    // Floating animation
    gsap.to(element, {
      y: -10,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: animationDelay
    });

    // Hover effects
    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [animationDelay]);

  const handleClick = () => {
    setLocation(`/chat/${persona.id}`);
  };

  const getAvatarGradient = () => {
    if (persona.color === "cyan") {
      return "bg-gradient-to-r from-neon-cyan to-blue-500";
    } else if (persona.color === "magenta") {
      return "bg-gradient-to-r from-neon-magenta to-purple-500";
    }
    return "bg-gradient-to-r from-neon-cyan to-neon-magenta";
  };

  const getBorderColor = () => {
    if (persona.color === "cyan") {
      return "hover:border-neon-cyan";
    } else if (persona.color === "magenta") {
      return "hover:border-neon-magenta";
    }
    return "hover:border-neon-cyan";
  };

  const getTextColor = () => {
    if (persona.color === "cyan") {
      return "text-neon-cyan";
    } else if (persona.color === "magenta") {
      return "text-neon-magenta";
    }
    return "text-neon-cyan";
  };

  const getStatusColor = () => {
    if (persona.color === "cyan") {
      return "bg-green-400";
    } else if (persona.color === "magenta") {
      return "bg-pink-400";
    }
    return "bg-green-400";
  };

  const getStatusText = () => {
    if (persona.id === "piyush") {
      return "Single & Looking 💖";
    }
    return "Online & Ready to Help";
  };

  return (
    <div 
      ref={cardRef}
      onClick={handleClick}
      className={`persona-card glass-effect rounded-2xl p-8 border border-gray-700 ${getBorderColor()} transition-all duration-300 cursor-pointer animate-float`}
    >
      <div className="text-center space-y-6">
        <div className={`w-24 h-24 mx-auto rounded-full ${getAvatarGradient()} flex items-center justify-center text-2xl font-bold`}>
          {persona.avatar}
        </div>
        <div>
          <h3 className={`text-2xl font-bold ${getTextColor()} mb-2`}>
            {persona.name}
          </h3>
          <p className={`text-sm ${getTextColor()}/80 font-mono mb-4`}>
            {persona.title}
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            {persona.description}
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
            <span className={`w-2 h-2 ${getStatusColor()} rounded-full animate-pulse`}></span>
            <span>{getStatusText()}</span>
          </div>
          <div className="text-xs text-gray-500">
            {persona.id === "hitesh" && "Specializes in: React, Node.js, MongoDB, Express"}
            {persona.id === "piyush" && "Interests: Full Stack Dev, Dating, Life Advice"}
          </div>
        </div>
      </div>
    </div>
  );
}
