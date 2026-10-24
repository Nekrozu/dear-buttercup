import React from 'react';
import { SectionHeader, Reveal, Tape } from '../components/Decor';
import { assetUrl } from '../utils/assetUrl';

export default function Story({ timeline, memories = [] }) {
  return (
    <section id="story" className="story-section section-padding">
      <div className="site-container">
        <Reveal><SectionHeader kicker="chapter iii · how we got here" title={<>Every story begins <em>somewhere.</em></>}
          sub="A few of our real little chapters, captured in photos. There are still so many pages left to write." /></Reveal>
        <div className="story-timeline max-w-[970px] mx-auto">
          {timeline.map((item, index) => (
            <Reveal key={item.id} className={`timeline-entry ${index % 2 ? 'timeline-right' : 'timeline-left'}`}>
              <div className="timeline-dot" aria-hidden="true">✿</div>
              <div className="timeline-note">
                <Tape className="absolute -top-3 left-[42%]" />
                <span className="font-hand text-2xl text-rose">{item.date}</span>
                <h3 className="font-serif text-[30px] md:text-[35px] leading-tight mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-ink/70 leading-relaxed">{item.description}</p>
              </div>
              <div className="timeline-thumb"><img src={assetUrl(memories.find(m => m.id === item.memoryId)?.image || item.image)} alt={`Image for ${item.title}`} loading="lazy" /></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
