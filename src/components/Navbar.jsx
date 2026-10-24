import React, { useState } from 'react';
import { BookHeart, Flower2, Gift, Heart, Images, Mail, Menu, Pencil, X } from 'lucide-react';

const nav = [
  { id: 'home', label: 'Home' },
  { id: 'memories', label: 'Memories' },
  { id: 'story', label: 'Our story' },
  { id: 'little-things', label: 'Little things' },
  { id: 'letter', label: 'A letter' },
];

export default function Navbar({ onEdit, openLetter }) {
  const [menu, setMenu] = useState(false);
  const close = () => setMenu(false);
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="header-shell">
        <nav className="site-container nav-inner" aria-label="Main navigation">
          <a href="#home" className="logo" onClick={close}><Flower2 size={22} strokeWidth={1.7} className="text-rose" />buttercup<span>.</span><small>for Que ♡</small></a>
          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            {nav.map(n => <a key={n.id} href={`#${n.id}`} className="nav-link">{n.label}</a>)}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="nav-edit" onClick={onEdit} title="Edit this scrapbook" aria-label="Edit scrapbook"><Pencil size={16} /><span className="hidden sm:inline">Edit</span></button>
            <button className="md:hidden icon-only-nav" type="button" onClick={() => setMenu(v => !v)} aria-expanded={menu} aria-label="Toggle menu">{menu ? <X size={21} /> : <Menu size={21} />}</button>
          </div>
        </nav>
        {menu && <div className="mobile-menu md:hidden">{nav.map(n => <a onClick={close} key={n.id} href={`#${n.id}`}>{n.label}</a>)}
          <button onClick={() => {close(); openLetter();}} type="button">Open the letter ♡</button></div>}
      </header>
      <nav className="bottom-nav md:hidden" aria-label="Mobile quick navigation">
        <a href="#home"><Heart size={18}/><span>Home</span></a>
        <a href="#memories"><Images size={18}/><span>Photos</span></a>
        <a href="#story"><BookHeart size={18}/><span>Story</span></a>
        <a href="#surprise"><Gift size={18}/><span>Surprise</span></a>
        <button type="button" onClick={openLetter}><Mail size={18}/><span>Letter</span></button>
      </nav>
    </>
  );
}
