import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function ButtercupFlower({ className = '', size = 80, muted = false }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path d="M61 60 Q72 89 60 118" stroke="#87977a" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M64 88 Q90 77 98 91 Q75 103 64 88Z" fill="#a4b698" />
      <path d="M61 96 Q41 79 27 93 Q42 109 61 96Z" fill="#a4b698" />
      {[0, 72, 144, 216, 288].map(angle => (
        <ellipse key={angle} cx="60" cy="37" rx="13.8" ry="24" fill={muted ? '#f6d9d8' : '#f4ce71'}
          stroke={muted ? '#e7bcc3' : '#e6b452'} strokeWidth="1.2" transform={`rotate(${angle} 60 60)`} />
      ))}
      <circle cx="60" cy="60" r="11.5" fill={muted ? '#dba7b0' : '#a7794e'} />
      <circle cx="57" cy="57" r="3" fill="#fff8e7" opacity=".65" />
    </svg>
  );
}

export function LittleButterfly({ className = '', size = 56 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 74 66" fill="none" aria-hidden="true">
      <path d="M36 35 C17 -5 -10 8 13 37 C-1 63 24 69 37 38" fill="#f4c5c3" stroke="#cb8d99" strokeWidth="1.5" />
      <path d="M38 35 C57 -5 84 8 61 37 C75 63 50 69 37 38" fill="#e4d9ee" stroke="#b6a5c5" strokeWidth="1.5" />
      <path d="M37 22 Q36 45 38 50 M37 22 Q32 14 28 14 M37 22 Q43 14 47 14" stroke="#735654" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Tape({ className = '', pink = false }) {
  return <span className={`washi-tape ${pink ? 'tape-pink' : ''} ${className}`} aria-hidden="true" />;
}

export function SectionHeader({ kicker, title, sub, centered = true }) {
  return (
    <div className={`section-heading ${centered ? 'text-center mx-auto' : ''}`}>
      <p className="eyebrow">{kicker}</p>
      <h2 className="display-title">{title}</h2>
      {sub && <p className="section-subtitle">{sub}</p>}
    </div>
  );
}

export function Reveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }}
      transition={{ duration: .65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export function PaperStar({ className = '' }) {
  return <span className={`font-hand text-3xl text-rose ${className}`} aria-hidden="true">✧</span>;
}
