import { useState } from 'react';
import { Homepage } from './components/Homepage';
import { GISDashboard } from './components/GISDashboard';

type Page = 'home' | 'dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {currentPage === 'home' ? (
        <Homepage onNavigateToDashboard={() => setCurrentPage('dashboard')} />
      ) : (
        <GISDashboard onNavigateToHome={() => setCurrentPage('home')} />
      )}
    </div>
  );
}
