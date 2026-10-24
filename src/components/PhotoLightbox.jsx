import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { assetUrl } from '../utils/assetUrl';

export default function PhotoLightbox({ memories, selected, onClose, onSelect }) {
  const index = memories.findIndex(m => m.id === selected);
  const photo = memories[index];
  useEffect(() => {
    if (!photo) return;
    const keyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelect(memories[(index + 1) % memories.length].id);
      if (e.key === 'ArrowLeft') onSelect(memories[(index - 1 + memories.length) % memories.length].id);
    };
    document.addEventListener('keydown', keyDown);
    const before = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', keyDown); document.body.style.overflow = before; };
  }, [index, photo, memories, onClose, onSelect]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div className="overlay-backdrop z-[100]" role="dialog" aria-modal="true" aria-label="Photo viewer"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <button onClick={onClose} className="overlay-close" aria-label="Close photo viewer"><X size={22} /></button>
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button type="button" aria-label="Previous photo" className="lightbox-arrow" onClick={() => onSelect(memories[(index - 1 + memories.length) % memories.length].id)}><ArrowLeft /></button>
            <motion.div key={photo.id} initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} className="lightbox-photo">
              <img src={assetUrl(photo.image)} alt={photo.alt || photo.caption || photo.title || 'Memory'} />
              <div className="px-5 pt-4 pb-3 text-center">
                <p className="font-hand text-3xl text-ink">{photo.title || 'a little moment'}</p>
                <p className="text-xs text-faded mt-1">{photo.caption} {photo.date ? `· ${photo.date}` : ''}</p>
              </div>
            </motion.div>
            <button type="button" aria-label="Next photo" className="lightbox-arrow" onClick={() => onSelect(memories[(index + 1) % memories.length].id)}><ArrowRight /></button>
          </div>
          <span className="text-paper/75 text-xs mt-4" aria-live="polite">{index + 1} / {memories.length} · use arrow keys to browse</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
