'use client';

import { useEffect, useRef, useState } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';
import { defaults as defaultControls, Zoom, ScaleLine, FullScreen } from 'ol/control';
import { Upload, Map as MapIcon, BarChart3, ZoomIn, ZoomOut, RotateCcw, AlertCircle, Layers, X } from 'lucide-react';
import shp from 'shpjs';

interface ShapefileLayer {
  id: string;
  name: string;
  source: VectorSource;
  layer: VectorLayer<any>;
  visible: boolean;
}

export function SpatialEcology() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mapType, setMapType] = useState<'satellite' | 'terrain' | 'dark'>('satellite');
  const [shapefileLayers, setShapefileLayers] = useState<ShapefileLayer[]>([]);
  const [statsMode, setStatsMode] = useState(true);
  const [uploadMessage, setUploadMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
  const [ecologicalData, setEcologicalData] = useState<any[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined' || mapInstanceRef.current) return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!mapRef.current || mapInstanceRef.current) return;

      // Base layer sources
      const satelliteSource = new XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attributions: 'Esri, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
      });

      const terrainSource = new XYZ({
        url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
        attributions: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
      });

      const darkSource = new XYZ({
        url: 'https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        attributions: '© OpenStreetMap contributors © CARTO'
      });

      // Get current source based on mapType
      const getBaseSource = () => {
        switch (mapType) {
          case 'satellite':
            return satelliteSource;
          case 'terrain':
            return terrainSource;
          case 'dark':
            return darkSource;
          default:
            return satelliteSource;
        }
      };

      const baseLayer = new TileLayer({
        source: getBaseSource()
      });

      const map = new Map({
        target: mapRef.current,
        layers: [baseLayer],
        view: new View({
          center: fromLonLat([82.0, 25.0]), // Ganges River area
          zoom: 6,
          minZoom: 4,
          maxZoom: 18
        }),
        controls: defaultControls().extend([
          new Zoom(),
          new ScaleLine(),
          new FullScreen()
        ])
      });

      mapInstanceRef.current = map;
      setMapLoaded(true);

      // Force map update after a brief delay
      setTimeout(() => {
        map.updateSize();
      }, 100);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update base layer when mapType changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const satelliteSource = new XYZ({
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attributions: 'Esri, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
    });

    const terrainSource = new XYZ({
      url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
      attributions: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
    });

    const darkSource = new XYZ({
      url: 'https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attributions: '© OpenStreetMap contributors © CARTO'
    });

    const getBaseSource = () => {
      switch (mapType) {
        case 'satellite':
          return satelliteSource;
        case 'terrain':
          return terrainSource;
        case 'dark':
          return darkSource;
        default:
          return satelliteSource;
      }
    };

    const baseLayer = mapInstanceRef.current.getLayers().item(0) as TileLayer<XYZ>;
    if (baseLayer) {
      baseLayer.setSource(getBaseSource());
      // Update map size to ensure tiles load properly
      setTimeout(() => {
        mapInstanceRef.current?.updateSize();
      }, 100);
    }
  }, [mapType]);

  // Handle window resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      if (mapInstanceRef.current) {
        setTimeout(() => {
          mapInstanceRef.current?.updateSize();
        }, 100);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle shapefile upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !mapInstanceRef.current) return;

    setUploadMessage({ text: 'Processing file...', type: 'success' });
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const result = event.target?.result;
        if (!result) throw new Error("File could not be read.");

        let geojson: any;

        if (file.name.endsWith('.shp')) {
          geojson = await shp(result as ArrayBuffer);
          if (Array.isArray(geojson)) {
            geojson = geojson[0]; // Take first feature collection
          }
        } else if (file.name.endsWith('.json') || file.name.endsWith('.geojson')) {
          geojson = JSON.parse(result as string);
        } else if (file.name.endsWith('.zip')) {
          // Handle zipped shapefile
          const geojsonData = await shp(result as ArrayBuffer);
          if (Array.isArray(geojsonData)) {
            geojson = geojsonData[0];
          } else {
            geojson = geojsonData;
          }
        } else {
          throw new Error('Unsupported file format. Please use .shp, .geojson, .json, or .zip');
        }

        // Process GeoJSON and add to map
        processGeoJSON(geojson, file.name);
      } catch (err: any) {
        setUploadMessage({ text: err.message || 'Error parsing file.', type: 'error' });
      }
    };

    if (file.name.endsWith('.shp') || file.name.endsWith('.zip')) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }

    setTimeout(() => setUploadMessage(null), 5000);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const processGeoJSON = (geojson: any, fileName: string) => {
    if (!mapInstanceRef.current) return;

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geojson, {
        featureProjection: 'EPSG:3857'
      })
    });

    // Create style based on geometry type
    const getStyle = (feature: any) => {
      const geometry = feature.getGeometry();
      const geometryType = geometry.getType();

      if (geometryType === 'Point') {
        return new Style({
          image: new Circle({
            radius: 6,
            fill: new Fill({ color: '#00E6B8' }),
            stroke: new Stroke({ color: '#fff', width: 2 })
          })
        });
      } else if (geometryType === 'LineString' || geometryType === 'MultiLineString') {
        return new Style({
          stroke: new Stroke({
            color: '#3CFF9E',
            width: 3
          })
        });
      } else {
        return new Style({
          fill: new Fill({
            color: 'rgba(0, 230, 184, 0.3)'
          }),
          stroke: new Stroke({
            color: '#00E6B8',
            width: 2
          })
        });
      }
    };

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: getStyle
    });

    const layerId = `shapefile-${Date.now()}`;
    const layerName = fileName.replace(/\.[^/.]+$/, '');

    mapInstanceRef.current.addLayer(vectorLayer);

    const newLayer: ShapefileLayer = {
      id: layerId,
      name: layerName,
      source: vectorSource,
      layer: vectorLayer,
      visible: true
    };

    setShapefileLayers(prev => [...prev, newLayer]);
    setUploadMessage({ text: `✓ Loaded ${vectorSource.getFeatures().length} features from ${layerName}`, type: 'success' });

    // Calculate ecological statistics
    calculateEcologicalStats(vectorSource);
  };

  const calculateEcologicalStats = (source: VectorSource) => {
    const features = source.getFeatures();
    const stats = {
      totalFeatures: features.length,
      types: {} as Record<string, number>,
      bounds: source.getExtent()
    };

    features.forEach(feature => {
      const geometry = feature.getGeometry();
      if (geometry) {
        const type = geometry.getType();
        stats.types[type] = (stats.types[type] || 0) + 1;
      }
    });

    setEcologicalData(prev => [...prev, stats]);
  };

  const removeLayer = (layerId: string) => {
    if (!mapInstanceRef.current) return;

    const layerToRemove = shapefileLayers.find(l => l.id === layerId);
    if (layerToRemove) {
      mapInstanceRef.current.removeLayer(layerToRemove.layer);
      setShapefileLayers(prev => prev.filter(l => l.id !== layerId));
    }
  };

  const toggleLayerVisibility = (layerId: string) => {
    const layer = shapefileLayers.find(l => l.id === layerId);
    if (layer) {
      layer.layer.setVisible(!layer.visible);
      setShapefileLayers(prev => prev.map(l => 
        l.id === layerId ? { ...l, visible: !l.visible } : l
      ));
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      const view = mapInstanceRef.current.getView();
      const zoom = view.getZoom();
      if (zoom !== undefined) {
        view.setZoom(zoom + 1);
      }
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      const view = mapInstanceRef.current.getView();
      const zoom = view.getZoom();
      if (zoom !== undefined) {
        view.setZoom(zoom - 1);
      }
    }
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      const view = mapInstanceRef.current.getView();
      view.setCenter(fromLonLat([82.0, 25.0]));
      view.setZoom(6);
      mapInstanceRef.current.updateSize();
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b p-3 flex items-center gap-3 flex-wrap shadow-sm">
        <div className="flex gap-2">
          <button 
            onClick={() => setMapType('satellite')} 
            className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
              mapType === 'satellite' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border hover:bg-gray-50'
            }`}
          >
            <MapIcon className="w-4 h-4 inline mr-1" /> Satellite
          </button>
          <button 
            onClick={() => setMapType('terrain')} 
            className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
              mapType === 'terrain' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border hover:bg-gray-50'
            }`}
          >
            Terrain
          </button>
          <button 
            onClick={() => setMapType('dark')} 
            className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
              mapType === 'dark' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border hover:bg-gray-50'
            }`}
          >
            Dark Map
          </button>
        </div>

        <div className="flex gap-2 border-l pl-3">
          <button 
            onClick={handleZoomIn} 
            className="p-2 bg-white border rounded hover:bg-gray-100 transition-colors" 
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button 
            onClick={handleZoomOut} 
            className="p-2 bg-white border rounded hover:bg-gray-100 transition-colors" 
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button 
            onClick={handleResetView} 
            className="p-2 bg-white border rounded hover:bg-gray-100 transition-colors" 
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-2 border-l pl-3">
          <button 
            onClick={() => fileInputRef.current?.click()} 
            className="px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition-all flex items-center gap-2 text-sm font-medium shadow-sm"
          >
            <Upload className="w-4 h-4" /> Upload Shapefile
          </button>
          <input 
            ref={fileInputRef} 
            type="file" 
            accept=".shp,.geojson,.json,.zip" 
            onChange={handleFileUpload} 
            className="hidden" 
          />
        </div>

        <div className="flex gap-2 border-l pl-3">
          <button 
            onClick={() => setStatsMode(!statsMode)} 
            className={`px-3 py-1.5 rounded text-sm font-medium transition-all flex items-center gap-2 ${
              statsMode ? 'bg-blue-600 text-white shadow-md' : 'bg-white border hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Statistics
          </button>
        </div>

        {uploadMessage && (
          <div className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded border ml-auto ${
            uploadMessage.type === 'success' 
              ? 'bg-green-50 text-green-800 border-green-200' 
              : 'bg-red-50 text-red-800 border-red-200'
          }`}>
            {uploadMessage.type === 'error' && <AlertCircle className="w-4 h-4" />}
            {uploadMessage.text}
          </div>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Map Container */}
        <div className="flex-1 relative" style={{ minHeight: '600px', backgroundColor: '#f0f0f0' }}>
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading map...</p>
              </div>
            </div>
          )}
          <div 
            ref={mapRef} 
            className="w-full h-full" 
            style={{ 
              width: '100%', 
              height: '100%', 
              minHeight: '600px',
              position: 'relative',
              zIndex: 0
            }}
          />
          
          {/* Layer Control */}
          {shapefileLayers.length > 0 && (
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 min-w-[200px] max-h-[400px] overflow-y-auto">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Layers
                </h4>
              </div>
              <div className="space-y-2">
                {shapefileLayers.map(layer => (
                  <div key={layer.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="checkbox"
                        checked={layer.visible}
                        onChange={() => toggleLayerVisibility(layer.id)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm truncate">{layer.name}</span>
                    </div>
                    <button
                      onClick={() => removeLayer(layer.id)}
                      className="p-1 hover:bg-red-100 rounded"
                      title="Remove layer"
                    >
                      <X className="w-3 h-3 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Statistics Panel */}
        {statsMode && (
          <div className="w-80 bg-white border-l overflow-y-auto shadow-lg">
            <div className="p-4 border-b bg-gray-50 sticky top-0">
              <h3 className="font-bold text-gray-800">Ecological Analytics</h3>
            </div>
            <div className="p-4 space-y-3">
              {shapefileLayers.map((layer, idx) => {
                const stats = ecologicalData[idx];
                if (!stats) return null;
                
                return (
                  <div key={layer.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow bg-gray-50">
                    <p className="text-sm font-semibold text-gray-800 mb-2">{layer.name}</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Features:</span>
                        <span className="font-bold text-gray-800">{stats.totalFeatures}</span>
                      </div>
                      <div className="mt-2">
                        <p className="text-gray-600 mb-1">Geometry Types:</p>
                        {Object.entries(stats.types).map(([type, count]) => (
                          <div key={type} className="flex justify-between ml-2">
                            <span className="text-gray-500">{type}:</span>
                            <span className="font-medium">{String(count)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {shapefileLayers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Layers className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No layers loaded</p>
                  <p className="text-xs mt-1">Upload a shapefile to see statistics</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
