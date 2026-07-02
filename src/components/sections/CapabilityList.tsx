import React, { useState } from 'react';

interface Capability {
  number: string;
  title: string;
  summary: string;
  slug: string;
}

interface Props {
  capabilities: Capability[];
  basePath?: string;
}

export default function CapabilityList({ capabilities, basePath = '/capabilities' }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col border-t border-ink-100 group/list" onMouseLeave={() => setHoveredIndex(null)}>
      {capabilities.map((cap, i) => {
        const isHovered = hoveredIndex === i;
        const isDimmed = hoveredIndex !== null && hoveredIndex !== i;
        
        return (
          <a 
            key={cap.number}
            href={`${basePath}#${cap.slug}`}
            className={`
              relative flex flex-col md:flex-row md:items-center py-6 md:h-28 px-6 md:px-12 
              border-b border-ink-100 transition-all duration-300 ease-out mb-2 rounded-[24px]
              ${isHovered ? 'bg-signal text-paper-0 shadow-hover scale-[1.01] z-10 border-transparent' : 'bg-transparent text-ink-1000'}
              ${isDimmed ? 'opacity-40 scale-[0.98]' : 'opacity-100'}
              group/row
            `}
            onMouseEnter={() => setHoveredIndex(i)}
            onFocus={() => setHoveredIndex(i)}
            onBlur={() => setHoveredIndex(null)}
          >
            <div className="font-mono text-[length:var(--t-meta-size)] uppercase md:w-24 opacity-60 md:opacity-100 mb-2 md:mb-0">
              {cap.number}
            </div>
            <div className="font-display font-bold text-[length:var(--t-display-m-size)] md:text-[length:var(--t-headline-size)] md:w-1/3 mb-2 md:mb-0">
              {cap.title}
            </div>
            <div className={`font-body text-[length:var(--t-body-s-size)] md:w-1/2 transition-opacity ${isHovered ? 'text-paper-50 opacity-90' : 'text-ink-500'}`}>
              {cap.summary}
            </div>
            
            <div className="hidden md:flex ml-auto font-mono items-center justify-center w-8 h-8 opacity-0 group-hover/row:opacity-100 transition-opacity duration-240">
              &rarr;
            </div>
          </a>
        );
      })}
    </div>
  );
}
