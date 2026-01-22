# Living River - Quick Reference Guide

## 🚀 Getting Started

### Installation
```bash
npm install
npm run dev
```

Navigate to `http://localhost:3000`

---

## 📍 Main Pages

| Page | URL | Description |
|------|-----|-------------|
| Homepage | `/home` | Hero section with 3D canvas |
| Dashboard (Basic) | `/dashboard` | Traditional GIS dashboard |
| Dashboard (Advanced) | `/dashboard` → Click "Advanced" | D3.js powered GIS portal |

---

## 🗺️ Advanced GIS Portal

### Quick Start
1. Go to `/dashboard`
2. Click **"Advanced"** button in header
3. Portal loads with India map

### Upload Data
- Click **"Upload Data"** button
- Select `.geojson`, `.json`, or `.csv` file
- Confirm success message

### CSV Format Example
```csv
name,lat,lon,value
Haridwar,29.9457,77.7064,85
Varanasi,25.3268,82.9989,92
```

### Map Controls
| Control | Action |
|---------|--------|
| +/- Buttons | Zoom |
| Click & Drag | Pan |
| Reset Button | Return to default view |
| Map/Satellite/Terrain | Change basemap |

---

## 📊 Statistics Features

### Health Score Colors
- 🟢 **Green (80+)**: Excellent
- 🟡 **Yellow (60-80)**: Good  
- 🔴 **Red (<60)**: Fair

### Monitoring Stations
| Station | Location | Score |
|---------|----------|-------|
| Haridwar | North India | 85 |
| Jaipur | Rajasthan | 72 |
| Agra | UP | 68 |
| Varanasi | UP (Uttar Pradesh) | 92 |
| Jabalpur | Madhya Pradesh | 75 |
| Kolkata | West Bengal | 65 |

---

## 💾 Data Formats

### GeoJSON
```json
{
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [longitude, latitude]
    },
    "properties": {
      "name": "Location Name",
      "value": 85
    }
  }]
}
```

### CSV
```
name,lat,lon,value
Monitoring Point 1,25.5,78.5,80
Monitoring Point 2,26.0,79.0,75
```

---

## 🔧 Configuration

### Change Default Map Center
Edit `AdvancedGISPortal.tsx`:
```typescript
const projection = d3.geoMercator()
  .center([78.5, 25])      // [longitude, latitude]
  .scale(1200)
  .translate([width / 2, height / 2]);
```

### Add Monitoring Stations
Edit the `riverData` array:
```typescript
const [riverData] = useState<GeoPoint[]>([
  { lat: 25.3268, lon: 82.9989, name: 'Station', value: 85 },
  // Add more...
]);
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AdvancedGISPortal.tsx    ← New GIS portal
│   ├── GISDashboard.tsx         ← Updated with dual modes
│   ├── MapCanvas.tsx            ← Canvas-based map
│   ├── LayerPanel.tsx           ← Layer controls
│   └── ...
├── app/
│   ├── dashboard/page.tsx       ← Dashboard route
│   ├── home/page.tsx            ← Homepage
│   └── ...
└── data/
    └── waterQualityData.ts
```

---

## 🎯 Key Features

### Basic Mode (Default)
- Layer panel with controls
- Canvas-based rendering
- Data widgets
- Real-time monitoring

### Advanced Mode (New)
- D3.js interactive mapping
- Free basemaps (OSM, Satellite, Terrain)
- Shapefile/CSV upload
- Statistics panel
- Zoom/pan controls

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview |
| `ADVANCED_GIS_PORTAL.md` | GIS portal guide |
| `IMPLEMENTATION_SUMMARY.md` | Technical details |
| `DEVELOPER_HANDOFF.md` | Developer guide |
| `DEPLOYMENT_GUIDE.md` | Deployment info |

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Map doesn't display | Check browser console for errors |
| CSV not loading | Verify column names (lat, lon) |
| Data points invisible | Check coordinates are in bounds |
| Slow performance | Reduce number of data points |
| Upload fails | Verify file format (GeoJSON/CSV) |

---

## 📦 Dependencies

### Core
- `next` - React framework
- `react` - UI library
- `typescript` - Type safety
- `d3` - Visualization

### New GIS Libraries
- `d3-geo` - Geospatial projections
- `papaparse` - CSV parsing
- `shapefile` - Shapefile support

---

## 🌐 Free Resources

- **Maps**: OpenStreetMap (free, available worldwide)
- **Projections**: D3.js (open-source)
- **Icons**: Lucide React (free)
- **Styling**: Tailwind CSS (free)

---

## ✅ Quality Checklist

Before deploying:
- [ ] Test map loads correctly
- [ ] Basemaps switch properly
- [ ] Data upload works
- [ ] Statistics display correctly
- [ ] Zoom/pan functions smoothly
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Export functionality works

---

## 🔗 Useful Links

- **OpenStreetMap**: https://www.openstreetmap.org/
- **GeoJSON**: https://geojson.org/
- **D3.js**: https://d3js.org/
- **Next.js**: https://nextjs.org/

---

**Last Updated**: January 21, 2026  
**Status**: Production Ready ✅
