# KrankenkassenAssistent - AI Health Insurance Assistant for Switzerland

## Overview
A React-based web application that helps users find their ideal health insurance configuration in Switzerland through an AI-powered chat interface.

## Features
- 🤖 Interactive chat interface for data collection
- 💰 Personalized insurance offers based on user profile
- 📊 Comparison of multiple insurance options
- 🎯 Smart recommendations
- 📱 Fully responsive design
- 🧪 Developer mode for testing

## Tech Stack
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: Context API
- **Build Tool**: Vite
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
cd kk-project
npm install
```

### Development
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Build
```bash
npm run build
```

## Project Structure
```
kk-project/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React Context providers
│   ├── data/          # Mock data
│   ├── pages/         # Page components
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── public/            # Static assets
└── conversation/      # Project documentation
```

## User Flow
1. **Landing Page**: Introduction and call-to-action
2. **Chat Interface**: Collects user information step-by-step
3. **Offers Page**: Displays personalized insurance recommendations

## Development Mode
The app includes a Modi System (floating button) for developers to:
- Test different user personas
- Skip chat flow
- Access different app states quickly

## Documentation
Detailed documentation can be found in the `/conversation` folder, organized by development phases.

## Note
This is a demo application with mock data. For production use, you'll need:
- Real insurance provider APIs
- Backend services
- User authentication
- Database integration

## License
This project is for demonstration purposes only.