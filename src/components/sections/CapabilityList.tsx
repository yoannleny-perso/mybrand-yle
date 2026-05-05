import React, { useState } from 'react';

interface Capability {
  number: string;
  title: string;
  summary: string;
  slug: string;
}

interface Props {
  capabilities: Capability[];
}

export default function CapabilityList({ capabilities }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col border-t border-ink-100 group/list" onMouseLeave={() => setHoveredIndex(null)}>
      {capabilities.map((cap, i) => {
        const isHovered = hoveredIndex === i;
        const isDimmed = hoveredIndex !== null && hoveredIndex !== i;
        
        return (
          <a 
            key={cap.number}
            href={`/capabilities/${cap.slug}`}
            className={`
              relative flex flex-col md:flex-row md:items-center py-6 md:h-24 px-6 md:px-12 
              border-b border-ink-100 transition-all duration-240 ease-out
              ${isHovered ? 'bg-ink-1000 text-paper-50' : 'hover:bg-ink-1000 hover:text-paper-50'}
              ${isDimmed ? 'opacity-40' : 'opacity-100'}
              group/row
            `}
            onMouseEnter={() => setHoveredIndex(i)}
            onFocus={() => setHoveredIndex(i)}
            onBlur={() => setHoveredIndex(null)}
          >
            <div className="font-mono text-[length:var(--t-meta-size)] uppercase md:w-24 opacity-60 md:opacity-100 mb-2 md:mb-0">
              {cap.number}
            </div>
            <div className="font-display text-[length:var(--t-display-m-size)] md:text-[length:var(--t-headline-size)] md:w-1/3 mb-2 md:mb-0">
              {cap.title}
            </div>
            <div className="font-body text-[length:var(--t-body-s-size)] md:w-1/2 opacity-70 group-hover/row:opacity-100 transition-opacity">
              {cap.summary}
            </div>
            
            <div className="hidden md:flex ml-auto font-mono items-center justify-center w-8 h-8 opacity-0 group-hover/row:opacity-100 transition-opacity duration-240">
              &rarr;
            </div>

            {/* Preview Image placeholder */}
            <div 
              className={`
                hidden md:block absolute right-24 top-1/2 -translate-y-1/2 w-48 h-16 bg-ink-900 border border-ink-700
                transition-all duration-320 pointer-events-none
                ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
              `}
            >
              <div className="w-full h-full opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]"></div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
