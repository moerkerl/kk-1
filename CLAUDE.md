# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Information

KrankenkassenAssistent - A React-based AI assistant helping users find the ideal health insurance configuration in Switzerland.

### Technology Stack
- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management
- Mock data for testing (no real backend)

## Common Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```


## Git Workflow

- Commit changes after completing implementation with meaningful commit messages
- The main branch is the primary branch for development

## Code Organization

- `/kk-project` - Main application directory
  - `/src/types` - TypeScript interfaces for all data models
  - `/src/data` - Mock data for providers, products, users, and chat templates
  - `/src/components` - Reusable UI components
  - `/src/pages` - Main application pages
  - `/src/contexts` - Context providers for state management 


## Communication Guidelines

- Refer to the developer as "Liam" or "you, the developer"
- Refer to yourself as "you" or "Master-Agent"
- Use Subagents whenever possible to handle specific subtasks. You yourself should make sure, that they work well, but never perform tasks yourself. Always use subagents.
- For each task, the subagent should document the task when finished in the current `/conversation` folder as a .md file
- Read the latest .md files in the current `/conversation` folder to understand context

## Implementation Guidelines

- Test that build and npm start work properly before committing changes
- Check for duplicate components/pages - only one version should remain after refactoring


## Development Process

- Create or update conversation documentation in numbered folders (001_foldername)
- Within each folder, use numbered .md files to track progress. you should do that and you should always advise the subagents to do that as well.
- Organize work in logical steps and document the process
- regularly update CLAUDE.md

### Documentation Structure
```
/conversation/
├── 001_projektstart/      # Project initialization
├── 002_react_setup/       # React setup documentation
├── 003_ui_design/         # UI design documentation
├── 004_data_structure/    # Data structure documentation ✓ COMPLETED
├── 005_chat_logic/        # Chat logic documentation
├── 006_offer_engine/      # Offer engine documentation
├── 007_integration/       # Integration documentation
├── 008_testing_polish/    # Testing & polish documentation
```

Each subagent must document their work in their assigned folder with numbered .md files.

## Modi System

The application should includes a global Modi System for development and testing purposes:

### Overview
- A floating button appears in the bottom-right corner of all pages
- Clicking the button opens a Modi Control Modal
- Allows switching between different user states and dashboard modes without actual authentication

## Data Structure Overview

### Key Data Models
- **User Profile**: Personal info, health status, preferences, current insurance
- **Insurance Provider**: Company info, ratings, features, available products
- **Basic Insurance**: Different models (Standard, Telmed, HMO, Hausarzt, Apotheken) with pricing
- **Supplementary Insurance**: Various categories (ambulant, hospital, dental, etc.)
- **Insurance Packages**: Bundled products with discounts
- **Chat Session**: Conversation state, messages, context, recommendations

### Mock Data Available
- 10 major Swiss insurance providers
- 24 basic insurance products
- 19 supplementary insurance products
- 15 insurance packages
- 5 diverse user profiles
- Multilingual chat templates (DE, FR, IT, EN)

