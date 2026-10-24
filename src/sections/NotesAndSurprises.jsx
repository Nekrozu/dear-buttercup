import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Gift, Sparkles } from 'lucide-react';
import { SectionHeader, Reveal, Tape } from '../components/Decor';

export function Notes({ notes }) {
  return (
    <section className="section-padding notes-section overflow-hidden">
      <div className="site-container">
        <Reveal><SectionHeader kicker="handwritten, from the heart" title={<>A few words <em>for you.</em></>}
          sub="Sometimes the softest things are the hardest to say aloud." /></Reveal>
        <div className="note-cluster">
          {notes.map((note, i) => (
            <Reveal key={note.id} delay={i * .08}>
              <div className={`torn-note torn-note-${i % 4}`}>
                <Tape className="absolute -top-3 left-1/2 -translate-x-1/2" pink={i % 2 === 1}/>
                <span className="absolute top-5 right-6 font-hand text-2xl text-rose/60">{['✧', '♡', '✿', '⋆'][i % 4]}</span>
                <p>{note.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Surprises({ surprises }) {
  const [open, setOpen] = useState([]);
  const toggle = id => setOpen(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  return (
    <section id="surprise" className="section-padding surprise-section overflow-hidden">
      <div className="site-container">
        <Reveal><SectionHeader kicker="chapter v · tucked between the pages" title={<>Pick a little <em>surprise.</em></>}
          sub="Five tiny notes, hidden just for you. Pick any one and see what is inside." /></Reveal>
        <div className="surprise-grid">
          {surprises.map((s, i) => {
            const selected = open.includes(s.id);
            return (
              <Reveal key={s.id} delay={.04 * i}>
                <button type="button" className={`surprise-card surprise-color-${i % 5} ${selected ? 'surprise-open' : ''}`}
                  aria-expanded={selected} aria-label={`${selected ? 'Close' : 'Open'} ${s.title}`} onClick={() => toggle(s.id)}>
                  <div className="surprise-cover"><span className="surprise-icon">{s.icon || '✧'}</span>
                    <span className="font-hand text-2xl leading-6">{s.title}</span>
                    <span className="uppercase text-[10px] tracking-[.12em] opacity-60 mt-4">{selected ? 'close note' : 'open me'}</span></div>
                  <AnimatePresence initial={false}>
                    {selected && <motion.div key="revealed" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      <p className="surprise-message"><Sparkles size={13} className="shrink-0 mt-1" />{s.message}</p>
                    </motion.div>}
                  </AnimatePresence>
                </button>
              </Reveal>
            );
          })}
        </div>
        <p className="text-center font-hand text-3xl text-rose mt-12">a little happiness, wrapped in paper ♡</p>
      </div>
    </section>
  );
}
