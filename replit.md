# Anastasia Sukhareva School of Authentic Marketing

A comprehensive admin and student platform for the "School of Authentic Marketing" (Школа аутентичного маркетинга Анастасии Сухаревой). Features a "Cosmic" premium design theme with deep purple gradients, glassmorphism, and animated star dust effects.

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS v4 + Framer Motion (motion/react)
- **UI Components:** Radix UI primitives + Lucide React icons
- **Routing:** React Router v7
- **Rich Text:** Tiptap editor + React Quill
- **Charts:** Recharts
- **Utilities:** date-fns, clsx, tailwind-merge, xlsx

## Project Structure

```
src/
  app/
    App.tsx               # Main app component
    Root.tsx              # Root wrapper
    routes.tsx            # Route definitions
    components/           # Reusable components (icons, UI, admin, figma)
    contexts/             # Auth context (AuthContext.tsx)
    pages/                # Route-level page components
    types/                # TypeScript types (rbac.ts)
    utils/                # Helper functions
  assets/                 # Static PNG image assets
  styles/                 # Global CSS, Tailwind config, theme, fonts
index.html
vite.config.ts
package.json
```

## Key Features

- **RBAC System:** Super Admin, Manager/Curator, and Student roles
- **Course Management:** Lessons with Tiptap editor, tariff-based access
- **Email System:** Custom email composer with templates and placeholder support
- **Financial Analytics:** Revenue, conversion, and tariff dashboards
- **Cosmic Design:** Deep purple (#2E1065), glassmorphism, star animations

## Development

```bash
npm install
npm run dev   # Starts on port 5000
```

## Configuration Notes

- Vite dev server runs on `0.0.0.0:5000` with `allowedHosts: true` for Replit proxy support
- Asset imports use `@/assets/` alias (originally `figma:asset/` — fixed for Replit)
- Deployment: Static site — `npm run build` produces `dist/`
