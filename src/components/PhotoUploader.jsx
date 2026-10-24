import React, { useRef, useState } from 'react';
import { ImagePlus, LoaderCircle } from 'lucide-react';
import { photosFromFiles } from '../utils/photos';

export default function PhotoUploader({ onAdd, label = 'Add another memory ♡', className = '' }) {
  const input = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleFiles(e) {
    if (!e.target.files?.length) return;
    setBusy(true); setError('');
    try {
      const photos = await photosFromFiles(e.target.files);
      onAdd(photos);
    } catch (err) { setError(err.message || 'Could not add your photo.'); }
    finally { setBusy(false); e.target.value = ''; }
  }

  return (
    <div className={className}>
      <input ref={input} className="sr-only" type="file" accept="image/*" multiple onChange={handleFiles}
        aria-label="Select photos to add to scrapbook" />
      <button type="button" disabled={busy} onClick={() => input.current?.click()} className="add-memory-btn">
        {busy ? <LoaderCircle size={18} className="animate-spin" /> : <ImagePlus size={18} />}{busy ? 'Adding your memories…' : label}
      </button>
      {error && <p className="text-xs text-rose mt-2" role="alert">{error}</p>}
    </div>
  );
}
