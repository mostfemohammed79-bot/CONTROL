import { useState } from 'react';
import type { ContentIdea } from '@/types';
import { contentIdeas as initialIdeas } from '@/data/sampleData';
import { Bookmark, BookmarkCheck, Sparkles, TrendingUp, Hash, Film, RefreshCw, X } from 'lucide-react';

export function Ideas() {
  const [ideas, setIdeas] = useState<ContentIdea[]>(initialIdeas);
  const [selected, setSelected] = useState<ContentIdea | null>(null);
  const [generating, setGenerating] = useState(false);

  const toggleSave = (id: string) => {
    setIdeas(ideas.map((i) => (i.id === id ? { ...i, saved: !i.saved } : i)));
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const newIdea: ContentIdea = {
        id: `i${Date.now()}`,
        title: 'The 80/20 Rule Applied to Content Creation',
        hook: '80% of your results come from 20% of your effort. Here is how to find that 20%.',
        format: 'Talking head + B-roll examples',
        hashtags: ['#8020rule', '#contentcreation', '#efficiency', '#fyp'],
        estimatedReach: '45K - 110K',
        confidence: 85,
        saved: false,
      };
      setIdeas([newIdea, ...ideas]);
      setGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-cyan-500/10 via-blue-600/5 to-transparent border border-cyan-500/20 rounded-xl p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">AI Content Generator</h3>
              <p className="text-sm text-gray-400 mt-1 max-w-md">
                Concepts are generated from your niche, past performance, and trending topics.
                This is a prototype — suggestions are sample data, not live AI output.
              </p>
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-sm px-4 py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
            {generating ? 'Generating...' : 'Generate New Idea'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="bg-white/[0.03] border border-white/5 rounded-xl p-5 hover:border-cyan-500/30 transition-all duration-300 group flex flex-col"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h4 className="text-base font-semibold text-white leading-tight">{idea.title}</h4>
              <button
                onClick={() => toggleSave(idea.id)}
                className={`shrink-0 p-1.5 rounded-lg transition-colors ${
                  idea.saved ? 'text-cyan-400 hover:bg-cyan-500/10' : 'text-gray-600 hover:text-gray-400 hover:bg-white/5'
                }`}
              >
                {idea.saved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
              </button>
            </div>

            <p className="text-sm text-gray-400 italic mb-4 flex-1">"{idea.hook}"</p>

            <div className="flex items-center gap-3 flex-wrap mb-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5" />
                {idea.format}
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                {idea.estimatedReach}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {idea.hashtags.map((tag) => (
                <span key={tag} className="text-xs text-cyan-400/80 bg-cyan-500/[0.06] px-2 py-0.5 rounded-md flex items-center gap-0.5">
                  <Hash className="w-2.5 h-2.5" />
                  {tag.replace('#', '')}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"
                    style={{ width: `${idea.confidence}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{idea.confidence}% confidence</span>
              </div>
              <button
                onClick={() => setSelected(idea)}
                className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected && <IdeaDetail idea={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function IdeaDetail({ idea, onClose }: { idea: ContentIdea; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Idea Details</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-white">{idea.title}</h4>
          </div>
          <div>
            <p className="text-xs text-cyan-400 font-medium uppercase tracking-wider mb-1">Hook</p>
            <p className="text-sm text-gray-300 italic">"{idea.hook}"</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-cyan-400 font-medium uppercase tracking-wider mb-1">Format</p>
              <p className="text-sm text-gray-300">{idea.format}</p>
            </div>
            <div>
              <p className="text-xs text-cyan-400 font-medium uppercase tracking-wider mb-1">Est. Reach</p>
              <p className="text-sm text-gray-300">{idea.estimatedReach}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-cyan-400 font-medium uppercase tracking-wider mb-2">Hashtags</p>
            <div className="flex flex-wrap gap-1.5">
              {idea.hashtags.map((tag) => (
                <span key={tag} className="text-sm text-cyan-400 bg-cyan-500/[0.08] px-2.5 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-cyan-400 font-medium uppercase tracking-wider mb-1">Confidence Score</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"
                  style={{ width: `${idea.confidence}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-cyan-400">{idea.confidence}%</span>
            </div>
          </div>
          <div className="pt-2">
            <button
              onClick={() => { alert('Demo: This would send the idea to your Videos tab as a draft. Prototype only.'); onClose(); }}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-sm px-4 py-2.5 rounded-lg transition-all duration-200"
            >
              Send to Video Drafts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
