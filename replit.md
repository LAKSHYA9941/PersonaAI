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
- **Date-fns**: Date manipulation and formatting utilities