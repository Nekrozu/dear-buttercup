import React, { useEffect, useRef, useState } from 'react';
import { Heart, Music2, Pause, Play, Volume2, VolumeX } from 'lucide-react';

const fmt = s => `${Math.floor((Number(s) || 0) / 60)}:${String(Math.floor((Number(s) || 0) % 60)).padStart(2, '0')}`;

export default function MusicPlayer() {
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(.55);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => { if (audio.current) audio.current.volume = volume; }, [volume]);

  // Try to start music when the page opens. Most mobile browsers block sound
  // until the visitor interacts with the page. In that case, start it on the
  // first tap/click/key press anywhere outside the music controls.
  useEffect(() => {
    const player = audio.current;
    if (!player) return;
    let disposed = false;

    function removeGestureListeners() {
      document.removeEventListener('pointerdown', onFirstInteraction, true);
      document.removeEventListener('click', onFirstInteraction, true);
      document.removeEventListener('keydown', onFirstInteraction, true);
    }

    function tryStart() {
      if (player.error || !player.paused) return;
      const playAttempt = player.play();
      if (playAttempt && typeof playAttempt.then === 'function') {
        playAttempt.then(() => {
          if (!disposed) removeGestureListeners();
        }).catch(() => {
          // NotAllowedError is expected before a user gesture on many devices.
          // Leave the player visible, and try again on the first interaction.
        });
      }
    }

    function onFirstInteraction(event) {
      // The music controls manage their own play/pause state; don't interfere.
      if (event.target instanceof Element && event.target.closest('.music-player')) return;
      tryStart();
    }

    document.addEventListener('pointerdown', onFirstInteraction, true);
    document.addEventListener('click', onFirstInteraction, true);
    document.addEventListener('keydown', onFirstInteraction, true);
    tryStart();

    return () => {
      disposed = true;
      removeGestureListeners();
    };
  }, []);
  const toggle = async () => {
    if (!audio.current) return;
    if (playing) { audio.current.pause(); return; }
    try { await audio.current.play(); setError(false); }
    catch { setError(true); }
  };
  return (
    <aside className={`music-player ${expanded ? 'music-expanded' : ''}`} aria-label="Music player">
      <audio ref={audio} src={`${import.meta.env.BASE_URL}audio/our-song.wav`} preload="auto" autoPlay loop
        onPlay={() => { setPlaying(true); setError(false); }} onPause={() => setPlaying(false)} onTimeUpdate={e => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={e => setDuration(e.currentTarget.duration)} onError={() => setError(true)} />
      <button type="button" className="music-disc" onClick={() => setExpanded(v => !v)} aria-expanded={expanded} aria-label="Expand or collapse music player">
        <Music2 size={18} /><Heart size={9} fill="currentColor" className="absolute top-1 right-1" />
      </button>
      <div className="music-inner">
        <div className="min-w-0"><p className="font-hand text-xl text-ink leading-5 truncate">a little song ♡</p><p className="text-[10px] tracking-[.08em] text-faded">for Buttercup</p></div>
        <button type="button" className="music-play" onClick={toggle} aria-label={playing ? 'Pause song' : 'Play song'}>{playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}</button>
        {expanded && <div className="music-details">
          <div className="flex items-center gap-2"><span className="text-[10px] tabular-nums text-faded">{fmt(progress)}</span>
            <input type="range" aria-label="Song position" min="0" max={duration || 1} step=".1" value={Math.min(progress, duration || 1)} onChange={e => { audio.current.currentTime = Number(e.target.value); }} className="accent-rose flex-1 min-w-0" />
            <span className="text-[10px] tabular-nums text-faded">{fmt(duration)}</span></div>
          <div className="flex items-center gap-2 mt-2"><button type="button" aria-label={volume === 0 ? 'Unmute' : 'Mute'} onClick={() => setVolume(v => v ? 0 : .55)}>{volume ? <Volume2 size={15}/> : <VolumeX size={15}/>}</button>
            <input type="range" min="0" max="1" step=".05" value={volume} onChange={e => setVolume(Number(e.target.value))} aria-label="Music volume" className="accent-rose w-full" /></div>
          {error && <p className="text-[11px] text-rose mt-1">Couldn't load audio. Replace public/audio/our-song.wav.</p>}
        </div>}
      </div>
    </aside>
  );
}
