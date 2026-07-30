import { useState } from 'react';
import PageLoader from './components/PageLoader';
import PullToRefresh from './components/PullToRefresh';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import CompareSlider from './components/CompareSlider';
import About from './components/About';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOpenBooking = (serviceId?: string) => {
    setPreselectedService(serviceId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPreselectedService(undefined);
  };

  const handleRefresh = () => {
    // Trigger simulated page reload by changing key of PageLoader to remount it
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="bg-[#121214] min-h-screen text-white font-sans antialiased scroll-smooth selection:bg-white selection:text-black">
      {/* Premium initial page transition loader - remounts dynamically on swipe-to-refresh */}
      <PageLoader key={refreshKey} />

      {/* Swipe down from the absolute top to trigger luxury loader */}
      <PullToRefresh onRefresh={handleRefresh} />

      {/* Fixed Header */}
      <Header onOpenBooking={() => handleOpenBooking()} />


      {/* Main Sections */}
      <main>
        {/* Full-Screen Slideshow & Slogan */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* Bouncing Logo Section Divider */}
        <div className="relative z-20 -mt-16 mb-8 flex justify-center">
          <button
            onClick={() => {
              const el = document.getElementById('leistungen');
              if (el) {
                const offset = 80; // header height
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = el.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth',
                });
              }
            }}
            className="animate-bounce cursor-pointer group flex flex-col items-center"
            aria-label="Scroll zu den Leistungen"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-white p-0.5 shadow-2xl transition-all duration-300 group-hover:border-white/30 group-hover:scale-105 flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Puro Detail Logo" 
                className="w-full h-full object-contain rounded-full transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "/src/assets/images/puro_detail_final_logo_1784651444302.jpg";
                }}
              />
            </div>
          </button>
        </div>

        {/* Structured Services Grid */}
        <Services onOpenBooking={handleOpenBooking} />

        {/* Before/After Interactive Compare Slider */}
        <CompareSlider />

        {/* Location, Philosophy, Hours, Maps */}
        <About />
      </main>

      {/* Structured Legal Footer */}
      <Footer />

      {/* Interactive Booking Overlay */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedServiceId={preselectedService}
      />
    </div>
  );
}
