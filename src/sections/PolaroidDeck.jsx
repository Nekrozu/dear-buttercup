import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SectionHeader, Reveal } from '../components/Decor';
import Polaroid from '../components/Polaroid';

export default function PolaroidDeck({ memories, openPhoto }) {
  const [current, setCurrent] = useState(0);
  if (!memories.length) return null;
  const prev = () => setCurrent(i => (i - 1 + memories.length) % memories.length);
  const next = () => setCurrent(i => (i + 1) % memories.length);
  return (
    <section className="section-padding desk-section overflow-hidden">
      <div className="site-container">
        <Reveal><SectionHeader kicker="a page from the photo box" title={<>If I could keep <em>one moment...</em></>}
          sub="I would probably end up keeping every single one. Tap the arrows to flip through the stack." /></Reveal>
        <div className="photo-desk">
          <div className="desk-decor desk-decor-left" aria-hidden="true">✿</div>
          <div className="desk-decor desk-decor-right" aria-hidden="true">you + me ♡</div>
          <div className="stack-container">
            <div className="stack-ghost stack-ghost-two" aria-hidden="true" />
            <div className="stack-ghost stack-ghost-one" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.div key={memories[current].id} className="stack-active"
                initial={{ opacity: 0, rotate: -10, x: 70, scale: .92 }} animate={{ opacity: 1, rotate: 3, x: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 12, x: -70, scale: .92 }} transition={{ duration: .38 }}>
                <Polaroid memory={memories[current]} onClick={() => openPhoto(memories[current].id)} tape={false} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-center gap-7 pt-10">
            <button type="button" className="round-icon-btn" aria-label="Previous photo in stack" onClick={prev}><ArrowLeft size={19}/></button>
            <span className="font-hand text-2xl text-ink">{current + 1} of {memories.length}</span>
            <button type="button" className="round-icon-btn" aria-label="Next photo in stack" onClick={next}><ArrowRight size={19}/></button>
          </div>
        </div>
      </div>
    </section>
  );
}
