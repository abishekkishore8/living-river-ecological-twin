'use client';

import { RiverHealthGauge } from './widgets/RiverHealthGauge';
import { WaterQualityChart } from './widgets/WaterQualityChart';
import { BiodiversityRadial } from './widgets/BiodiversityRadial';
import { CommunityFeed } from './widgets/CommunityFeed';
import { SpeciesDetailDrawer } from './SpeciesDetailDrawer';

export function DataPanel() {
  return (
    <>
      <div 
        className="w-[300px] h-full glass-dark border-l overflow-y-auto"
        style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        <div className="p-4 space-y-4">
          <RiverHealthGauge />
          <WaterQualityChart />
          <BiodiversityRadial />
          <CommunityFeed />
        </div>
      </div>
      <SpeciesDetailDrawer />
    </>
  );
}
