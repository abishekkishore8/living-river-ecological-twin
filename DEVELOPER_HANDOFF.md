# Living Ganga – Ecological Digital Twin Portal
## Developer Handoff Document

### Project Overview
Advanced GIS & Biodiversity Intelligence Platform for Namami Gange initiative.

**Client:** Namami Gange  
**Platform:** Web (Desktop-first, scalable to tablet & mobile)  
**Primary Viewport:** 1440 × 900  
**Tech Stack:** React + TypeScript + Three.js + D3.js + Mapbox/Cesium

---

## PART 1 — FIGMA FRAME STRUCTURE

### Frame 00 — Cover
- **Purpose:** Presentation cover only
- **Size:** 1440 × 900
- **Title:** "Living Ganga – Ecological Digital Twin"
- **Subtitle:** "Advanced GIS & Biodiversity Intelligence Platform"
- **Background:** Gradient (#07141E → #0C1F2E)

### Frame 01 — Design Tokens
All tokens are defined in `src/styles/globals.css`:

**Colors:**
- `--bg-primary`: #07141E
- `--bg-secondary`: #0C1F2E
- `--accent-teal`: #00E6B8
- `--accent-green`: #3CFF9E
- `--warning-amber`: #FFB020
- `--danger-red`: #FF4D4F
- `--text-primary`: #EAF6F6
- `--text-muted`: #9CCFD8

**Typography:**
- H1: 64px / SemiBold (600)
- H2: 40px / Medium (500)
- H3: 28px / Medium (500)
- Body: 16px
- Caption: 13px (Monospace)

### Frame 02 — Hero Section
**Component:** `src/components/HeroScene.tsx`

**Layer Order (TOP → BOTTOM):**
1. Hero_UI_Overlay (Navigation, Text, Tags)
2. Hero_WebGL_Canvas (Three.js placeholder)
3. Atmosphere_Gradient

**Key Elements:**
- Top Navigation Bar: 72px height, Glass effect (blur 24px)
- Logo: 140 × 32px
- Navigation Buttons: Spatial Portal, Biodiversity, Community, Research, Login
- Hero Text Group: 800px width, centered
- CTA Button: 260 × 56px, radius 14px, #00E6B8 fill
- Species Annotation Tags: 160 × 40px glass components

**⚠️ IMPORTANT:** The WebGL canvas is a placeholder. At runtime, this will be replaced with a full Three.js scene. Designers must NOT draw animals here.

### Frame 03 — GIS Dashboard
**Component:** `src/components/GISDashboard.tsx`

**Grid Split:**
- Left Panel: 280px (`LayerPanel`)
- Map Canvas: 860px (`MapCanvas`)
- Right Panel: 300px (`DataPanel`)

**Left Panel - Layer Control:**
- Section: Hydrology (River Network, Flow Direction, Depth / Bathymetry)
- Section: Water Quality (Dissolved Oxygen, pH, Turbidity, BOD / COD)
- Section: Biodiversity (Dolphin Habitat, Gharial Habitat, Turtle Nesting, Fish Richness)

**Right Panel - Data Widgets:**
- River Health Gauge
- Water Quality Chart
- Biodiversity Radial
- Community Feed

---

## PART 2 — THREE.JS SCENE STRUCTURE

**Component:** `src/components/scenes/ThreeScene.tsx`

**Scene Architecture:**
```
Scene
├── Environment
│   ├── Skybox
│   ├── SunLight
│   ├── Fog
├── WaterSystem
│   ├── SurfaceMesh
│   ├── UnderwaterVolume
├── Fauna
│   ├── DolphinGroup (Gangetic Dolphin .glb, 30-50k polycount)
│   ├── Gharial
│   ├── Turtle
│   ├── FishSchools (Instanced meshes, Boids algorithm)
├── Terrain
│   ├── Riverbed
│   ├── Ghats
│   ├── Forest
```

**Fauna Specifications:**

**Dolphin (Gangetic Dolphin):**
- Model: .glb format
- Polycount: 30-50k target
- Material: PBR with wet skin shader
- Animation: Swim loop, surface breathing
- Movement: Spline-based river path, gentle oscillation

**Gharial:**
- Semi-static near riverbed
- Occasional tail movement
- Slow head rotation

**Turtle:**
- Near riverbed
- Slow forward motion
- Random pause behavior

**Fish Schools:**
- Instanced meshes
- Boids algorithm for schooling behavior
- Density varies by water quality data

---

## PART 3 — D3.JS GRAPH SCHEMAS

### Graph 1 — River Health Index
**Component:** `src/components/widgets/RiverHealthGauge.tsx`

**Type:** Semi-circular Gauge

**Parameters (Weighted):**
- DO (Dissolved Oxygen): 30%
- BOD (Biological Oxygen Demand): 25%
- Flow: 20%
- Biodiversity: 25%

**Color Coding:**
- Red: < 40
- Amber: 40-70
- Green: > 70

### Graph 2 — Water Quality Trends
**Component:** `src/components/widgets/WaterQualityChart.tsx`

**Type:** Multi-line Chart

**Lines:**
- DO: Teal (#00E6B8)
- pH: Cyan (#3CFF9E)
- Turbidity: Amber (#FFB020)

**Features:**
- X-axis: Time
- Y-axis: Value
- Tooltip on hover
- Zoom capability
- Brushing for selection

### Graph 3 — Biodiversity Status
**Component:** `src/components/widgets/BiodiversityRadial.tsx`

**Type:** Radial / Donut Chart

**Segments:**
- Dolphin
- Gharial
- Turtle
- Fish

**Color-coded by risk status:**
- Critical: #FF4D4F
- Endangered: #FFB020
- Vulnerable: #FFB020
- Stable: #3CFF9E

---

## PART 4 — REACT COMPONENT HIERARCHY

```
App
├── HeroScene
│   ├── WebGLCanvas
│   │   └── ThreeScene
│   ├── HeroOverlay
│   │   ├── Navigation
│   │   ├── HeroText
│   │   └── CTA Button
│   └── SpeciesTags
├── GISDashboard
│   ├── MapCanvas (860px)
│   ├── LayerPanel (280px)
│   └── DataPanel (300px)
│       ├── RiverHealthGauge
│       ├── WaterQualityChart
│       ├── BiodiversityRadial
│       └── CommunityFeed
└── Drawers (Future)
    ├── SpeciesDetailDrawer
    └── SensorDetailDrawer
```

---

## PART 5 — DEVELOPER NOTES

### Tech Stack
- **Frontend:** React 18.3.1 + TypeScript
- **3D:** Three.js 0.169.0
- **GIS:** Mapbox GL / Cesium (to be integrated)
- **Charts:** D3.js 7.9.0, Recharts 2.15.2
- **State Management:** React useState (consider Zustand/Redux for complex state)
- **Styling:** Tailwind CSS 4.x + CSS Variables

### Performance Rules
1. **3D runs only in Hero:** The Three.js scene should only be active on the hero section
2. **GIS disables 3D:** When navigating to GIS Dashboard, the 3D scene should be unmounted/disabled
3. **Lazy-load heavy assets:** Use React.lazy() for heavy components
4. **60 FPS target:** Optimize animations and renders for smooth 60 FPS
5. **Asset optimization:** Compress GLB models, use texture atlases, implement LOD (Level of Detail)

### Accessibility
1. **Keyboard navigation:** All interactive elements must be keyboard accessible
2. **Color contrast:** WCAG AA compliance (4.5:1 for normal text, 3:1 for large text)
3. **Tooltips:** Provide tooltips for scientific terms and abbreviations
4. **ARIA labels:** Add appropriate ARIA labels for screen readers
5. **Focus indicators:** Visible focus states for all interactive elements

### File Structure
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

### Dependencies to Install
```bash
npm install three d3
npm install --save-dev @types/three
```

### Next Steps
1. Integrate Mapbox GL or Cesium for GIS functionality
2. Load actual GLB models for fauna (Dolphin, Gharial, Turtle)
3. Implement Boids algorithm for fish schools
4. Connect to real-time data APIs
5. Implement drawer/modal components for species details
6. Add state management (Zustand/Redux) if needed
7. Set up routing (React Router) for multiple pages
8. Add responsive breakpoints for tablet & mobile

### Important Notes
- **3D Scene:** The Three.js scene is currently a placeholder with basic setup. Full implementation requires:
  - GLB model loading (GLTFLoader)
  - Animation systems (GSAP or Three.js animation mixer)
  - Post-processing effects
  - Performance optimization
  
- **GIS Integration:** The MapCanvas component currently uses a 2D canvas. Replace with Mapbox GL or Cesium for full GIS functionality.

- **Data Visualization:** The charts are currently using canvas-based rendering. Consider migrating to D3.js for more advanced features like zooming and brushing.

---

## Final Notes

This document is intentionally explicit and rigid to ensure:
- ✅ Figma doesn't hallucinate design elements
- ✅ Developers don't guess implementation details
- ✅ 3D artists understand exact requirements
- ✅ GIS data stays scientifically accurate

**Frame Size Reference:** All frames are designed for 1440 × 900 viewport. Responsive design should scale appropriately while maintaining aspect ratios and readability.
