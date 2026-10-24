import React from 'react';
import { SectionHeader, Reveal } from '../components/Decor';
import Polaroid from '../components/Polaroid';
import PhotoUploader from '../components/PhotoUploader';

export default function PhotoWall({ memories, openPhoto, addPhotos }) {
  return (
    <section id="photo-wall" className="section-padding photo-wall-section overflow-hidden">
      <div className="site-container">
        <Reveal><SectionHeader kicker="chapter ii · the scattered pages" title={<>Photos, little notes, <em>and us.</em></>}
          sub={`${memories.length} photos from our little world — a little messy, a little crooked, and full of heart.`} /></Reveal>
        <div className="scrapbook-collage">
          {memories.map((m, i) => (
            <Reveal className={`wall-slot wall-slot-${i % 6}`} key={m.id} delay={i % 3 * .07}>
              <Polaroid memory={m} onClick={() => openPhoto(m.id)} className="wall-polaroid" />
              {i % 3 === 0 && <span className="wall-doodle" aria-hidden="true">♡</span>}
              {i % 4 === 1 && <span className="wall-star" aria-hidden="true">✧</span>}
            </Reveal>
          ))}
          <div className="wall-quote"><span>✿</span><p>these little memories<br />are my favourite kind<br />of treasure.</p><span>♡</span></div>
        </div>
        <Reveal className="mt-14 flex flex-col items-center gap-3">
          <PhotoUploader onAdd={addPhotos} />
          <p className="text-xs text-faded text-center max-w-xs">Add photos here, then export your edits in Edit mode before sharing the website.</p>
        </Reveal>
      </div>
    </section>
  );
}
