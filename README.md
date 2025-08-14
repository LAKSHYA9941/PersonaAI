# PersonaAI Chat Application

A modern React-based chat application with AI-powered personalities, featuring a cyberpunk dark neon theme and GSAP animations.

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