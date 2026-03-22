import React from 'react';
import { BookOpen } from 'lucide-react';

const PLACEHOLDER_COLORS = [
  'from-slate-700 to-slate-900',
  'from-indigo-700 to-indigo-900',
  'from-emerald-700 to-emerald-900',
  'from-rose-700 to-rose-900',
  'from-amber-700 to-amber-900',
  'from-cyan-700 to-cyan-900',
  'from-blue-700 to-blue-900',
];

function getPlaceholderGradient(id: string | number): string {
  const strId = String(id || 'default');
  const hash = strId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return PLACEHOLDER_COLORS[hash % PLACEHOLDER_COLORS.length];
}

interface BookCoverPlaceholderProps {
  title: string;
  author: string;
  id: string | number;
  variant?: 'sm' | 'md' | 'lg';
}

export const BookCoverPlaceholder: React.FC<BookCoverPlaceholderProps> = ({ 
  title, 
  author, 
  id, 
  variant = 'md' 
}) => {
  const isSm = variant === 'sm';
  const isLg = variant === 'lg';

  return (
    <div className={`w-full h-full relative flex flex-col items-center justify-between ${isSm ? 'p-2' : 'p-5'} bg-gradient-to-br ${getPlaceholderGradient(id)} overflow-hidden`}>
      {/* Book spine effect */}
      <div className={`absolute left-0 top-0 bottom-0 ${isSm ? 'w-0.5' : 'w-1.5'} bg-white/10 shadow-[1px_0_3px_rgba(0,0,0,0.3)]`} />
      {!isSm && <div className="absolute left-2 top-0 bottom-0 w-px bg-white/5" />}
      
      <div className={`w-full flex justify-center ${isSm ? 'mt-0.5' : 'mt-2'}`}>
        <div className={`${isSm ? 'p-1' : 'p-2'} rounded-full bg-white/10 backdrop-blur-sm border border-white/20`}>
          <BookOpen className={`${isSm ? 'w-3 h-3' : 'w-6 h-6'} text-white/80`} />
        </div>
      </div>
      
      <div className={`w-full ${isSm ? 'space-y-0.5' : 'space-y-3'} z-10 text-center`}>
        <h4 className={`${isSm ? 'text-[8px]' : 'text-sm sm:text-base'} font-serif font-bold text-white leading-tight line-clamp-3 drop-shadow-md px-1`}>
          {title}
        </h4>
        {!isSm && <div className="w-8 h-px bg-white/30 mx-auto" />}
        <p className={`${isSm ? 'text-[6px]' : 'text-[10px] sm:text-xs'} font-medium text-white/70 uppercase tracking-widest truncate w-full px-1`}>
          {author}
        </p>
      </div>
      
      {!isSm && (
        <div className="w-full flex justify-center mb-2">
          <span className="text-[8px] font-bold text-white/30 tracking-tighter uppercase border border-white/20 px-1.5 py-0.5 rounded">
            BiblioTech Edition
          </span>
        </div>
      )}
    </div>
  );
};
