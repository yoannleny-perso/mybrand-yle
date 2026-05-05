import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HeroProps {
  headlineLines?: string[];
  subheadline: string;
}

export default function Hero({ subheadline }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const getTransition = (delayMs: number, durationMs: number) => ({
    duration: shouldReduceMotion ? 0 : durationMs / 1000,
    delay: shouldReduceMotion ? 0 : delayMs / 1000,
    ease: [0.16, 1, 0.3, 1]
  });

  return (
    <section className="relative min-h-screen flex items-end justify-center pt-32 overflow-hidden bg-paper-50" aria-labelledby="hero-heading">
      
      {/* Huge Background Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 tracking-tighter mt-12 md:mt-0">
        <motion.div 
          className="text-[18vw] leading-[0.8] font-display font-black text-ink-1000"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={getTransition(100, 1000)}
        >
          AGENTIC
        </motion.div>
        <motion.div 
          className="text-[18vw] leading-[0.8] font-display font-black text-ink-1000"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={getTransition(300, 1000)}
        >
          ARCHITECT
        </motion.div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 h-full flex flex-col items-center justify-end">
        
        {/* Left Side: Circular Badge */}
        <motion.div 
          className="absolute left-6 md:left-12 lg:left-24 bottom-24 md:bottom-32 hidden md:flex items-center justify-center w-32 h-32"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={getTransition(800, 800)}
        >
          <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
              <text className="font-mono text-[9.5px] uppercase tracking-[0.25em] fill-ink-900 font-bold">
                <textPath href="#circlePath" startOffset="0%">
                  AVAILABLE Q1 2026 • AVAILABLE Q1 2026 •
                </textPath>
              </text>
            </svg>
          </div>
          {/* Star Icon in center */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-signal">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
          </svg>
        </motion.div>

        {/* Right Side: Bio Text */}
        <motion.div 
          className="absolute right-6 md:right-12 lg:right-24 bottom-24 md:bottom-32 max-w-[280px] text-ink-900 font-medium text-[length:var(--t-body-s-size)] leading-relaxed bg-paper-50/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-4 md:p-0 rounded-2xl md:rounded-none text-center md:text-left"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={getTransition(800, 800)}
        >
          <p>{subheadline}</p>
          <a href="/work" className="inline-block mt-6 border-b border-ink-1000 pb-1 font-bold hover:text-signal hover:border-signal transition-colors uppercase tracking-widest text-[11px]">
            Explore Work
          </a>
        </motion.div>

        {/* Center Headshot */}
        <motion.div 
          className="relative w-full max-w-[600px] lg:max-w-[800px] h-[65vh] lg:h-[80vh] flex justify-center items-end"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={getTransition(400, 1200)}
        >
          <img 
            src="/images/Yoann-headshot.png" 
            alt="Yoann Leny" 
            className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] relative z-10"
          />
          {/* Gradient fade to blend the bottom smoothly into the background */}
          <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 bg-gradient-to-t from-paper-50 to-transparent pointer-events-none z-20"></div>
        </motion.div>

      </div>
    </section>
  );
}
