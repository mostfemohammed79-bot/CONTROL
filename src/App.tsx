import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { PageId } from '@/types';

import { supabase } from '@/lib/supabase';
import { Auth } from '@/pages/Auth';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { Dashboard } from '@/pages/Dashboard';
import { Videos } from '@/pages/Videos';
import { Comments } from '@/pages/Comments';
import { Ideas } from '@/pages/Ideas';
import { Analytics } from '@/pages/Analytics';
import { Settings } from '@/pages/Settings';
import { comments } from '@/data/sampleData';

function App() {
  const [page, setPage] = useState<PageId>('dashboard');
  const [showUpload, setShowUpload] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);


  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('Session error:', error.message);
      }

      setSession(data.session);
      setCheckingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setCheckingSession(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const pendingCount = comments.filter(
    (c) => c.replyStatus === 'pending'
  ).length;

  const handleQuickAction = () => {
    if (page === 'videos') {
      setShowUpload(true);
    } else {
      setPage('videos');
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-cyan-400">
        Loading CONTROL...
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden">
      <Sidebar
        active={page}
        onNavigate={setPage}
        pendingCount={pendingCount}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar page={page} onQuickAction={handleQuickAction} />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-sm text-zinc-400 hover:text-cyan-400"
            >
              Sign Out
            </button>
          </div>

          {page === 'dashboard' && <Dashboard onNavigate={setPage} />}
          {page === 'videos' && <Videos />}
          {page === 'comments' && <Comments />}
          {page === 'ideas' && <Ideas />}
          {page === 'analytics' && <Analytics />}
          {page === 'settings' && <Settings />}
        </main>
      </div>

      {showUpload && page === 'videos' && (
        <UploadTrigger onClose={() => setShowUpload(false)} />
      )}
    </div>
  );
}

function UploadTrigger({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-cyan-500/30 rounded-xl p-4 shadow-xl shadow-cyan-500/10 max-w-xs">
      <p className="text-sm text-white font-medium mb-1">
        Upload a Video
      </p>
      <p className="text-xs text-gray-500 mb-3">
        Click the Upload tab to drag and drop your file.
      </p>
      <button
        onClick={onClose}
        className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        Dismiss
      </button>
    </div>
  );
}

export default App;

