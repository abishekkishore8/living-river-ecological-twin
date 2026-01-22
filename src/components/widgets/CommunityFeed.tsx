import { MessageCircle, User, Clock } from 'lucide-react';

interface FeedItem {
  id: string;
  user: string;
  time: string;
  message: string;
  type: 'observation' | 'alert' | 'report';
}

export function CommunityFeed() {
  const feedItems: FeedItem[] = [
    {
      id: '1',
      user: 'Dr. S A Hussain',
      time: '2h ago',
      message: 'Dolphin sighting near Varanasi ghat. Group of 3 individuals observed.',
      type: 'observation'
    },
    {
      id: '2',
      user: 'River Monitor',
      time: '4h ago',
      message: 'Water quality alert: Elevated turbidity levels detected at Station K-12.',
      type: 'alert'
    },
    {
      id: '3',
      user: 'Conservation Team',
      time: '6h ago',
      message: 'Successful gharial nest protection initiative completed.',
      type: 'report'
    },
    {
      id: '4',
      user: 'Local Volunteer',
      time: '8h ago',
      message: 'Turtle nesting site identified near Haridwar stretch.',
      type: 'observation'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'observation':
        return '#00E6B8';
      case 'alert':
        return '#FFB020';
      case 'report':
        return '#3CFF9E';
      default:
        return '#9CCFD8';
    }
  };

  return (
    <div className="glass rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>
          Community Feed
        </h3>
        <MessageCircle className="w-4 h-4" style={{ color: 'var(--accent-teal)' }} />
      </div>
      
      <div className="space-y-3">
        {feedItems.map((item) => (
          <div 
            key={item.id}
            className="p-3 rounded-lg border hover:bg-white/5 transition-colors cursor-pointer"
            style={{ 
              borderColor: 'rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(0, 0, 0, 0.2)'
            }}
          >
            <div className="flex items-start gap-2 mb-2">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(0, 230, 184, 0.2)' }}
              >
                <User className="w-3 h-3" style={{ color: 'var(--accent-teal)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                    {item.user}
                  </span>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Clock className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
                    <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                      {item.time}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {item.message}
                </p>
                <div className="mt-2">
                  <span 
                    className="text-[9px] px-2 py-0.5 rounded uppercase tracking-wide"
                    style={{ 
                      backgroundColor: `${getTypeColor(item.type)}20`,
                      color: getTypeColor(item.type)
                    }}
                  >
                    {item.type}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        className="w-full mt-3 py-2 rounded-lg border hover:bg-white/5 transition-colors text-[12px]"
        style={{ 
          borderColor: 'var(--accent-teal)',
          color: 'var(--accent-teal)'
        }}
      >
        View All Updates
      </button>
    </div>
  );
}
