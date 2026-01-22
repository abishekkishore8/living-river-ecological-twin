import { create } from 'zustand';

export interface LayerState {
  id: string;
  name: string;
  enabled: boolean;
  category: 'hydrology' | 'water-quality' | 'biodiversity';
}

export interface SpeciesData {
  name: string;
  scientificName: string;
  status: 'Critical' | 'Endangered' | 'Vulnerable' | 'Stable';
  population: number;
  habitat: string;
  description: string;
  threats: string[];
}

export interface WaterQualityData {
  dissolvedOxygen: number;
  ph: number;
  turbidity: number;
  bod: number;
  cod: number;
  timestamp: string;
}

export interface RiverHealthData {
  overallScore: number;
  do: number;
  bod: number;
  flow: number;
  biodiversity: number;
}

interface AppState {
  // Layer Management
  layers: LayerState[];
  toggleLayer: (layerId: string) => void;
  
  // Selected Species
  selectedSpecies: SpeciesData | null;
  setSelectedSpecies: (species: SpeciesData | null) => void;
  
  // Water Quality Data
  waterQualityData: WaterQualityData[];
  setWaterQualityData: (data: WaterQualityData[]) => void;
  
  // River Health
  riverHealth: RiverHealthData | null;
  setRiverHealth: (health: RiverHealthData) => void;
  
  // Map State
  mapCenter: [number, number];
  mapZoom: number;
  setMapCenter: (center: [number, number]) => void;
  setMapZoom: (zoom: number) => void;
  
  // Drawer/Modal State
  isDrawerOpen: boolean;
  drawerContent: 'species' | 'sensor' | null;
  openDrawer: (content: 'species' | 'sensor') => void;
  closeDrawer: () => void;
}

const initialLayers: LayerState[] = [
  // Hydrology
  { id: 'river-network', name: 'River Network', enabled: true, category: 'hydrology' },
  { id: 'flow-direction', name: 'Flow Direction', enabled: false, category: 'hydrology' },
  { id: 'depth', name: 'Depth / Bathymetry', enabled: true, category: 'hydrology' },
  // Water Quality
  { id: 'dissolved-oxygen', name: 'Dissolved Oxygen', enabled: true, category: 'water-quality' },
  { id: 'ph', name: 'pH', enabled: false, category: 'water-quality' },
  { id: 'turbidity', name: 'Turbidity', enabled: false, category: 'water-quality' },
  { id: 'bod-cod', name: 'BOD / COD', enabled: false, category: 'water-quality' },
  // Biodiversity
  { id: 'dolphin-habitat', name: 'Dolphin Habitat', enabled: true, category: 'biodiversity' },
  { id: 'gharial-habitat', name: 'Gharial Habitat', enabled: true, category: 'biodiversity' },
  { id: 'turtle-nesting', name: 'Turtle Nesting', enabled: false, category: 'biodiversity' },
  { id: 'fish-richness', name: 'Fish Richness', enabled: false, category: 'biodiversity' },
];

export const useAppStore = create<AppState>((set) => ({
  // Initial State
  layers: initialLayers,
  selectedSpecies: null,
  waterQualityData: [],
  riverHealth: null,
  mapCenter: [25.3176, 83.0058], // Varanasi coordinates
  mapZoom: 10,
  isDrawerOpen: false,
  drawerContent: null,

  // Actions
  toggleLayer: (layerId: string) =>
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === layerId ? { ...layer, enabled: !layer.enabled } : layer
      ),
    })),

  setSelectedSpecies: (species) => set({ selectedSpecies: species }),
  
  setWaterQualityData: (data) => set({ waterQualityData: data }),
  
  setRiverHealth: (health) => set({ riverHealth: health }),
  
  setMapCenter: (center) => set({ mapCenter: center }),
  
  setMapZoom: (zoom) => set({ mapZoom: zoom }),
  
  openDrawer: (content) => set({ isDrawerOpen: true, drawerContent: content }),
  
  closeDrawer: () => set({ isDrawerOpen: false, drawerContent: null }),
}));
