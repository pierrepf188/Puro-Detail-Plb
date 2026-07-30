import { useState, useEffect, useRef } from 'react';

interface PullToRefreshProps {
  onRefresh: () => void;
}

export default function PullToRefresh({ onRefresh }: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startYRef = useRef(0);
  const threshold = 90; // Pull threshold in pixels

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Only track pull-to-refresh if we are at the absolute top of the page
      if (window.scrollY === 0 && !isRefreshing) {
        startYRef.current = e.touches[0].clientY;
        setIsPulling(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling || isRefreshing) return;

      const currentY = e.touches[0].clientY;
      const distance = currentY - startYRef.current;

      // Only handle downward swipe/pull
      if (distance > 0 && window.scrollY === 0) {
        // Apply resistance (logarithmic/quadratic pull feeling)
        const resistedDistance = Math.min(distance * 0.4, threshold + 20);
        setPullDistance(resistedDistance);

        // Prevent default native reload behavior so we can display our custom Italian loader
        if (e.cancelable) {
          e.preventDefault();
        }
      } else {
        setIsPulling(false);
        setPullDistance(0);
      }
    };

    const handleTouchEnd = () => {
      if (!isPulling || isRefreshing) return;

      setIsPulling(false);

      if (pullDistance >= threshold) {
        // Trigger the luxury right-to-left load sequence
        setIsRefreshing(true);
        setPullDistance(threshold);

        // Perform refreshing action
        setTimeout(() => {
          onRefresh();
          // Reset states smoothly after loading animation ends
          setTimeout(() => {
            setIsRefreshing(false);
            setPullDistance(0);
          }, 1500);
        }, 1200);
      } else {
        // Bounce back to top
        setPullDistance(0);
      }
    };

    // Add listeners with passive: false to allow preventDefault for overriding native reload
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPulling, isRefreshing, pullDistance, onRefresh]);

  // If there's no pulling or refreshing active, don't occupy layout
  if (pullDistance === 0 && !isRefreshing) return null;

  // Calculate pull progress percentage (up to 100%)
  const progress = Math.min(pullDistance / threshold, 1);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[90] pointer-events-none transition-all duration-150"
      style={{
        transform: `translateY(${isRefreshing ? '0px' : `${pullDistance * 0.35}px`})`,
      }}
    >
      {/* Container holding the elegant Italian loader strip */}
      <div className="w-full flex justify-center bg-[#121214]/90 backdrop-blur-sm border-b border-white/5 py-3 shadow-lg shadow-black/40">
        <div className="flex flex-col items-center space-y-2">
          
          {/* Subtle text indicator */}
          <span className="text-[9px] font-mono tracking-[0.3em] text-zinc-400 uppercase">
            {isRefreshing ? 'Puro Detail lädt...' : 'Herunterziehen zum Aktualisieren'}
          </span>

          {/* Thin, precise Italian flag loading bar */}
          <div className="w-48 h-[2.5px] bg-zinc-900 rounded-full overflow-hidden relative border border-white/5">
            {isRefreshing ? (
              /* GLIDE RIGHT TO LEFT ANIMATION requested by user */
              <div
                className="absolute inset-y-0 w-2/3 flex"
                style={{
                  animation: 'glideRightToLeftPull 1.1s infinite linear',
                }}
              >
                <span className="w-1/3 h-full bg-[#2EBE59]"></span>
                <span className="w-1/3 h-full bg-white"></span>
                <span className="w-1/3 h-full bg-[#E53E3E]"></span>
              </div>
            ) : (
              /* Expanding progress line until threshold met */
              <div
                className="h-full flex transition-all duration-150"
                style={{
                  width: `${progress * 100}%`,
                  opacity: progress,
                }}
              >
                <span className="w-1/3 h-full bg-[#2EBE59]"></span>
                <span className="w-1/3 h-full bg-white"></span>
                <span className="w-1/3 h-full bg-[#E53E3E]"></span>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Style block for precise right-to-left pull animation */}
      <style>{`
        @keyframes glideRightToLeftPull {
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
