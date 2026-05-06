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
    <section className="relative min-h-[85vh] flex flex-col justify-end pt-32 overflow-hidden bg-paper-50" aria-labelledby="hero-heading">
      
      {/* Ambient Blur Backgrounds */}
      <motion.div 
        className="ambient-blur top-[10%] left-[-10%]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={getTransition(0, 1500)}
      />
      <motion.div 
        className="ambient-blur bottom-[-20%] right-[-10%]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={getTransition(400, 1500)}
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 flex flex-col items-center justify-end h-full">

        {/* Top Text / Bio - moved ABOVE the photo to avoid overlap */}
        <motion.div 
          className="max-w-[500px] text-center mb-8 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={getTransition(400, 800)}
        >
          <h1 className="font-display text-[length:var(--t-headline-size)] font-bold text-ink-900 mb-4">
            Hi, I'm Yoann Leny.
          </h1>
          <p className="text-ink-700 font-medium text-[length:var(--t-body-size)] leading-relaxed">
            {subheadline}
          </p>
          <a href="/work" className="inline-block mt-4 border-b border-ink-1000 pb-1 font-bold hover:text-signal hover:border-signal transition-colors uppercase tracking-widest text-[13px]">
            Explore Work
          </a>
        </motion.div>

        {/* The Huge Text and Image Container */}
        <div className="relative w-full flex justify-center items-end mt-4">
          
          {/* Left Text: AGENTIC */}
          <motion.div 
            className="hidden md:block absolute left-[5%] top-[30%] -translate-y-1/2 text-[10vw] leading-[0.8] font-display font-black text-ink-1000 z-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={getTransition(600, 1000)}
          >
            AGENTIC
          </motion.div>

          {/* Right Text: ARCHITECT */}
          <motion.div 
            className="hidden md:block absolute right-[5%] top-[30%] -translate-y-1/2 text-[10vw] leading-[0.8] font-display font-black text-ink-1000 z-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={getTransition(800, 1000)}
          >
            ARCHITECT
          </motion.div>

          {/* Center Headshot */}
          <motion.div 
            className="relative w-full max-w-[400px] lg:max-w-[500px] flex justify-center items-end z-10"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={getTransition(200, 1200)}
          >
            <img 
              src="/images/Yoann-headshot.png" 
              alt="Yoann Leny" 
              className="w-full h-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] relative z-10"
            />
            {/* Gradient fade to blend the bottom smoothly into the background */}
            <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-paper-50 to-transparent pointer-events-none z-20"></div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
