import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export default function FloatingDecorations() {
  const [sparks, setSparks] = useState([]);
  const reduce = useReducedMotion();
  const click = useCallback((e) => {
    if (reduce || e.pointerType === 'touch' || e.target.closest('button, a, input, textarea, [role="dialog"]')) return;
    const id = Date.now() + Math.random();
    setSparks(s => [...s.slice(-8), { id, x: e.clientX, y: e.clientY }]);
  }, [reduce]);
  useEffect(() => {
    document.addEventListener('pointerdown', click);
    return () => document.removeEventListener('pointerdown', click);
  }, [click]);
  if (reduce) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[200]" aria-hidden="true">
      <AnimatePresence>
        {sparks.map(s => <motion.div key={s.id} className="absolute font-hand text-[27px] text-rose"
          style={{ left: s.x, top: s.y }} initial={{ opacity: 1, y: 0, scale: .65 }}
          animate={{ opacity: 0, y: -45, x: 13, rotate: 25, scale: 1.4 }} exit={{ opacity: 0 }}
          transition={{ duration: .65 }} onAnimationComplete={() => setSparks(p => p.filter(v => v.id !== s.id))}>✧</motion.div>)}
      </AnimatePresence>
    </div>
  );
}
