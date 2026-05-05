import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HeroProps {
  headlineLines: string[];
  subheadline: string;
}

export default function Hero({ headlineLines, subheadline }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const getTransition = (delayMs: number, durationMs: number) => ({
    duration: shouldReduceMotion ? 0 : durationMs / 1000,
    delay: shouldReduceMotion ? 0 : delayMs / 1000,
    ease: [0.16, 1, 0.3, 1] // var(--ease-out)
  });

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 z-0 w-full h-full flex justify-end">
        <motion.div 
          className="w-2/3 h-full bg-ink-100 relative"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={getTransition(0, 800)}
        >
          {/* Placeholder for portrait */}
          <div className="absolute inset-0 bg-ink-100 opacity-50 mix-blend-multiply"></div>
          <div className="absolute inset-0 border border-ink-100"></div>
        </motion.div>
      </div>

      <div className="mx-auto w-full px-6 sm:px-12 lg:px-[max(96px,8vw)] max-w-[1440px] relative z-10 flex flex-col justify-between h-[calc(100vh-80px)] py-12">
        
        <div className="flex justify-between items-start text-[length:var(--t-meta-size)] uppercase tracking-[var(--t-meta-letter)] font-mono font-medium text-ink-500">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={getTransition(880, 480)}
          >
            <div className="mb-1">01 / 08</div>
            <div className="mb-1">ESTABLISHED IN BORDEAUX</div>
            <div>AVAILABLE Q1 2026</div>
          </motion.div>
          
          <motion.div 
            className="text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={getTransition(880, 480)}
          >
            <div className="mb-1">VP, DATA OPERATIONS</div>
            <div>AGENTIC AI ARCHITECT</div>
          </motion.div>
        </div>

        <div className="max-w-4xl mt-auto mb-32">
          <h1 id="hero-heading" className="font-display text-[length:var(--t-display-xl-size)] leading-[var(--t-display-xl-line)] tracking-[var(--t-display-xl-letter)] font-[var(--t-display-xl-weight)] mb-8">
            {headlineLines.map((line, i) => (
              <motion.span 
                key={i}
                className="block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={getTransition(320 + (i * 120), 720)}
              >
                {line}
              </motion.span>
            ))}
          </h1>
          
          <motion.div 
            className="font-body text-[length:var(--t-body-l-size)] leading-[var(--t-body-l-line)] font-light max-w-2xl mb-12 text-ink-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={getTransition(720, 600)}
          >
            {subheadline}
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-8 font-mono text-[length:var(--t-meta-size)] uppercase tracking-[var(--t-meta-letter)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={getTransition(880, 480)}
          >
            <a href="/work" className="bg-ink-1000 text-paper-50 px-6 py-4 hover:bg-ink-700 transition-colors">See the work &rarr;</a>
            <a href="#about" className="text-ink-1000 hover:text-ink-500 transition-colors border-b border-transparent hover:border-ink-500 pb-1">Read my approach</a>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-12 right-6 sm:right-12 lg:right-[max(96px,8vw)] font-mono text-[length:var(--t-meta-size)] uppercase tracking-[var(--t-meta-letter)] text-ink-500 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={getTransition(880, 480)}
        >
          SCROLL &middot; 02 / 08 &middot; ABOUT
        </motion.div>

      </div>
    </section>
  );
}
