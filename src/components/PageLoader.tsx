import { useState, useEffect } from 'react';

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Simulate high-end asset pre-rendering and initialization
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500); // Elegant duration of 1.5s

    const destroyTimer = setTimeout(() => {
      setShouldRender(false);
    }, 1900); // Wait for fade-out transition to complete

    return () => {
      clearTimeout(timer);
      clearTimeout(destroyTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#0d0d0f] flex flex-col items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Subtle branding logo in center */}
      <div className="mb-8 flex flex-col items-center select-none animate-pulse">
        <span className="text-2xl font-sans tracking-[0.3em] font-extrabold text-white">
          PURO <span className="text-zinc-600">DETAIL</span>
        </span>
        <span className="text-[10px] font-mono tracking-[0.4em] text-zinc-500 uppercase mt-2">
          Plettenberg
        </span>
      </div>

      {/* Infinite right-to-left Italian flag loading bar */}
      <div className="w-64 h-[3px] bg-zinc-900 border border-white/5 rounded-full overflow-hidden relative">
        <div
          className="absolute inset-y-0 w-2/3 flex"
          style={{
            animation: 'glideRightToLeft 1.2s infinite linear',
          }}
        >
          <span className="w-1/3 h-full bg-[#2EBE59]"></span> {/* Italian Green */}
          <span className="w-1/3 h-full bg-white"></span>      {/* Italian White */}
          <span className="w-1/3 h-full bg-[#E53E3E]"></span> {/* Italian Red */}
        </div>
      </div>

      {/* Inject custom inline styling for the precise right-to-left glide animation */}
      <style>{`
        @keyframes glideRightToLeft {
          0% {
            transform: translateX(150%);
          }
          100% {
            transform: translateX(-150%);
          }
        }
      `}</style>
    </div>
  );
}
