import { useLocation } from "wouter";

export default function Navbar() {
  const [location] = useLocation();

  // Hide navbar on landing page
  if (location === "/") return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-secondary/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta animate-pulse-neon"></div>
            <span className="text-xl font-bold font-mono text-neon-cyan">
              <a
                href="/"
                className="text-neon-cyan hover:text-neon-magenta transition-colors duration-300"
              >
                PersonaAI
              </a>

            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/dashboard"
              className="text-gray-300 hover:text-neon-cyan transition-colors duration-300"
            >
              Dashboard
            </a>
            <a
              href="https://github.com/LAKSHYA9941"
              className="text-gray-300 hover:text-neon-magenta transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/lakshya-sharma-35817926a"
              className="text-gray-300 hover:text-neon-lime transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>

          </div>
          <button className="md:hidden text-gray-300 hover:text-neon-cyan transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
