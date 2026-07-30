import { useState, useRef, useEffect } from 'react';
import { REFERENCES } from '../data/services';
import { ChevronLeft, ChevronRight, X, Maximize2, ChevronDown, ChevronUp, Instagram, ExternalLink } from 'lucide-react';

export default function CompareSlider() {
  const references = REFERENCES;

  // Store positions for each reference slider separately
  const [positions, setPositions] = useState<Record<string, number>>({});

  // Expandable description state for long texts
  const [expandedText, setExpandedText] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedText((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Track dragging state for independent sliders
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  
  // Track start position to distinguish clicks from drags
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const containerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Lightbox state
  const [lightbox, setLightbox] = useState<{
    id: string; // reference project id
    type: 'before' | 'after'; // which photo
  } | null>(null);

  // Handle movement of slider
  const handleMove = (id: string, clientX: number) => {
    const container = containerRefs.current[id];
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    
    setPositions((prev) => ({
      ...prev,
      [id]: percentage,
    }));
  };

  // Mouse/Touch Down Handler
  const handleStart = (id: string, clientX: number, clientY: number) => {
    setActiveDragId(id);
    dragStartPosRef.current = { x: clientX, y: clientY };
    handleMove(id, clientX);
  };

  // Global event listeners for dragging
  useEffect(() => {
    const handleGlobalMove = (e: globalThis.MouseEvent) => {
      if (!activeDragId) return;
      handleMove(activeDragId, e.clientX);
    };

    const handleGlobalTouchMove = (e: globalThis.TouchEvent) => {
      if (!activeDragId) return;
      if (e.touches.length > 0) {
        handleMove(activeDragId, e.touches[0].clientX);
      }
    };

    const handleGlobalEnd = () => {
      setActiveDragId(null);
    };

    if (activeDragId) {
      window.addEventListener('mousemove', handleGlobalMove);
      window.addEventListener('mouseup', handleGlobalEnd);
      window.addEventListener('touchmove', handleGlobalTouchMove);
      window.addEventListener('touchend', handleGlobalEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('mouseup', handleGlobalEnd);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalEnd);
    };
  }, [activeDragId, positions]);

  // Find active reference project details for lightbox rendering
  const activeProject = references.find((p) => p.id === lightbox?.id);

  return (
    <section
      id="referenzen"
      className="py-24 md:py-32 bg-[#16161a] text-white border-y border-white/5 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-sans font-light tracking-[0.25em] text-zinc-500 uppercase block mb-3">
              Referenzen
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-extralight tracking-[0.18em] uppercase text-white">
              Vorher & Nachher
            </h2>
            <div className="h-[1px] w-20 bg-white/20 mt-5" />
          </div>
        </div>

        {/* Grid of Reference Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {references.map((project) => {
            const sliderPos = positions[project.id] ?? 50;

            return (
              <div 
                key={project.id} 
                className="bg-zinc-900/40 border border-white/5 flex flex-col group overflow-hidden relative"
              >
                {/* Image Container with Slider */}
                <div
                  ref={(el) => { containerRefs.current[project.id] = el; }}
                  onMouseDown={(e) => handleStart(project.id, e.clientX, e.clientY)}
                  onTouchStart={(e) => {
                    if (e.touches.length > 0) {
                      handleStart(project.id, e.touches[0].clientX, e.touches[0].clientY);
                    }
                  }}
                  className="relative w-full aspect-[4/3] bg-zinc-950 overflow-hidden select-none cursor-ew-resize border-b border-white/5 group-hover:border-white/10 transition-colors [container-type:inline-size]"
                >
                  {/* LAYER 1: AFTER (Base) */}
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={project.afterUrl}
                      alt={`${project.title} - Nachher`}
                      className="w-full h-full object-cover pointer-events-none"
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark/Glossy reflection simulator */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent mix-blend-overlay" />
                  </div>

                  {/* LAYER 2: BEFORE (Clipped layout on top) */}
                  <div
                    className="absolute inset-y-0 left-0 h-full overflow-hidden"
                    style={{ width: `${sliderPos}%` }}
                  >
                    {/* Inner wrapper matching exact container width to prevent squeeze on mobile */}
                    <div className="absolute inset-y-0 left-0 w-[100cqw] h-full">
                      <img
                        src={project.beforeUrl}
                        alt={`${project.title} - Vorher`}
                        className="w-full h-full object-cover pointer-events-none"
                        style={{
                          filter: 'contrast(0.85) saturate(0.9) brightness(0.88) grayscale(0.1)',
                        }}
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                      />
                      {/* Simulating dust/swirl effects */}
                      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                    </div>
                  </div>

                  {/* Dedicated Vorher Fullscreen Button (left side) */}
                  <button
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox({ id: project.id, type: 'before' });
                    }}
                    className="absolute bottom-3 left-3 z-30 flex items-center space-x-1.5 bg-black/80 backdrop-blur-sm px-2.5 py-1.5 border border-white/10 text-[9px] font-mono tracking-widest text-zinc-300 hover:text-black hover:bg-white hover:border-white transition-all duration-300 uppercase cursor-pointer rounded-none shadow-md"
                  >
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>Vorher Foto</span>
                  </button>

                  {/* Dedicated Nachher Fullscreen Button (right side) */}
                  <button
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox({ id: project.id, type: 'after' });
                    }}
                    className="absolute bottom-3 right-3 z-30 flex items-center space-x-1.5 bg-black/80 backdrop-blur-sm px-2.5 py-1.5 border border-white/10 text-[9px] font-mono tracking-widest text-zinc-300 hover:text-black hover:bg-white hover:border-white transition-all duration-300 uppercase cursor-pointer rounded-none shadow-md"
                  >
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>Nachher Foto</span>
                  </button>

                  {/* SLIDER DIVIDER LINE */}
                  <div
                    className="absolute inset-y-0 z-20 w-[1px] bg-white pointer-events-none shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                    style={{ left: `${sliderPos}%` }}
                  >
                    {/* Vertical marker bar */}
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    {/* Rounded drag button - Bright White */}
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-black border border-white shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center transition-transform group-hover:scale-110">
                      <div className="flex items-center space-x-0.5 text-black">
                        <ChevronLeft className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                        <ChevronRight className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                      </div>
                    </div>
                  </div>

                  {/* HTML Range Slider Overlay for accessibility & smooth drag */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPos}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setPositions((prev) => ({ ...prev, [project.id]: val }));
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    className="absolute inset-0 z-40 w-full h-full opacity-0 cursor-ew-resize m-0 p-0 touch-pan-y"
                    aria-label={`${project.title} Vorher/Nachher Vergleich`}
                  />
                </div>

                {/* Card Content Description */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-sans font-medium tracking-[0.15em] text-white uppercase">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-4">
                    {project.vehicle}
                  </p>

                  <div className="mb-6">
                    <p className="text-zinc-400 font-sans text-xs tracking-wide leading-relaxed font-light whitespace-pre-line">
                      {project.description.length > 180 && !expandedText[project.id]
                        ? `${project.description.slice(0, 160)}...`
                        : project.description}
                    </p>
                    {project.description.length > 180 && (
                      <button
                        type="button"
                        onClick={() => toggleExpand(project.id)}
                        className="inline-flex items-center gap-1.5 mt-2.5 text-[10px] font-mono tracking-widest text-zinc-300 hover:text-white uppercase transition-colors cursor-pointer border-b border-zinc-700 hover:border-white pb-0.5"
                      >
                        {expandedText[project.id] ? (
                          <>
                            <span>Weniger anzeigen</span>
                            <ChevronUp className="w-3 h-3 text-zinc-400" />
                          </>
                        ) : (
                          <>
                            <span>Mehr anzeigen</span>
                            <ChevronDown className="w-3 h-3 text-zinc-400" />
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Instagram Link Button */}
                  {project.instagramUrl && (
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                      <a
                        href={project.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-950 hover:bg-white text-zinc-400 hover:text-black border border-white/10 hover:border-white text-[10px] font-mono tracking-widest uppercase transition-all duration-300 rounded-none shadow-sm group"
                      >
                        <Instagram className="w-3.5 h-3.5 text-zinc-400 group-hover:text-black transition-colors" />
                        <span>Auf Instagram ansehen</span>
                        <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-black transition-colors" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightbox && activeProject && (
        <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-6 md:p-10 select-none animate-fade-in">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[9px] font-mono tracking-[0.3em] text-zinc-400 uppercase block mb-1">
                {activeProject.title} — DETAIL-ANSICHT
              </span>
              <h3 className="text-sm font-sans font-light tracking-[0.2em] text-white uppercase">
                {lightbox.type === 'before' ? 'VORHER-ZUSTAND' : 'NACHHER-ZUSTAND (PURO GLANZFINISH)'}
              </h3>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setLightbox(null)}
              className="p-3 bg-zinc-900 border border-white/10 text-white hover:bg-white hover:text-black transition-colors rounded-none cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Core Image Viewer */}
          <div className="relative flex-1 flex items-center justify-center my-6 md:my-10">
            {/* Highlighted Image */}
            <div className="max-w-full max-h-[70vh] border border-white/10 overflow-hidden shadow-2xl relative">
              <img
                src={lightbox.type === 'before' ? activeProject.beforeUrl : activeProject.afterUrl}
                alt={activeProject.title}
                className="w-full h-full max-w-4xl max-h-[70vh] object-contain"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      )}
    </section>
  );
}

