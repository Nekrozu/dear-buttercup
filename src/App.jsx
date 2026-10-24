import React, { useCallback, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import EditDrawer from './components/EditDrawer';
import PhotoLightbox from './components/PhotoLightbox';
import MusicPlayer from './components/MusicPlayer';
import FloatingDecorations from './components/FloatingDecorations';
import Hero from './sections/Hero';
import Birthday from './sections/Birthday';
import MemoryCarousel from './sections/MemoryCarousel';
import PhotoWall from './sections/PhotoWall';
import Story from './sections/Story';
import PolaroidDeck from './sections/PolaroidDeck';
import LittleThings from './sections/LittleThings';
import { Notes, Surprises } from './sections/NotesAndSurprises';
import { EnvelopeSection, LetterModal } from './sections/EnvelopeLetter';
import FinalMessage from './sections/FinalMessage';
import { useKeepsake } from './hooks/useKeepsake';

export default function App() {
  const { gift, updateGift, exportGift, resetGift, error } = useKeepsake();
  const [selected, setSelected] = useState(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const addPhotos = useCallback(photos => updateGift(prev => ({ ...prev, memories: [...prev.memories, ...photos] })), [updateGift]);
  const closeLightbox = useCallback(() => setSelected(null), []);
  const closeLetter = useCallback(() => setLetterOpen(false), []);
  const closeEditor = useCallback(() => setEditing(false), []);

  return (
    <MotionConfig reducedMotion="user">
      <Navbar onEdit={() => setEditing(true)} openLetter={() => setLetterOpen(true)} />
      <main id="main">
        <Hero memories={gift.memories} openLetter={() => setLetterOpen(true)} />
        <Birthday />
        <MemoryCarousel memories={gift.memories} openPhoto={setSelected} />
        <PhotoWall memories={gift.memories} openPhoto={setSelected} addPhotos={addPhotos} />
        <Story timeline={gift.timeline} memories={gift.memories} />
        <PolaroidDeck memories={gift.memories} openPhoto={setSelected} />
        <LittleThings things={gift.littleThings} />
        <Notes notes={gift.notes} />
        <Surprises surprises={gift.surprises || []} />
        <EnvelopeSection onOpen={() => setLetterOpen(true)} />
        <FinalMessage memories={gift.memories} openPhoto={setSelected} />
      </main>
      <MusicPlayer />
      <FloatingDecorations />
      <LetterModal opened={letterOpen} onClose={closeLetter} letter={gift.letter} />
      <PhotoLightbox memories={gift.memories} selected={selected} onClose={closeLightbox} onSelect={setSelected} />
      <EditDrawer opened={editing} onClose={closeEditor} gift={gift} updateGift={updateGift}
        addPhotos={addPhotos} exportGift={exportGift} resetGift={resetGift} error={error} />
    </MotionConfig>
  );
}
