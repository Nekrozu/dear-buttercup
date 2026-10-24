import React from 'react';
import { Tape } from './Decor';
import { assetUrl } from '../utils/assetUrl';

export default function Polaroid({ memory, className = '', onClick, style, caption = true, tape = true, imageClass = '' }) {
  const contents = (
    <>
      {tape && <Tape className="photo-tape" />}
      <div className={`polaroid-image ${imageClass}`}>
        <img src={assetUrl(memory.image)} alt={memory.alt || memory.caption || memory.title || 'A scrapbook memory'} loading="lazy" />
      </div>
      {caption && <div className="polaroid-writing">{memory.title || memory.caption || 'a little moment ♡'}</div>}
    </>
  );
  return onClick ? (
    <button type="button" className={`polaroid text-left group ${className}`} style={style} onClick={onClick}
      aria-label={`Open photo: ${memory.title || memory.caption || 'memory'}`}>
      {contents}
    </button>
  ) : (
    <div className={`polaroid ${className}`} style={style}>{contents}</div>
  );
}
