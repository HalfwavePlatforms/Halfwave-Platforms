# Halfwave Platforms - Web Client (`apps/web/src`)

This directory contains the canonical source tree for the Halfwave Platforms web client, built with Vite, React, and TypeScript.

## Folder Architecture

- **`components/`**: Reusable atomic UI components (Buttons, Cards, ThemeToggle, Modals, Forms).
- **`sections/`**: Page-level modular section views (Hero, About, Ecosystem, AI Preview, Process, Timeline, Team, Careers, Contact, Footer).
- **`styles/`**: Design tokens, CSS custom properties, resets, utility classes, and theme definitions.
- **`hooks/`**: Custom React hooks (e.g., `useTheme`, scroll listeners, intersection observers).
- **`data/`**: Typed static data contracts and content for services, team members, roadmap timeline, engineering process, jobs, and navigation.
- **`App.tsx`**: Application entry and page compositor.
- **`main.tsx`**: React DOM root mounting and application initialization.
