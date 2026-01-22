# Living River – Ecological Digital Twin Portal

Advanced GIS & Biodiversity Intelligence Platform for river conservation initiatives.

## Project Overview

**Client:** Living River Initiative  
**Platform:** Web (Desktop-first, scalable to tablet & mobile)  
**Primary Viewport:** 1440 × 900  
**Tech Stack:** Next.js 14 + TypeScript + Three.js + Zustand

## ✨ Features

- 🌊 **Hero Section** with Three.js WebGL canvas
- 🗺️ **GIS Dashboard** with dual view modes (Basic & Advanced)
  - **Basic Mode**: Traditional layer controls and canvas mapping
  - **Advanced Mode**: D3.js powered interactive mapping with free basemap tiles
- 🗂️ **Advanced GIS Portal** (NEW)
  - Free basemap layers (OSM, Satellite, Terrain) - Available in India!
  - D3.js powered interactive visualizations
  - Upload shapefiles and CSV data for custom analysis
  - Interactive zoom, pan, and layer controls
  - Real-time statistics and health monitoring
- 📊 **Real-time Data Visualization** widgets (River Health, Water Quality, Biodiversity)
- 🐬 **Species Detail Drawer** with conservation information
- 📈 **Water Quality Monitoring** with auto-refresh (every 5 minutes)
- 💾 **Export Functionality** for reports and data
- 🎨 **Modern UI** with glass morphism effects

## 🚀 Quick Start

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

Visit `http://localhost:3000` to see the application.

### Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── home/              # Homepage
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── home/              # Homepage components
│   ├── scenes/            # Three.js scene components
│   ├── widgets/           # Data visualization widgets
│   └── ui/                # UI components
├── data/                  # Data files
│   ├── speciesData.ts     # Species database
│   └── waterQualityData.ts # Water quality generators
└── store/                 # State management
    └── useAppStore.ts     # Zustand store
```

## 🎯 Working Features

### ✅ All Functional Buttons
- **Navigation**: All links work (Spatial Portal, Biodiversity, Community, Research, Login)
- **Export Report**: Downloads JSON report with current data
- **Layer Toggles**: Enable/disable map layers (updates state)
- **Species Cards/Tags**: Open detailed species information
- **Back Button**: Returns to homepage

### ✅ Real-time Data
- Water quality data updates every 5 minutes
- River health score calculated from real parameters
- Species data from conservation databases
- Community feed with recent observations

### ✅ Interactive Components
- Species Detail Drawer with full conservation info
- Layer Panel with collapsible sections
- Real-time data widgets
- Three.js 3D scene in hero section

## 🗺️ Routes

- `/` → Redirects to `/home`
- `/home` → Hero section + homepage content
- `/dashboard` → GIS Dashboard with widgets
- `/api/water-quality` → API endpoint for water quality data

## 🔧 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **3D Graphics**: Three.js
- **State Management**: Zustand
- **Charts**: Canvas-based charts (D3.js compatible)
- **UI Components**: Radix UI

## 📊 Data Sources

The application uses realistic mock data based on:
- **CPCB** (Central Pollution Control Board) water quality standards
- **IUCN** conservation status for species
- **Real Ganges River** parameters and locations

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Vercel will auto-detect Next.js
4. Deploy!

The `vercel.json` is already configured.

## 📝 Development Notes

- All Three.js components must be `'use client'`
- API routes are in `/app/api/`
- State is managed globally with Zustand
- Components follow the original Figma design specs

## 🔮 Future Enhancements

- Real MapLibre/Mapbox integration for GIS layers
- WebSocket connections for live data streams
- User authentication
- Historical data comparison
- Multiple export formats (CSV, PDF)

## 📄 License

Private project for Namami Gange initiative.
