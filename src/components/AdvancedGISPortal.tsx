'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { tile as d3tile } from 'd3-tile';
import shp from 'shpjs';
import { Upload, Map as MapIcon, BarChart3, ZoomIn, ZoomOut, RotateCcw, AlertCircle } from 'lucide-react';

interface GeoPoint {
  lat: number;
  lon: number;
  name: string;
  value?: number;
  properties?: Record<string, any>;
}

interface ShapePoint {
  type: string;
  coordinates: [number, number];
  properties: { name: string; value?: number };
}

export function AdvancedGISPortal() {
  const svgRef = useRef<SVGSVGElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mapType, setMapType] = useState<'osm' | 'satellite' | 'terrain' | 'dark'>('osm');
  const [shapeData, setShapeData] = useState<ShapePoint[]>([]);
  const [statsMode, setStatsMode] = useState(true);
  const [uploadMessage, setUploadMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  const [riverData] = useState<GeoPoint[]>([
    { lat: 29.9457, lon: 77.7064, name: 'Haridwar Station', value: 85 },
    { lat: 26.7389, lon: 75.8469, name: 'Jaipur Point', value: 72 },
    { lat: 27.1767, lon: 78.0081, name: 'Agra Station', value: 68 },
    { lat: 25.3268, lon: 82.9989, name: 'Varanasi Station', value: 92 },
    { lat: 23.1815, lon: 79.9864, name: 'Jabalpur Point', value: 75 },
    { lat: 22.5726, lon: 88.3639, name: 'Kolkata Station', value: 65 },
  ]);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 1100;
    const height = 700;

    const projection = d3.geoMercator()
      .center([82, 23])
      .scale(1600)
      .translate([width / 2, height / 2]);

    const pathGenerator = d3.geoPath().projection(projection);

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    let tile = d3tile()
      .size([width, height]);

    if (mapType === 'satellite') {
      tile = tile.url((d) => `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${d.z}/${d.y}/${d.x}`);
    } else if (mapType === 'terrain') {
      tile = tile.url((d) => `https://stamen-tiles.a.ssl.fastly.net/terrain/${d.z}/${d.y}/${d.x}.jpg`);
    } else if (mapType === 'dark') {
      tile = tile.url((d) => `https://${['a', 'b', 'c'][d.x % 3]}.basemaps.cartocdn.com/dark_all/${d.z}/${d.x}/${d.y}.png`);
    } else {
      tile = tile.url((d) => `https://a.tile.openstreetmap.org/${d.z}/${d.y}/${d.x}.png`);
    }

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1 << 11, 1 << 22])
      .on('zoom', (event) => {
        const transform = event.transform;
        const tiles = tile.transform(transform)();

        svg.selectAll(".tile")
          .data(tiles, d => String(d))
          .join("image")
            .attr("class", "tile")
            .attr("xlink:href", d => d.url)
            .attr("width", tiles.scale)
            .attr("height", tiles.scale)
            .attr("x", d => Math.round(d.x))
            .attr("y", d => Math.round(d.y));
        
        g.attr("transform", `translate(${transform.x}, ${transform.y}) scale(${transform.k})`);
      });

    const g = svg.append("g");
    
    // Draw river paths
    const riverPaths = [
      { name: 'Ganges', path: [[77.0, 30.0], [78.0, 31.0], [80.0, 26.5], [82.0, 25.0], [88.0, 22.0]] }
    ];

    riverPaths.forEach(river => {
      g.append('path')
        .datum({ type: 'LineString', coordinates: river.path })
        .attr('d', pathGenerator)
        .attr('stroke', '#4a9eff')
        .attr('stroke-width', 2 / Math.sqrt(d3.zoomTransform(svg.node()!).k))
        .attr('fill', 'none');
    });

    // Draw monitoring stations
    const stations = g.selectAll('.station')
      .data(riverData)
      .enter()
      .append('g')
      .attr('class', 'station')
      .attr('transform', d => `translate(${projection([d.lon, d.lat])})`);

    stations.append('circle')
      .attr('r', 5)
      .attr('fill', d => d.value! > 80 ? '#00ff00' : d.value! > 60 ? '#ffff00' : '#ff6b6b')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5);

    stations.append('title')
      .text(d => `${d.name}\nHealth Score: ${d.value}`);

    // Draw shapefile data
    if (shapeData.length > 0) {
      g.selectAll('.shape-point')
        .data(shapeData)
        .enter()
        .append('circle')
        .attr('class', 'shape-point')
        .attr('transform', d => `translate(${projection(d.coordinates)})`)
        .attr('r', 4)
        .attr('fill', '#ff9800')
        .attr('opacity', 0.85);
    }
    
    svg.call(zoom)
       .call(zoom.transform, d3.zoomIdentity.translate(width/2, height/2).scale(1<<12));

  }, [riverData, mapType, shapeData]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadMessage({ text: 'Processing file...', type: 'success' });
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const result = event.target?.result;
        if (!result) throw new Error("File could not be read.");

        if (file.name.endsWith('.shp')) {
          const geojson = await shp(result as ArrayBuffer);
          if (Array.isArray(geojson)) { // shpjs can return an array of geojsons
             geojson.forEach(processGeoJson);
          } else {
             processGeoJson(geojson);
          }
        } else if (file.name.endsWith('.json') || file.name.endsWith('.geojson')) {
          const geojson = JSON.parse(result as string);
          processGeoJson(geojson);
        } else if (file.name.endsWith('.csv')) {
          processCsv(result as string);
        } else {
          throw new Error('Unsupported file format. Please use .shp, .geojson, .json, or .csv');
        }
      } catch (err: any) {
        setUploadMessage({ text: err.message || 'Error parsing file.', type: 'error' });
      }
    };

    if (file.name.endsWith('.shp')) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
    
    setTimeout(() => setUploadMessage(null), 5000);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  
  function processGeoJson(geojson: any) {
      // Process all geometry types: Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon
      const features = geojson.features || [];
      const points: ShapePoint[] = features
        .filter((f: any) => f.geometry?.type && (
          f.geometry.type === 'Point' || 
          f.geometry.type === 'MultiPoint' ||
          f.geometry.type === 'LineString' ||
          f.geometry.type === 'Polygon'
        ))
        .map((feature: any) => {
          let coords: [number, number];
          if (feature.geometry.type === 'Point') {
            coords = feature.geometry.coordinates;
          } else if (feature.geometry.type === 'MultiPoint') {
            coords = feature.geometry.coordinates[0];
          } else if (feature.geometry.type === 'LineString') {
            coords = feature.geometry.coordinates[0];
          } else if (feature.geometry.type === 'Polygon') {
            coords = feature.geometry.coordinates[0][0];
          } else {
            coords = [0, 0];
          }
          return {
            type: 'Feature',
            coordinates: coords,
            properties: feature.properties || { name: 'Feature' },
          };
        });
      setShapeData(prev => [...prev, ...points]);
      setUploadMessage({ text: `✓ Loaded ${points.length} features from GeoJSON`, type: 'success' });
  }

  function processCsv(text: string) {
      const lines = text.trim().split('\n');
      if (lines.length < 2) throw new Error('CSV must have a header and at least one data row.');
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const latIdx = headers.indexOf('lat') !== -1 ? headers.indexOf('lat') : headers.indexOf('latitude');
      const lonIdx = headers.indexOf('lon') !== -1 ? headers.indexOf('lon') : headers.indexOf('longitude');

      if (latIdx === -1 || lonIdx === -1) throw new Error('CSV must have "lat" or "latitude" and "lon" or "longitude" columns.');
      
      const points = lines.slice(1).map((line, i) => {
          const values = line.split(',');
          const lat = parseFloat(values[latIdx]);
          const lon = parseFloat(values[lonIdx]);
          const name = values[headers.indexOf('name')] || `Point ${i + 1}`;
          if (isNaN(lat) || isNaN(lon)) return null;
          return { type: 'Feature', coordinates: [lon, lat], properties: { name } };
      }).filter((p): p is ShapePoint => p !== null);

      setShapeData(prev => [...prev, ...points]);
      setUploadMessage({ text: `✓ Loaded ${points.length} points from CSV`, type: 'success' });
  }

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b p-3 flex items-center gap-3 flex-wrap shadow-sm">
        <div className="flex gap-2">
          <button onClick={() => setMapType('osm')} className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${mapType === 'osm' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border hover:bg-gray-50'}`}><MapIcon className="w-4 h-4 inline mr-1" /> Map</button>
          <button onClick={() => setMapType('satellite')} className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${mapType === 'satellite' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border hover:bg-gray-50'}`}>Satellite</button>
          <button onClick={() => setMapType('terrain')} className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${mapType === 'terrain' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border hover:bg-gray-50'}`}>Terrain</button>
          <button onClick={() => setMapType('dark')} className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${mapType === 'dark' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border hover:bg-gray-50'}`}>Dark Map</button>
        </div>

        <div className="flex gap-2 border-l pl-3">
          <button onClick={() => {}} className="p-2 bg-white border rounded hover:bg-gray-100 transition-colors" title="Zoom In"><ZoomIn className="w-4 h-4" /></button>
          <button onClick={() => {}} className="p-2 bg-white border rounded hover:bg-gray-100 transition-colors" title="Zoom Out"><ZoomOut className="w-4 h-4" /></button>
          <button onClick={() => {}} className="p-2 bg-white border rounded hover:bg-gray-100 transition-colors" title="Reset View"><RotateCcw className="w-4 h-4" /></button>
        </div>

        <div className="flex gap-2 border-l pl-3">
          <button onClick={() => fileInputRef.current?.click()} className="px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition-all flex items-center gap-2 text-sm font-medium shadow-sm">
            <Upload className="w-4 h-4" /> Upload Data
          </button>
          <input ref={fileInputRef} type="file" accept=".shp,.geojson,.json,.csv" onChange={handleFileUpload} className="hidden" />
        </div>

        <div className="flex gap-2 border-l pl-3">
          <button onClick={() => setStatsMode(!statsMode)} className={`px-3 py-1.5 rounded text-sm font-medium transition-all flex items-center gap-2 ${statsMode ? 'bg-blue-600 text-white shadow-md' : 'bg-white border hover:bg-gray-50'}`}>
            <BarChart3 className="w-4 h-4" /> Statistics
          </button>
        </div>

        {uploadMessage && (
          <div className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded border ml-auto ${uploadMessage.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
            {uploadMessage.type === 'error' && <AlertCircle className="w-4 h-4" />}
            {uploadMessage.text}
          </div>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto bg-gray-100 relative">
          <svg ref={svgRef} className="w-full h-full" />
        </div>

        {statsMode && (
          <div className="w-80 bg-white border-l overflow-y-auto shadow-lg">
            <div className="p-4 border-b bg-gray-50 sticky top-0">
              <h3 className="font-bold text-gray-800">River Health Analytics</h3>
            </div>
            <div className="p-4 space-y-3">
              {riverData.map((point, idx) => (
                <div key={idx} className="border rounded-lg p-3 hover:shadow-md transition-shadow bg-gray-50">
                  <p className="text-sm font-semibold text-gray-800">{point.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 bg-gray-300 rounded-full h-2.5 overflow-hidden">
                      <div className="h-2.5 transition-all" style={{ width: `${point.value || 0}%`, backgroundColor: point.value! > 80 ? '#22c55e' : point.value! > 60 ? '#facc15' : '#ef4444' }} />
                    </div>
                    <span className="text-xs font-bold text-gray-700 w-8 text-right">{point.value || 'N/A'}</span>
                  </div>
                </div>
              ))}
              {shapeData.length > 0 && (
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-bold text-sm text-gray-800 mb-3">Uploaded Data ({shapeData.length} points)</h4>
                  <div className="text-xs space-y-2 max-h-60 overflow-y-auto pr-2">
                    {shapeData.map((point, idx) => (
                      <div key={idx} className="bg-orange-50 p-2 rounded border border-orange-200">
                        <p className="font-medium text-orange-900 truncate">{point.properties.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
