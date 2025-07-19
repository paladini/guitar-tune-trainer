# Guitar Tuner - Smartwatch PWA

## Overview

This is a web-based guitar tuner application specifically optimized for smartwatch and mobile screens. The app provides reference tones for standard guitar tuning (E-A-D-G-B-E) that users can play by ear to tune their guitars. It's built as a Progressive Web App (PWA) with a modern tech stack optimized for small screen experiences.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **Audio**: Web Audio API for generating guitar reference tones
- **State Management**: React hooks with TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **PWA Features**: Service worker support for offline functionality

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL support
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: PostgreSQL session store
- **Development**: Hot module replacement via Vite integration

### Mobile-First Design
- **Responsive**: Optimized for smartwatch screens (small displays)
- **Touch Gestures**: Swipe navigation between guitar strings
- **PWA**: Installable on mobile devices and smartwatches
- **Dark Theme**: Optimized for small screen visibility

## Key Components

### Audio System
- **Web Audio API**: Generates sine wave tones for guitar reference pitches
- **Audio Context Management**: Handles browser audio policies and context suspension
- **Frequency Generation**: Precise frequencies for standard guitar tuning (82.41Hz to 329.63Hz)
- **Volume Control**: Gentle audio envelopes for smooth playback

### Guitar String Data
- **String Definitions**: E1 (82.41Hz), A (110Hz), D (146.83Hz), G (196Hz), B (246.94Hz), E2 (329.63Hz)
- **Color Coding**: Each string has a unique color for visual identification
- **Position Labels**: Clear string numbering (6th to 1st string)

### UI Components
- **Tuner Interface**: Single-page application with string selection
- **Navigation Controls**: Previous/next buttons and swipe gestures
- **Play Controls**: Play/stop, repeat functionality
- **Visual Feedback**: Color-coded string display with clear typography

### Database Schema
- **Users Table**: Basic user management structure (id, username, password)
- **Drizzle Integration**: Type-safe database operations with PostgreSQL

## Data Flow

1. **User Interaction**: User selects guitar string or navigates via swipe/buttons
2. **Audio Generation**: Web Audio API creates sine wave at specific frequency
3. **Playback Control**: Audio context manages playback with volume envelopes
4. **State Management**: React hooks track current string and playback state
5. **Visual Updates**: UI reflects current string selection with color coding

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **UI Library**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with class-variance-authority
- **State Management**: TanStack React Query
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React icons
- **Date Handling**: date-fns utility library

### Backend Dependencies
- **Server Framework**: Express.js
- **Database**: Drizzle ORM, Neon serverless PostgreSQL
- **Session Management**: connect-pg-simple
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Development Tools
- **Build System**: Vite with React plugin
- **TypeScript**: Full type checking and compilation
- **Database Migrations**: Drizzle Kit for schema management
- **Development Server**: Hot reload with Vite middleware

## Deployment Strategy

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations applied via `db:push` command
- **Environment**: Production mode with `NODE_ENV=production`

### Development Environment
- **Hot Reload**: Vite dev server with Express middleware integration
- **TypeScript**: Real-time compilation and type checking
- **Database**: Local development with environment variable configuration
- **Error Handling**: Runtime error overlay for debugging

### PWA Deployment
- **Manifest**: Web app manifest for installation
- **Service Worker**: Offline functionality and caching
- **Icons**: Multiple icon sizes for different devices
- **Meta Tags**: Proper PWA meta tags for mobile optimization

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Session Secret**: Secure session management configuration
- **Development Mode**: Replit integration with development banner
- **Build Scripts**: Separate development and production workflows