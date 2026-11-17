import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Check, ChevronDown, Globe } from 'lucide-react';

export function LanguageSelector() {
  const { lang, setLang, languages } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === lang) ?? languages[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white/[0.04] border border-white/5 rounded-lg px-3 py-2 text-sm text-gray-300 hover:border-cyan-500/30 transition-colors min-w-[140px]"
      >
        <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
        <span className="text-base leading-none">{current.flag}</span>
        <span className="flex-1 text-start truncate">{current.nativeName}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full mt-2 end-0 w-52 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-sm transition-colors ${
                l.code === lang
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'text-gray-400 hover:bg-white/[0.04] hover:text-white'
              }`}
            >
              <span className="text-base leading-none shrink-0">{l.flag}</span>
              <span className="flex-1 text-start truncate">{l.nativeName}</span>
              {l.rtl && (
                <span className="text-[9px] uppercase tracking-wider bg-white/5 text-gray-500 px-1.5 py-0.5 rounded">RTL</span>
              )}
              {l.code === lang && <Check className="w-4 h-4 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
