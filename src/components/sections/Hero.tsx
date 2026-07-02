import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HeroProps {
  headlineLines?: string[];
  subheadline: string;
  eyebrow?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  identity?: { name: string; line: string; href: string };
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Primary CTA with a subtle magnetic pull toward the cursor. */
function MagneticLink({ href, children }: { href: string; children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * 0.18, y: y * 0.3 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="inline-flex items-center gap-2 bg-ink-1000 text-paper-0 px-8 py-4 rounded-full text-[15px] font-semibold hover:bg-signal transition-colors duration-300"
    >
      {children}
    </motion.a>
  );
}

export default function Hero({
  headlineLines = ['Building', 'AI-Enabled Operating Systems', 'for Modern Organizations.'],
  subheadline,
  eyebrow = 'Operator. Architect. Builder.',
  primaryCta = { label: "Let's talk", href: '/contact' },
  secondaryCta = { label: 'Explore work', href: '/work' },
  identity = { name: 'Yoann Leny', line: 'VP Data & AI Operations · Bordeaux, FR', href: '/about' },
}: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const lineTransition = (i: number) => ({
    duration: shouldReduceMotion ? 0 : 0.9,
    delay: shouldReduceMotion ? 0 : 0.15 + i * 0.12,
    ease: EASE,
  });

  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden bg-paper-50 pt-32 md:pt-36 pb-12"
      aria-labelledby="hero-heading"
    >
      {/* Ambient light, static and quiet */}
      <motion.div
        className="ambient-blur top-[-10%] left-[-15%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: shouldReduceMotion ? 0 : 1.6, ease: 'easeOut' }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center">
        <motion.p
          className="font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-500 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={lineTransition(0)}
        >
          {eyebrow}
        </motion.p>

        <h1
          id="hero-heading"
          className="font-display font-black text-ink-1000 tracking-[-0.03em] leading-[1.05] mb-8"
          style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)' }}
        >
          {headlineLines.map((line, i) => (
            <span key={i} className="block overflow-hidden py-[0.08em] -my-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={lineTransition(i)}
              >
                {i === 1 ? <span className="text-signal">{line}</span> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="font-body text-[1.125rem] md:text-[1.25rem] leading-[1.7] text-ink-700 max-w-[52ch] mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={lineTransition(headlineLines.length)}
        >
          {subheadline}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={lineTransition(headlineLines.length + 1)}
        >
          <MagneticLink href={primaryCta.href}>
            {primaryCta.label} <span aria-hidden="true">→</span>
          </MagneticLink>
          <a
            href={secondaryCta.href}
            className="font-mono text-[13px] font-bold uppercase tracking-[0.12em] text-ink-900 border-b-2 border-signal pb-1 hover:text-signal transition-colors duration-200"
          >
            {secondaryCta.label} <span aria-hidden="true">→</span>
          </a>
        </motion.div>

        {/* Identity card: a face on the first screen */}
        <motion.a
          href={identity.href}
          className="group mt-10 inline-flex items-center gap-4 bg-paper-0 border border-ink-100 rounded-full pl-2 pr-6 py-2 shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={lineTransition(headlineLines.length + 2)}
        >
          <span className="block w-12 h-12 rounded-full overflow-hidden border border-ink-100 shrink-0">
            <img
              src="/images/portrait.jpeg"
              alt={identity.name}
              className="w-full h-full object-cover grayscale contrast-[1.05] group-hover:grayscale-0 transition-all duration-500"
              style={{ objectPosition: '50% 22%' }}
            />
          </span>
          <span className="flex flex-col items-start text-left">
            <span className="font-display font-bold text-[0.9375rem] leading-tight text-ink-1000">{identity.name}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-500 leading-snug">{identity.line}</span>
          </span>
        </motion.a>
      </div>
    </section>
  );
}
