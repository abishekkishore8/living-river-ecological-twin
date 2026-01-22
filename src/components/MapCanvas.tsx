'use client';

import { useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import * as d3 from 'd3';

export function MapCanvas() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mapType, setMapType] = useState('osm');
  const { layers } = useAppStore();

  // Generate polygon areas along Ganga River using D3
  const generateRiverPolygons = (centerLine: number[][], width: number) => {
    const polygons: number[][][] = [];
    
    for (let i = 0; i < centerLine.length - 1; i++) {
      const [lon1, lat1] = centerLine[i];
      const [lon2, lat2] = centerLine[i + 1];
      
      // Calculate perpendicular direction
      const dx = lon2 - lon1;
      const dy = lat2 - lat1;
      const length = Math.sqrt(dx * dx + dy * dy);
      const perpX = -dy / length;
      const perpY = dx / length;
      
      // Create rectangle polygon
      const halfWidth = width / 2;
      const polygon = [
        [lon1 + perpX * halfWidth, lat1 + perpY * halfWidth],
        [lon2 + perpX * halfWidth, lat2 + perpY * halfWidth],
        [lon2 - perpX * halfWidth, lat2 - perpY * halfWidth],
        [lon1 - perpX * halfWidth, lat1 - perpY * halfWidth],
        [lon1 + perpX * halfWidth, lat1 + perpY * halfWidth]
      ];
      polygons.push(polygon);
    }
    
    return polygons;
  };

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let isMounted = true;

    const init = async () => {
      if (!mapRef.current || !isMounted || mapInstanceRef.current) return;

      const container = mapRef.current;
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (!isMounted || mapInstanceRef.current) return;
      
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        setTimeout(init, 200);
        return;
      }

      if (!isMounted || mapInstanceRef.current) return;

      try {
        const { Map, View } = await import('ol');
        const TileLayer = (await import('ol/layer/Tile')).default;
        const VectorLayer = (await import('ol/layer/Vector')).default;
        const VectorSource = (await import('ol/source/Vector')).default;
        const XYZ = (await import('ol/source/XYZ')).default;
        const { fromLonLat } = await import('ol/proj');
        const { Style, Circle: CircleStyle, Fill, Stroke } = await import('ol/style');
        const { defaults: defaultControls } = await import('ol/control');
        const Point = (await import('ol/geom/Point')).default;
        const Feature = (await import('ol/Feature')).default;
        const LineString = (await import('ol/geom/LineString')).default;
        const Polygon = (await import('ol/geom/Polygon')).default;

        if (!isMounted || mapInstanceRef.current) return;

        const osmSource = new XYZ({ url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png' });
        const baseLayer = new TileLayer({ source: osmSource });

        // Base vector layer for stations and river
        const vectorSource = new VectorSource();
        const vectorLayer = new VectorLayer({
          source: vectorSource,
          style: new Style({
            image: new CircleStyle({ radius: 8, fill: new Fill({ color: '#00E6B8' }), stroke: new Stroke({ color: '#fff', width: 2 }) })
          })
        });

        // Add stations
        [[78.1642, 29.9457], [80.3319, 26.4499], [82.9989, 25.3268]].forEach(([lon, lat]) => {
          vectorSource.addFeature(new Feature({ geometry: new Point(fromLonLat([lon, lat])) }));
        });

        // Ganga River centerline
        const riverCoords = [[77, 30], [78, 29.5], [79, 28], [80, 26.5], [81, 25.5], [82, 25], [83, 24], [84, 23], [85, 22.5], [86, 22], [87, 22], [88, 22]];
        const riverLine = new LineString(riverCoords.map(c => fromLonLat(c)));
        vectorSource.addFeature(new Feature({ geometry: riverLine }));

        // Create map first with base layers
        const map = new Map({
          target: container,
          layers: [baseLayer, vectorLayer],
          view: new View({ center: fromLonLat([82, 25]), zoom: 6 }),
          controls: defaultControls()
        });

        mapInstanceRef.current = map;

        // Create overlay layers after map is initialized
        const overlayLayers = new Map<string, VectorLayer<VectorSource>>();

        // Layer colors
        const layerColors: Record<string, { fill: string; stroke: string }> = {
          'river-network': { fill: 'rgba(26, 77, 94, 0.3)', stroke: '#1a4d5e' },
          'flow-direction': { fill: 'rgba(0, 150, 255, 0.3)', stroke: '#0096ff' },
          'depth': { fill: 'rgba(0, 100, 200, 0.4)', stroke: '#0064c8' },
          'dissolved-oxygen': { fill: 'rgba(0, 255, 100, 0.3)', stroke: '#00ff64' },
          'ph': { fill: 'rgba(255, 200, 0, 0.3)', stroke: '#ffc800' },
          'turbidity': { fill: 'rgba(255, 150, 0, 0.3)', stroke: '#ff9600' },
          'bod-cod': { fill: 'rgba(255, 100, 100, 0.3)', stroke: '#ff6464' },
          'dolphin-habitat': { fill: 'rgba(100, 200, 255, 0.4)', stroke: '#64c8ff' },
          'gharial-habitat': { fill: 'rgba(150, 255, 150, 0.4)', stroke: '#96ff96' },
          'turtle-nesting': { fill: 'rgba(255, 200, 150, 0.4)', stroke: '#ffc896' },
          'fish-richness': { fill: 'rgba(200, 150, 255, 0.4)', stroke: '#c896ff' }
        };

        // Generate polygons for each layer
        layers.forEach(layer => {
          const source = new VectorSource();
          const color = layerColors[layer.id] || { fill: 'rgba(128, 128, 128, 0.3)', stroke: '#808080' };
          
          // Different widths for different categories
          let width = 0.15;
          if (layer.category === 'hydrology') width = 0.2;
          else if (layer.category === 'water-quality') width = 0.18;
          else if (layer.category === 'biodiversity') width = 0.25;

          const polygons = generateRiverPolygons(riverCoords, width);
          
          polygons.forEach(poly => {
            const polyCoords = poly.map(c => fromLonLat(c));
            const feature = new Feature({
              geometry: new Polygon([polyCoords]),
              layerId: layer.id
            });
            source.addFeature(feature);
          });

          const overlayLayer = new VectorLayer({
            source: source,
            visible: layer.enabled,
            style: new Style({
              fill: new Fill({ color: color.fill }),
              stroke: new Stroke({ color: color.stroke, width: 2 })
            })
          });

          overlayLayers.set(layer.id, overlayLayer);
          map.addLayer(overlayLayer);
        });

        // Store overlay layers for toggling
        (map as any).overlayLayers = overlayLayers;
        
        setTimeout(() => {
          map.updateSize();
          console.log('✅ Map initialized with overlay layers');
        }, 200);
      } catch (err) {
        console.error('❌ Map error:', err);
      }
    };

    init();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        // Remove all layers
        const map = mapInstanceRef.current;
        map.getLayers().clear();
        // Remove map from DOM
        map.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update layer visibility when layers change
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    
    const overlayLayers = (mapInstanceRef.current as any).overlayLayers;
    if (!overlayLayers) return;

    layers.forEach(layer => {
      const overlayLayer = overlayLayers.get(layer.id);
      if (overlayLayer) {
        overlayLayer.setVisible(layer.enabled);
      }
    });
  }, [layers]);

  // Update base map layer
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    
    const update = async () => {
      const XYZ = (await import('ol/source/XYZ')).default;
      const urls: Record<string, string> = {
        osm: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        terrain: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
        dark: 'https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      };
      
      const layer = mapInstanceRef.current.getLayers().item(0);
      if (layer && urls[mapType]) {
        (layer as any).setSource(new XYZ({ url: urls[mapType] }));
        setTimeout(() => mapInstanceRef.current?.updateSize(), 100);
      }
    };
    
    update();
  }, [mapType]);

  return (
    <div className="w-[860px] h-full flex-1" style={{ minHeight: '600px', height: '100%', position: 'relative' }}>
      <div 
        ref={mapRef} 
        className="ol-map"
        style={{ 
          width: '100%', 
          height: '100%', 
          minHeight: '600px',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }} 
      />
      <div className="absolute top-4 left-4 z-30 flex gap-2">
        {['dark', 'satellite', 'terrain', 'osm'].map(type => (
          <button 
            key={type} 
            onClick={() => setMapType(type)} 
            className={`px-3 py-1 rounded text-xs ${mapType === type ? 'bg-teal-600 text-white' : 'bg-white/10 text-white'}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
        <button 
          onClick={() => mapInstanceRef.current?.getView().setZoom((mapInstanceRef.current?.getView().getZoom() || 6) + 1)} 
          className="w-10 h-10 glass rounded-lg flex items-center justify-center"
        >
          <ZoomIn className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
        </button>
        <button 
          onClick={() => mapInstanceRef.current?.getView().setZoom((mapInstanceRef.current?.getView().getZoom() || 6) - 1)} 
          className="w-10 h-10 glass rounded-lg flex items-center justify-center"
        >
          <ZoomOut className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
        </button>
      </div>
      <div className="absolute bottom-4 left-4 glass-dark rounded-lg p-4 w-[200px] z-30">
        <h4 className="text-[12px] font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Map Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'var(--accent-teal)' }} />
            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Station</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1" style={{ backgroundColor: '#1a4d5e' }} />
            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>River</span>
          </div>
        </div>
      </div>
    </div>
  );
}
