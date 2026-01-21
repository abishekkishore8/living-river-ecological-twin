
# Living Ganga – Ecological Digital Twin Portal

Advanced GIS & Biodiversity Intelligence Platform for Namami Gange initiative.

## Project Overview

**Client:** Namami Gange  
**Platform:** Web (Desktop-first, scalable to tablet & mobile)  
**Primary Viewport:** 1440 × 900  
**Tech Stack:** React + TypeScript + Three.js + D3.js + Vite

## Features

- 🌊 **Hero Section** with Three.js WebGL canvas
- 🗺️ **GIS Dashboard** with interactive map (Mapbox/Cesium ready)
- 📊 **Data Visualization** widgets (River Health, Water Quality, Biodiversity)
- 🐬 **Species Annotation Tags** for interactive exploration
- 🎨 **Modern UI** with glass morphism effects

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The development server will start at `http://localhost:3000`

### Build

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your repository
5. Vercel will auto-detect Vite configuration
6. Click "Deploy"

The `vercel.json` configuration file is already included for optimal deployment.

## Project Structure

```
src/
├── components/
│   ├── HeroScene.tsx          # Hero section with WebGL
│   ├── SpeciesTag.tsx         # Species annotation component
│   ├── GISDashboard.tsx       # Main dashboard layout
│   ├── MapCanvas.tsx          # GIS map component
│   ├── LayerPanel.tsx         # Layer control panel
│   ├── DataPanel.tsx          # Data widgets panel
│   ├── scenes/
│   │   ├── ThreeScene.tsx     # Three.js scene implementation
│   │   └── WebGLCanvas.tsx    # WebGL canvas wrapper
│   └── widgets/
│       ├── RiverHealthGauge.tsx
│       ├── WaterQualityChart.tsx
│       ├── BiodiversityRadial.tsx
│       └── CommunityFeed.tsx
├── styles/
│   └── globals.css            # Design tokens & global styles
└── App.tsx                    # Main app component
```

## Design Tokens

All design tokens are defined in `src/styles/globals.css`:

- **Colors:** bg-primary, bg-secondary, accent-teal, accent-green, etc.
- **Typography:** H1 (64px), H2 (40px), H3 (28px), Body (16px), Caption (13px monospace)

## Documentation

See `DEVELOPER_HANDOFF.md` for detailed implementation specifications.

## License

Private project for Namami Gange initiative.
  