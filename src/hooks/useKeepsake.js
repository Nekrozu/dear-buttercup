import { useCallback, useEffect, useState } from 'react';
import { initialGift } from '../data/content';

const STORAGE_KEY = 'buttercup-que-keepsake-v3-real-photos';
const cloneDefault = () => JSON.parse(JSON.stringify(initialGift));

function validGift(data) {
  return data && typeof data === 'object' && Array.isArray(data.memories) &&
    Array.isArray(data.timeline) && Array.isArray(data.littleThings) &&
    Array.isArray(data.notes) && typeof data.letter === 'string';
}

export function useKeepsake() {
  const [gift, setGift] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return validGift(saved) ? { ...cloneDefault(), ...saved } : cloneDefault();
    } catch { return cloneDefault(); }
  });
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  // Exported edits become part of the published gift once gift-data.json is
  // placed in public/. Browser-local changes still take precedence for editing.
  useEffect(() => {
    let active = true;
    async function loadPublishedGift() {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
        const response = await fetch(`${import.meta.env.BASE_URL}gift-data.json`, { cache: 'no-store' });
        if (!response.ok) return;
        const published = await response.json();
        if (active && !localStorage.getItem(STORAGE_KEY) && validGift(published)) setGift({ ...cloneDefault(), ...published });
      } catch { /* the optional exported gift may not exist yet */ }
      finally { if (active) setLoaded(true); }
    }
    loadPublishedGift();
    return () => { active = false; };
  }, []);

  const updateGift = useCallback((updates) => {
    setGift(prev => {
      const next = typeof updates === 'function' ? updates(prev) : { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setError('');
      } catch {
        setError('Your browser is running low on saved space. Export your gift as a backup, and try smaller photos.');
      }
      return next;
    });
  }, []);

  const resetGift = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setGift(cloneDefault());
    setError('');
  }, []);

  const exportGift = useCallback(() => {
    const blob = new Blob([JSON.stringify(gift, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gift-data.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [gift]);

  return { gift, updateGift, resetGift, exportGift, error, loaded };
}
