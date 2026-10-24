import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { SectionHeader, Reveal } from '../components/Decor';

export default function LittleThings({ things }) {
  const [flipped, setFlipped] = useState([]);
  const toggle = (id) => setFlipped(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  return (
    <section id="little-things" className="section-padding little-things-section overflow-hidden">
      <div className="site-container">
        <Reveal><SectionHeader kicker="chapter iv · the tiniest things" title={<>Little things I <em>adore about you.</em></>}
          sub="Some reasons are so small they fit on a tiny piece of paper. Tap each note and turn it over." /></Reveal>
        <div className="flip-grid">
          {things.map((thing, index) => {
            const isFlipped = flipped.includes(thing.id);
            return (
              <Reveal key={thing.id} delay={(index % 4) * .06}>
                <button type="button" className={`flip-note flip-note-${index % 4} ${isFlipped ? 'is-flipped' : ''}`}
                  aria-label={`${thing.front}. ${isFlipped ? 'Show front' : 'Reveal why I love this'}`}
                  aria-pressed={isFlipped} onClick={() => toggle(thing.id)}>
                  <span className="flip-inner">
                    <span className="flip-front"><span className="flip-ornament">✿</span><span className="font-hand text-3xl md:text-[34px]">{thing.front}</span><span className="text-[10px] tracking-[.16em] uppercase text-faded">tap to unfold</span></span>
                    <span className="flip-back"><Heart size={20} className="text-rose mb-3" fill="#c98291"/><span className="font-hand text-[25px] md:text-[27px] leading-7 text-center">{thing.back}</span></span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
        <p className="text-center font-hand text-3xl text-rose mt-12">and a thousand other little things, too. ♡</p>
      </div>
    </section>
  );
}
