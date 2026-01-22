import { NextRequest, NextResponse } from 'next/server';

interface GeoJSONFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: any;
  };
  properties?: Record<string, any>;
}

interface GeoJSON {
  type: string;
  features: GeoJSONFeature[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const geojson: GeoJSON = body.geojson;

    if (!geojson || !geojson.features) {
      return NextResponse.json(
        { error: 'Invalid GeoJSON data' },
        { status: 400 }
      );
    }

    const features = geojson.features;
    const stats = {
      totalFeatures: features.length,
      geometryTypes: {} as Record<string, number>,
      bounds: calculateBounds(features),
      area: calculateTotalArea(features),
      length: calculateTotalLength(features)
    };

    // Count geometry types
    features.forEach(feature => {
      const type = feature.geometry?.type || 'Unknown';
      stats.geometryTypes[type] = (stats.geometryTypes[type] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      statistics: stats
    });
  } catch (error: any) {
    console.error('Spatial calculation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to calculate spatial statistics' },
      { status: 500 }
    );
  }
}

function calculateBounds(features: GeoJSONFeature[]): [number, number, number, number] {
  let minLon = Infinity, minLat = Infinity;
  let maxLon = -Infinity, maxLat = -Infinity;

  features.forEach(feature => {
    const coords = extractCoordinates(feature.geometry.coordinates);
    coords.forEach(([lon, lat]) => {
      minLon = Math.min(minLon, lon);
      minLat = Math.min(minLat, lat);
      maxLon = Math.max(maxLon, lon);
      maxLat = Math.max(maxLat, lat);
    });
  });

  return [minLon, minLat, maxLon, maxLat];
}

function extractCoordinates(coords: any): [number, number][] {
  if (typeof coords[0] === 'number') {
    return [coords];
  }
  return coords.flatMap((c: any) => extractCoordinates(c));
}

function calculateTotalArea(features: GeoJSONFeature[]): number {
  // Simplified area calculation (for polygons)
  let totalArea = 0;
  features.forEach(feature => {
    if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
      // Basic area calculation (not accurate for large areas, but good for demo)
      const coords = feature.geometry.coordinates;
      if (feature.geometry.type === 'Polygon') {
        totalArea += calculatePolygonArea(coords[0]);
      } else {
        coords.forEach((polygon: any) => {
          totalArea += calculatePolygonArea(polygon[0]);
        });
      }
    }
  });
  return totalArea;
}

function calculatePolygonArea(coords: [number, number][]): number {
  // Shoelace formula for polygon area
  let area = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    area += coords[i][0] * coords[i + 1][1];
    area -= coords[i + 1][0] * coords[i][1];
  }
  return Math.abs(area) / 2;
}

function calculateTotalLength(features: GeoJSONFeature[]): number {
  // Simplified length calculation (for LineStrings)
  let totalLength = 0;
  features.forEach(feature => {
    if (feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiLineString') {
      const coords = feature.geometry.coordinates;
      if (feature.geometry.type === 'LineString') {
        totalLength += calculateLineLength(coords);
      } else {
        coords.forEach((line: any) => {
          totalLength += calculateLineLength(line);
        });
      }
    }
  });
  return totalLength;
}

function calculateLineLength(coords: [number, number][]): number {
  let length = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    const [lon1, lat1] = coords[i];
    const [lon2, lat2] = coords[i + 1];
    // Haversine distance
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    length += R * c;
  }
  return length;
}
