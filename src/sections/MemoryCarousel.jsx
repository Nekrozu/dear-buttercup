import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { SectionHeader, Reveal } from '../components/Decor';
import Polaroid from '../components/Polaroid';
import 'swiper/css';
import 'swiper/css/pagination';

export default function MemoryCarousel({ memories, openPhoto }) {
  const swiper = useRef(null);
  const [playing, setPlaying] = useState(false);
  if (!memories.length) return null;
  return (
    <section id="memories" className="section-padding memories-section overflow-hidden">
      <div className="site-container">
        <Reveal><SectionHeader kicker="chapter i · our little gallery" title={<>The little moments <em>that stay.</em></>}
          sub="Our favourite little moments, gathered like photographs inside a well-loved box." /></Reveal>
      </div>
      <Reveal className="carousel-outer">
        <Swiper modules={[Navigation, Pagination, Autoplay]} centeredSlides loop={memories.length >= 4}
          spaceBetween={18} slidesPerView={1.4}
          breakpoints={{ 520: { slidesPerView: 1.75, spaceBetween: 24 }, 800: { slidesPerView: 2.5, spaceBetween: 35 }, 1180: { slidesPerView: 3.25, spaceBetween: 42 } }}
          autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }} onSwiper={s => { swiper.current = s; s.autoplay?.stop(); }}
          pagination={{ clickable: true, dynamicBullets: true }} className="memory-swiper">
          {memories.map((m, i) => (
            <SwiperSlide key={m.id}>
              <div className={`slide-paper slide-rotate-${i % 3}`}>
                <Polaroid memory={m} onClick={() => openPhoto(m.id)} />
                <div className="text-center mt-4 px-2">
                  <p className="text-xs uppercase tracking-[.15em] text-faded">{m.date || 'a little memory'}</p>
                  <p className="font-hand text-[25px] text-ink/85 mt-1">{m.caption}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="carousel-controls">
          <button type="button" className="round-icon-btn" onClick={() => swiper.current?.slidePrev()} aria-label="Previous memory"><ArrowLeft size={19} /></button>
          <button type="button" className="round-icon-btn" onClick={() => swiper.current?.slideNext()} aria-label="Next memory"><ArrowRight size={19} /></button>
          <span className="h-7 w-px bg-rose/35 mx-2" />
          <button type="button" onClick={() => setPlaying(v => { const next = !v; if(next) swiper.current?.autoplay?.start(); else swiper.current?.autoplay?.stop(); return next; })}
            className="text-xs text-ink/75 inline-flex items-center gap-2 hover:text-rose transition-colors"
            aria-label={playing ? 'Pause memory slideshow' : 'Play memory slideshow'}>
            {playing ? <Pause size={15} /> : <Play size={15}/>} {playing ? 'Pause' : 'Autoplay'}
          </button>
        </div>
      </Reveal>
    </section>
  );
}
