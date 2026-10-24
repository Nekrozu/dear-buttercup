import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Heart, Sparkles } from 'lucide-react';
import { ButtercupFlower, LittleButterfly, PaperStar, Reveal } from '../components/Decor';
import Polaroid from '../components/Polaroid';
import { site, sampleMemories } from '../data/content';

export default function Hero({ memories, openLetter }) {
  const first = memories[0] || sampleMemories[0];
  const second = memories[1] || memories[0] || sampleMemories[1];
  return (
    <section id="home" className="hero-section relative overflow-hidden">
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-shape hero-shape-one" aria-hidden="true" />
      <div className="hero-shape hero-shape-two" aria-hidden="true" />
      <ButtercupFlower className="absolute left-[5%] bottom-[12%] opacity-50 hidden lg:block animate-drift" size={82} />
      <LittleButterfly className="absolute top-32 right-[8%] opacity-75 animate-flutter" size={64} />
      <div className="site-container hero-grid relative z-10">
        <Reveal className="hero-copy">
          <p className="eyebrow text-left">{site.heroEyebrow}</p>
          <div className="my-6 flex items-center gap-3">
            <span className="w-12 h-px bg-rose/60" /><span className="font-hand text-2xl text-rose">a little something, just for you</span>
          </div>
          <h1 className="hero-title">
            {site.heroTitle}<br />
            <span className="hero-title-flourish">Buttercup<span className="hero-title-dot">.</span></span>
          </h1>
          <p className="font-hand text-[29px] text-rose my-4">hello, my pretty Que ♡</p>
          <p className="hero-description">{site.heroDescription}</p>
          <div className="flex flex-wrap gap-3 mt-9">
            <a href="#birthday" className="primary-button">Open your little world <ArrowDownRight size={17} /></a>
            <button type="button" onClick={openLetter} className="secondary-button"><Heart size={16} /> A letter for you</button>
          </div>
          <div className="mt-12 flex items-center gap-4">
            <span className="dotted-heart">♡</span>
            <div><p className="text-xs font-semibold tracking-[.18em] uppercase text-ink/75">A gift for your twenty-first</p>
              <p className="text-sm text-faded">Made with care, and so much love.</p></div>
          </div>
        </Reveal>
        <div className="hero-art" aria-label="Decorative scrapbook of our real photos">
          <span className="floating-label floating-label-top">a tiny book of us <span>♡</span></span>
          <motion.div className="hero-photo-back" initial={{ rotate: -8, y: 50, opacity: 0 }}
            animate={{ rotate: -9, y: 0, opacity: 1 }} transition={{ delay: .25, duration: .9 }}>
            <Polaroid memory={second} className="hero-side-polaroid" />
          </motion.div>
          <motion.div className="hero-photo-front" initial={{ rotate: 8, y: 65, opacity: 0 }}
            animate={{ rotate: 6, y: 0, opacity: 1 }} transition={{ delay: .4, duration: .9 }}>
            <Polaroid memory={first} className="hero-main-polaroid" />
          </motion.div>
          <div className="round-seal"><span>made</span><Heart size={16} fill="currentColor"/><span>for Que</span></div>
          <PaperStar className="hero-sparkle-one" /><PaperStar className="hero-sparkle-two" />
          <span className="floating-label floating-label-bottom">you are my sunshine ✿</span>
          <span className="hero-small-heart"><Sparkles size={18} /></span>
        </div>
      </div>
      <a href="#birthday" className="scroll-hint" aria-label="Scroll down to the birthday page"><span>keep scrolling</span><ArrowDownRight size={16}/></a>
    </section>
  );
}
