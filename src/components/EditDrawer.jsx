import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowUp, Download, FileText, Heart, ImagePlus, RotateCcw, StickyNote, Trash2, X } from 'lucide-react';
import PhotoUploader from './PhotoUploader';
import { assetUrl } from '../utils/assetUrl';

const tabs = [
  { id: 'photos', name: 'Photos', icon: ImagePlus },
  { id: 'letter', name: 'Letter', icon: Heart },
  { id: 'notes', name: 'Little things', icon: StickyNote },
  { id: 'story', name: 'Story', icon: FileText },
];

export default function EditDrawer({ opened, onClose, gift, updateGift, addPhotos, exportGift, resetGift, error }) {
  const [tab, setTab] = useState('photos');
  const closeRef = useRef(null);
  useEffect(() => {
    if (!opened) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = previous; };
  }, [opened, onClose]);

  const setItem = (collection, index, field, value) => updateGift(prev => ({
    ...prev, [collection]: prev[collection].map((item, i) => i === index ? { ...item, [field]: value } : item),
  }));
  // A chapter can display either a scrapbook photo (memoryId) or its own image path.
  // Clearing the linked photo is essential: otherwise Story.jsx always displays
  // the linked memory image and ignores edits to the chapter's image field.
  const setTimelineImagePath = (index, image) => updateGift(prev => ({
    ...prev,
    timeline: prev.timeline.map((item, i) => i === index
      ? { ...item, image, memoryId: '' }
      : item),
  }));

  const move = (collection, index, direction) => updateGift(prev => {
    const reordered = [...prev[collection]];
    const otherIndex = index + direction;
    if (otherIndex < 0 || otherIndex >= reordered.length) return prev;
    [reordered[index], reordered[otherIndex]] = [reordered[otherIndex], reordered[index]];
    return { ...prev, [collection]: reordered };
  });
  const remove = (collection, id) => updateGift(prev => ({ ...prev, [collection]: prev[collection].filter(m => m.id !== id) }));

  return (
    <AnimatePresence>
      {opened && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="edit-overlay" role="dialog" aria-modal="true" aria-label="Edit Buttercup's scrapbook" onClick={onClose}>
        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 260 }}
          className="edit-drawer" onClick={e => e.stopPropagation()}>
          <div className="edit-top-bar">
            <div><p className="font-hand text-3xl text-rose">made by you ♡</p><h2 className="font-serif text-3xl font-semibold text-ink leading-none">Edit our scrapbook</h2></div>
            <button ref={closeRef} type="button" className="round-icon-btn !w-9 !h-9" aria-label="Close editor" onClick={onClose}><X size={19}/></button>
          </div>
          <div className="edit-tabs" role="tablist" aria-label="Sections to edit">
            {tabs.map(({ id, name, icon: Icon }) => <button type="button" key={id} className={tab === id ? 'selected' : ''}
              onClick={() => setTab(id)} role="tab" aria-selected={tab === id}><Icon size={15}/><span>{name}</span></button>)}
          </div>
          <div className="edit-body">
            {error && <p role="alert" className="error-notice">{error}</p>}
            {tab === 'photos' && <>
              <p className="edit-info">Add your real photos, change captions and dates, or rearrange them. Edits are saved in this browser.</p>
              <PhotoUploader onAdd={addPhotos} className="mb-5" label="Add your photos ♡" />
              {gift.memories.map((m, i) => <div className="edit-memory" key={m.id}>
                <img src={assetUrl(m.image)} alt={m.alt || m.title || 'Memory preview'} />
                <div className="flex-1 min-w-0">
                  <label>Photo title<input value={m.title || ''} onChange={e => setItem('memories', i, 'title', e.target.value)} /></label>
                  <label>Caption<textarea rows="2" value={m.caption || ''} onChange={e => setItem('memories', i, 'caption', e.target.value)} /></label>
                  <label>Date / moment<input value={m.date || ''} placeholder="e.g., 14 February" onChange={e => setItem('memories', i, 'date', e.target.value)} /></label>
                  <div className="flex gap-2 mt-2">
                    <button type="button" className="tiny-edit-btn" disabled={i === 0} aria-label={`Move ${m.title} up`} onClick={() => move('memories', i, -1)}><ArrowUp size={15}/></button>
                    <button type="button" className="tiny-edit-btn" disabled={i === gift.memories.length - 1} aria-label={`Move ${m.title} down`} onClick={() => move('memories', i, 1)}><ArrowDown size={15}/></button>
                    <button type="button" className="tiny-edit-btn ml-auto text-rose" aria-label={`Remove ${m.title}`} onClick={() => remove('memories', m.id)}><Trash2 size={15}/></button>
                  </div>
                </div>
              </div>)}
            </>}
            {tab === 'letter' && <>
              <p className="edit-info">The letter is yours to change. It's an apology and birthday wish, but please make every word sound like you.</p>
              <label className="edit-label">Your letter to Que<textarea className="letter-edit-textarea" value={gift.letter} onChange={e => updateGift(prev => ({ ...prev, letter: e.target.value }))} rows="20" /></label>
              <p className="edit-tip">Tip: The original letter avoids pretending everything is okay or asking her to forgive you immediately. Add what you personally want to take responsibility for.</p>
            </>}
            {tab === 'notes' && <>
              <p className="edit-info">Flip-over cards and handwritten notes. Replace these with real little things you adore about her.</p>
              {gift.littleThings.map((thing, i) => <div className="edit-fields" key={thing.id}>
                <label>Card {i + 1} · front<input value={thing.front} onChange={e => setItem('littleThings', i, 'front', e.target.value)} /></label>
                <label>Card {i + 1} · back<textarea value={thing.back} rows="2" onChange={e => setItem('littleThings', i, 'back', e.target.value)} /></label>
              </div>)}
              <h3 className="font-serif text-2xl mt-7 mb-3">Handwritten notes</h3>
              {gift.notes.map((note, i) => <div key={note.id} className="edit-fields"><label>Note {i + 1}<textarea rows="2" value={note.text} onChange={e => setItem('notes', i, 'text', e.target.value)} /></label></div>)}
              <h3 className="font-serif text-2xl mt-7 mb-3">Surprise notes</h3>
              {gift.surprises?.map((s, i) => <div key={s.id} className="edit-fields">
                <label>Surprise title<input value={s.title} onChange={e => setItem('surprises', i, 'title', e.target.value)} /></label>
                <label>Hidden message<textarea rows="2" value={s.message} onChange={e => setItem('surprises', i, 'message', e.target.value)} /></label>
              </div>)}
            </>}
            {tab === 'story' && <>
              <p className="edit-info">Personalize the timeline chapters. Choose any scrapbook photo or enter an image path below; you'll see a preview of your choice right away.</p>
              {gift.timeline.map((t, i) => <div key={t.id} className="edit-fields">
                <label>Chapter {i + 1} · date<input value={t.date} onChange={e => setItem('timeline', i, 'date', e.target.value)} /></label>
                <label>Title<input value={t.title} onChange={e => setItem('timeline', i, 'title', e.target.value)} /></label>
                <label>Your story<textarea rows="3" value={t.description} onChange={e => setItem('timeline', i, 'description', e.target.value)} /></label>
                <label>Choose a photo from your scrapbook
                  <select className="edit-select" value={t.memoryId || ''} onChange={e => setItem('timeline', i, 'memoryId', e.target.value)}>
                    <option value="">Use image path below</option>
                    {gift.memories.map(m => <option key={m.id} value={m.id}>{m.title || 'A memory'}</option>)}
                  </select>
                </label>
                <label>Image path (optional)
                  <input value={t.image || ''} placeholder="/memories/our-first-date.jpg"
                    onChange={e => setTimelineImagePath(i, e.target.value)} />
                </label>
                <p className="text-xs text-faded leading-relaxed">Changing the image path automatically unlinks the scrapbook photo, so the new image appears in the timeline.</p>
                <div className="flex items-center gap-3 mt-2">
                  <img className="h-24 w-24 object-cover rounded-lg shadow-sm" src={assetUrl(gift.memories.find(m => m.id === t.memoryId)?.image || t.image)} alt={`Preview for ${t.title}`} />
                  <p className="text-xs text-faded">Current timeline photo preview</p>
                </div>
              </div>)}
            </>}
          </div>
          <div className="edit-bottom">
            <button type="button" className="primary-button w-full justify-center" onClick={exportGift}><Download size={17}/> Export gift-data.json</button>
            <p className="text-[11px] text-faded leading-relaxed mt-2">To make your changes visible to Que on a published site: download the JSON, put it in the project's <code>public/</code> folder, then rebuild and publish. Browser edits alone are private to this device.</p>
            <button type="button" className="text-xs text-faded underline mt-3 inline-flex gap-2 items-center hover:text-rose"
              onClick={() => { if (window.confirm('Restore the original gift with all 20 photos? Export a backup of your edits first.')) resetGift(); }}><RotateCcw size={13}/> Restore original photos</button>
          </div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  );
}
