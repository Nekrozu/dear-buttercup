import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { site } from '../data/content';
import { ButtercupFlower, Reveal, Tape } from '../components/Decor';
import { assetUrl } from '../utils/assetUrl';

export default function FinalMessage({ memories, openPhoto }) {
  return (
    <footer id="just-us" className="final-section section-padding relative overflow-hidden">
      <div className="site-container relative z-10 text-center">
        <Reveal>
          <p className="eyebrow">one last page · a little hope</p>
          <h2 className="final-title">Here's to the memories<br />we've made<span className="text-rose">...</span></h2>
          <p className="font-hand text-[33px] md:text-[49px] text-rose leading-tight mt-4">...and all the gentler, happier ones we may make. ♡</p>
        </Reveal>
        <Reveal className="final-photos">
          {memories.slice(0, 4).map((m, i) => <button key={m.id} type="button" className={`final-photo final-photo-${i}`} onClick={() => openPhoto(m.id)} aria-label={`Open ${m.title || 'memory'}`}>
            {i === 1 && <Tape className="!top-[-8px] !left-[35%]" />}
            <img src={assetUrl(m.image)} alt={m.alt || m.title || 'Memory photo'} loading="lazy" />
          </button>)}
          <ButtercupFlower className="final-flower" size={88}/>
        </Reveal>
        <Reveal className="max-w-[590px] mx-auto mt-7">
          <p className="text-[15px] text-ink/75 leading-[1.95]">{site.finalMessage}</p>
          <p className="font-hand text-4xl text-rose mt-8">Just you + me, one day at a time.</p>
          <p className="font-hand text-[27px] mt-4 text-ink/75">Thank you for being part of my life, Que.</p>
          <Heart className="mx-auto mt-5 text-rose animate-slow-pulse" size={21} fill="#c98291" strokeWidth={1} />
        </Reveal>
        <div className="footer-bottom">
          <div className="font-serif text-[28px] font-semibold">buttercup<span className="text-rose">.</span> <span className="font-hand text-2xl text-rose">♡</span></div>
          <p className="text-xs text-faded">A handmade digital keepsake · 25 October 2026</p>
          <a href="#home" className="inline-flex items-center gap-2 text-xs text-ink/80 hover:text-rose transition-colors">Back to the beginning <ArrowUp size={15}/></a>
        </div>
      </div>
    </footer>
  );
}
