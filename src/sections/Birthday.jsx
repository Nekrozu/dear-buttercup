import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CakeSlice, Sparkles } from 'lucide-react';
import { ButtercupFlower, Reveal } from '../components/Decor';
import { site } from '../data/content';

export default function Birthday() {
  const [wishMade, setWishMade] = useState(false);
  const reduce = useReducedMotion();
  return (
    <section id="birthday" className="birthday-section section-padding">
      <div className="site-container">
        <Reveal>
          <div className="birthday-card relative">
            <div className="absolute top-5 left-5 md:left-9 flex gap-2 text-lg text-rose/50" aria-hidden="true">✳ ✧ ✳</div>
            <ButtercupFlower className="absolute -top-7 -right-3 md:right-12 rotate-12 opacity-90" size={95} />
            <div className="birthday-inner text-center">
              <p className="eyebrow">A very special page · 25 October</p>
              <p className="birthday-tiny-script">today, the world celebrates</p>
              <h2 className="birthday-21">21<span>!</span></h2>
              <p className="font-hand text-[39px] md:text-[47px] leading-tight text-rose -mt-5">happy birthday, Buttercup</p>
              <p className="max-w-[610px] mx-auto text-ink/80 text-[15px] md:text-[16px] leading-[1.9] mt-5">{site.birthdayWish}</p>
              <div className="birthday-wishes" aria-label="Twenty one little birthday stars">
                {Array.from({ length: site.age }, (_, i) => <span key={i} aria-hidden="true">✦</span>)}
              </div>
              <button onClick={() => setWishMade(v => !v)} type="button" className="primary-button mx-auto mt-7">
                {wishMade ? <Sparkles size={18} /> : <CakeSlice size={18} />}
                {wishMade ? 'A wish is on its way ♡' : 'Make a little birthday wish'}
              </button>
              <AnimatePresence>
                {wishMade && <motion.div key="wish" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="font-hand text-3xl text-rose mt-5" role="status">May this year be gentle with you, Que. ✧</motion.div>}
              </AnimatePresence>
            </div>
            <div className="birthday-edge" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
