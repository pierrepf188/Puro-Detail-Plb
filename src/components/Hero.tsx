import { useState, useEffect } from 'react';
import { HERO_SLIDES } from '../data/services';

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const slides = HERO_SLIDES;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds interval
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      id="startseite"
      className="relative h-screen w-full overflow-hidden bg-black flex items-center"
    >
      {/* Background Slideshow */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-65 scale-100' : 'opacity-0 scale-105'
          } transform transition-transform duration-[5000ms]`}
        >
          <img
            src={slide.url}
            alt={slide.title}
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient vignette overlay to guarantee high-contrast readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-black/40 to-black/50" />
        </div>
      ))}

      {/* Left-Aligned Slogan & Brand Info */}
      <div className="relative z-10 text-left px-6 md:px-12 lg:px-16 w-full flex flex-col items-start pt-16">
        {/* Major Headline styled identical to the image (LIVE BETTER, LIVE LUXURY) without hover effect */}
        <div className="relative select-none cursor-default mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.25] text-white">
            <span className="block font-sans font-extralight tracking-[0.18em] uppercase">Perfektion</span>
            <span className="block font-sans font-extralight tracking-[0.18em] italic uppercase mt-1 text-zinc-400">für dein</span>
            <span className="block font-sans font-extralight tracking-[0.18em] uppercase mt-1 text-zinc-500">fahrzeug</span>
          </h1>
        </div>

        {/* Clean, readable single-column descriptive text */}
        <p className="max-w-xl mt-4 mb-8 text-zinc-400 font-sans text-xs md:text-[13px] tracking-[0.12em] leading-relaxed font-light">
          Egal ob Innenreinigung, Lackaufbereitung oder komplette Fahrzeugpflege – bei uns bekommt dein Auto die Pflege, die es verdient.
        </p>

        {/* Primary Call To Action Button (Elegant thin outline mirroring the photo) */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onOpenBooking}
            className="px-8 py-3 bg-transparent border border-white/20 text-white text-[11px] font-sans font-light tracking-[0.25em] uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
          >
            Termin vereinbaren
          </button>
        </div>
      </div>

      {/* Slideshow Progress Bar */}
      <div className="absolute bottom-4 left-6 right-6 z-10 flex space-x-2 md:max-w-xs md:left-auto md:right-12">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="flex-1 h-[2px] transition-all duration-300 relative cursor-pointer group"
          >
            <span
              className={`absolute inset-0 rounded-full transition-all duration-500 ${
                index === currentSlide ? 'bg-white h-[3px]' : 'bg-white/20 group-hover:bg-white/40'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

