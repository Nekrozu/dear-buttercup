import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Heart, MailOpen, X } from 'lucide-react';
import { ButtercupFlower, SectionHeader, Reveal } from '../components/Decor';

export function EnvelopeSection({ onOpen }) {
  return (
    <section id="letter" className="section-padding envelope-section overflow-hidden">
      <div className="site-container">
        <Reveal><SectionHeader kicker="chapter vi · the words I owe you" title={<>A little letter, <em>for you.</em></>}
          sub="This page comes from my heart. You can read it whenever you're ready." /></Reveal>
        <Reveal className="envelope-stage">
          <div className="absolute text-5xl font-hand text-rose/50 -top-5 left-[9%] -rotate-12" aria-hidden="true">just for you</div>
          <ButtercupFlower className="absolute -bottom-6 right-[10%] -rotate-12" size={90} />
          <button type="button" className="envelope-trigger" onClick={onOpen} aria-label="Open a letter for Que">
            <span className="envelope-body"><span className="envelope-flap" /><span className="envelope-front" />
              <span className="envelope-seal"><Heart size={26} fill="#c98291" strokeWidth={1.4} /></span>
              <span className="envelope-address">to my Buttercup<br /><small>with love ♡</small></span></span>
          </button>
          <button className="letter-open-link" type="button" onClick={onOpen}><MailOpen size={18} /> Open my letter to you</button>
        </Reveal>
      </div>
    </section>
  );
}

export function LetterModal({ opened, onClose, letter }) {
  const reduce = useReducedMotion();
  const closeRef = useRef(null);
  useEffect(() => {
    if (!opened) return;
    const handler = event => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = previousOverflow; };
  }, [opened, onClose]);
  return (
    <AnimatePresence>
      {opened && (
        <motion.div className="overlay-backdrop z-[110] p-4" role="dialog" aria-modal="true" aria-label="A letter for Buttercup"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="letter-modal" onClick={e => e.stopPropagation()} initial={reduce ? false : { opacity: 0, y: 95, rotate: -3, scale: .9 }}
            animate={{ opacity: 1, y: 0, rotate: -.4, scale: 1 }} exit={{ opacity: 0, y: 70, scale: .92 }}
            transition={{ type: 'spring', stiffness: 220, damping: 25 }}>
            <div className="letter-modal-header"><span className="font-hand text-[29px] text-rose">a letter, just for Que ♡</span>
              <button ref={closeRef} className="round-icon-btn !w-9 !h-9" type="button" onClick={onClose} aria-label="Close letter"><X size={19}/></button></div>
            <div className="letter-content">{letter.split('\n').map((paragraph, i) => <p key={i}>{paragraph || '\u00a0'}</p>)}</div>
            <div className="text-center pb-7"><button type="button" className="secondary-button mx-auto" onClick={onClose}>Fold this letter away ♡</button></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
