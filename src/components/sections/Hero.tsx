import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HeroProps {
  headlineLines: string[];
  subheadline: string;
}

export default function Hero({ headlineLines, subheadline }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const getTransition = (delayMs: number, durationMs: number, spring = false) => ({
    duration: shouldReduceMotion ? 0 : durationMs / 1000,
    delay: shouldReduceMotion ? 0 : delayMs / 1000,
    ease: spring ? [0.175, 0.885, 0.32, 1.1] : [0.16, 1, 0.3, 1]
  });

  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden" aria-labelledby="hero-heading">
      {/* Ambient Blur Backgrounds */}
      <motion.div 
        className="ambient-blur top-[-10%] left-[-10%]"
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

      <div className="mx-auto w-full px-6 sm:px-12 lg:px-[max(96px,8vw)] max-w-[1440px] relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content Area */}
        <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={getTransition(200, 600)}
            className="mb-8"
          >
            <span className="inline-block py-2 px-4 rounded-full bg-paper-0 border border-ink-100 shadow-sm text-[length:var(--t-meta-size)] font-semibold tracking-wide text-signal uppercase">
              Available Q1 2026
            </span>
          </motion.div>

          <h1 id="hero-heading" className="font-display text-[length:var(--t-display-l-size)] leading-[var(--t-display-l-line)] tracking-[var(--t-display-l-letter)] font-[var(--t-display-l-weight)] mb-8 text-ink-900">
            {headlineLines.map((line, i) => (
              <motion.span 
                key={i}
                className="block"
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={getTransition(300 + (i * 150), 800, true)}
              >
                {line}
              </motion.span>
            ))}
          </h1>
          
          <motion.div 
            className="font-body text-[length:var(--t-body-l-size)] leading-[var(--t-body-l-line)] text-ink-500 max-w-xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={getTransition(800, 600)}
          >
            {subheadline}
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 font-medium text-[length:var(--t-body-s-size)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={getTransition(1000, 600)}
          >
            <a href="/work" className="bg-ink-1000 text-paper-0 px-8 py-4 rounded-full hover:shadow-hover hover:-translate-y-1 transition-all duration-300">
              See the work
            </a>
            <a href="#about" className="text-ink-700 hover:text-ink-1000 transition-colors py-4">
              Read my approach
            </a>
          </motion.div>
        </div>

        {/* Right Portrait Area */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end relative h-[500px] lg:h-[700px] w-full">
          <motion.div 
            className="relative w-full max-w-[400px] lg:max-w-none h-full"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={getTransition(400, 1000, true)}
          >
            <div className="absolute inset-0 rounded-[40px] overflow-hidden bg-paper-0 shadow-card border border-ink-100">
              <motion.img 
                src="/images/portrait.jpeg" 
                alt="Yoann Leny Portrait" 
                className="w-full h-full object-cover object-top"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={getTransition(0, 2000)}
              />
              {/* Fade out bottom mask */}
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-paper-0 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Floating badge */}
            <motion.div 
              className="absolute -bottom-6 -left-6 lg:-left-12 bg-paper-0 p-6 rounded-[24px] shadow-hover border border-ink-100 backdrop-blur-xl"
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={getTransition(1200, 600, true)}
            >
              <div className="text-[length:var(--t-meta-size)] uppercase tracking-[var(--t-meta-letter)] font-semibold text-ink-500 mb-1">
                VP, Data Operations
              </div>
              <div className="text-[length:var(--t-body-s-size)] font-semibold text-ink-900">
                Agentic AI Architect
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
