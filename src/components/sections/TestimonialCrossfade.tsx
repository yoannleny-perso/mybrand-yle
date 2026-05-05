import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface Testimonial {
  quote: string;
  attribution: string;
}

interface Props {
  testimonials: Testimonial[];
  intervalMs?: number;
}

export default function TestimonialCrossfade({ testimonials, intervalMs = 6000 }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, intervalMs);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, intervalMs, testimonials.length, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div className="flex flex-col gap-16">
        {testimonials.map((t, i) => (
          <figure key={i} className="max-w-3xl mx-auto relative pl-8 border-l border-ink-100">
            <blockquote className="font-display italic text-[length:var(--t-display-m-size)] leading-[var(--t-display-m-line)] tracking-[var(--t-display-m-letter)] text-ink-1000 mb-6">
              <span className="hanging-punctuation">{t.quote}</span>
            </blockquote>
            <figcaption className="font-mono text-[length:var(--t-meta-size)] uppercase tracking-[var(--t-meta-letter)] text-ink-500">
              — {t.attribution}
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }

  return (
    <div 
      className="relative min-h-[400px] flex items-center justify-center cursor-default"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="w-full max-w-4xl relative">
        <AnimatePresence mode="wait">
          <motion.figure
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute top-1/2 -translate-y-1/2 w-full bg-paper-0 p-8 md:p-12 rounded-[var(--radius-card)] shadow-card border border-ink-100"
          >
            <blockquote className="font-display italic font-semibold text-[length:var(--t-display-m-size)] leading-[var(--t-display-m-line)] tracking-[var(--t-display-m-letter)] text-ink-900 mb-8">
              <span style={{ hangingPunctuation: 'first last' as any }}>{testimonials[currentIndex].quote}</span>
            </blockquote>
            <figcaption className="font-mono text-[length:var(--t-meta-size)] uppercase tracking-[var(--t-meta-letter)] text-signal font-bold">
              — {testimonials[currentIndex].attribution}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 right-0 flex gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? 'bg-ink-1000' : 'bg-ink-100 hover:bg-ink-300'}`}
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={i === currentIndex}
          />
        ))}
      </div>
    </div>
  );
}
