'use client';

import { useEffect } from 'react';
import { GISDashboard } from '@/components/GISDashboard';

export default function DashboardPage() {
  useEffect(() => {
    // Fetch initial data when component mounts
    fetch('/api/water-quality')
      .then(res => res.json())
      .then(data => {
        // Data will be handled by components that use the store
      })
      .catch(err => console.error('Failed to fetch water quality data:', err));
  }, []);

  return <GISDashboard />;
}
