# PersonaAI Chat Application

A modern React-based chat application with AI-powered personalities, featuring a cyberpunk dark neon theme and GSAP animations.
 # URL :- https://personaai-1tda.onrender.com
## Features

- 🎨 Dark neon theme with cyan/magenta/lime colors
- ✨ GSAP animations throughout the interface
- 🤖 Two AI personas with unique personalities:
  - **Hitesh Choudhary**: MERN stack expert (starts with "Hanji!")
  - **Piyush Garg**: Full-stack developer looking for love
- 💬 Real-time chat interface with typing indicators
- 🚀 Built with React, TypeScript, Express, and OpenRouter AI

## Local Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- OpenRouter API key (free at https://openrouter.ai/)

### Installation

1. **Clone or download the project files**
   ```bash
   # If you have git access to this repo
   git clone <your-repo-url>
   cd persona-ai-chat
   
   # Or download and extract the files to a folder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   NODE_ENV=development
   ```

4. **Start the development server**
   
   **For Windows (Command Prompt):**
   ```cmd
   set NODE_ENV=development
   npx tsx server/index.ts
   ```
   
   **For Windows (PowerShell):**
   ```powershell
   $env:NODE_ENV = "development"
   npx tsx server/index.ts
   ```
   
   **For Mac/Linux:**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5000` to see the application.

### Getting OpenRouter API Key

1. Go to https://openrouter.ai/
2. Sign up for a free account
3. Navigate to API Keys in your dashboard
4. Create a new API key
5. Copy it to your `.env` file

### Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configurations
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # In-memory data storage
├── shared/               # Shared TypeScript schemas
└── package.json         # Dependencies and scripts
```

### Available Scripts

- `npm run dev` - Start development server (both frontend and backend)
- `npm run build` - Build for production
- `npm run start` - Start production server

### Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, GSAP, TanStack Query
- **Backend**: Express.js, TypeScript
- **AI Integration**: OpenRouter API (Llama 3.1 8B model)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom neon theme

## Usage

1. **Landing Page**: Click "Enter the Experience" to proceed
2. **Dashboard**: Choose between Hitesh or Piyush persona cards
3. **Chat**: Start chatting with your selected AI personality
4. **Navigation**: Use the back button to switch between personas

## Customization

### Adding New Personas

Edit `server/storage.ts` in the `initializePersonas()` method to add new AI characters with custom personalities.

### Styling

The neon theme is defined in `client/src/index.css` with custom CSS variables. Modify the color values to change the theme.

### AI Model

The app uses Llama 3.1 8B (free tier). To use different models, modify the model name in `server/routes.ts`.

## Troubleshooting

- **GSAP warnings**: These are harmless and occur when components unmount
- **API errors**: Ensure your OpenRouter API key is valid and has credits
- **Port conflicts**: The app runs on port 5000 by default

## License

This project is open source and available under the MIT License.



# PersonaAI Chat Application

## Overview

PersonaAI is a modern chat application that enables users to interact with different AI personas, each with unique personalities and expertise. The application features a cyberpunk-themed interface with neon colors and animations, providing an engaging chat experience with specialized AI characters like Hitesh Choudhary (MERN Stack expert) and others.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Modern React application using functional components and hooks
- **Wouter**: Lightweight client-side routing for navigation between pages
- **Tailwind CSS**: Utility-first CSS framework with custom dark theme and neon color palette
- **shadcn/ui**: Component library providing accessible, customizable UI components
- **GSAP**: Animation library for smooth transitions and interactive effects
- **TanStack Query**: Data fetching and caching for efficient API communication

### Backend Architecture
- **Express.js**: RESTful API server handling chat sessions, personas, and messages
- **Memory Storage**: In-memory data persistence with interface for future database integration
- **OpenRouter API**: External AI service integration for generating persona responses
- **Session Management**: Chat session creation and message history tracking

### Data Storage Solutions
- **Drizzle ORM**: Type-safe database toolkit configured for PostgreSQL
- **Schema Design**: Well-structured tables for users, personas, chat sessions, and messages
- **Memory Storage Fallback**: Current implementation uses in-memory storage with prepared database schema

### Authentication and Authorization
- **Prepared Infrastructure**: User schema and authentication hooks ready for implementation
- **Session-based Architecture**: Support for user sessions and persona-specific conversations
- **Anonymous Chat Support**: Current implementation allows anonymous chatting

### UI/UX Design Patterns
- **Cyberpunk Theme**: Dark backgrounds with neon cyan, magenta, and lime accents
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Component-driven Architecture**: Reusable UI components following atomic design principles
- **Animation System**: GSAP-powered animations for page transitions and interactive elements

### Development Workflow
- **Vite Build System**: Fast development server with HMR and optimized production builds
- **TypeScript**: Full type safety across client, server, and shared schemas
- **ESBuild**: Fast bundling for server-side code
- **Path Aliases**: Clean import statements using @ aliases for better organization

## External Dependencies

### AI Services
- **OpenRouter API**: Primary AI service using Llama 3.1 8B model for persona responses
- **Environment Configuration**: API key management through environment variables

### Database Services
- **Neon Database**: PostgreSQL provider configured through DATABASE_URL
- **Connection Pooling**: @neondatabase/serverless for serverless database connections

### UI Libraries
- **Radix UI**: Headless component primitives for accessibility and customization
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Carousel component for potential content display

### Development Tools
- **Replit Integration**: Development environment optimizations and error handling
- **Google Fonts**: Inter, JetBrains Mono, and other fonts for typography hierarchy
- **PostCSS**: CSS processing with Tailwind and autoprefixer plugins

### State Management
- **React Hook Form**: Form handling with validation
- **Zod**: Schema validation for type-safe data handling
- **TanStack Query**: Server state management and caching

### Animation and Interaction
- **GSAP**: Professional animation library for smooth transitions
- **Class Variance Authority**: Utility for creating variant-based component APIs
- **Date-fns**: Date manipulation and formatting utilities"# PersonaAI" 


# Some use:

 # Image 1:- https://res.cloudinary.com/cloud4lakshya/image/upload/v1755240223/Screenshot_83_zq8bva.png
 # Image 2:- https://res.cloudinary.com/cloud4lakshya/image/upload/v1755240223/Screenshot_86_blfof5.png
 # Image 3:- https://res.cloudinary.com/cloud4lakshya/image/upload/v1755240223/Screenshot_85_znruso.png
 # Image 4:- https://res.cloudinary.com/cloud4lakshya/image/upload/v1755240223/Screenshot_84_duxmkn.png