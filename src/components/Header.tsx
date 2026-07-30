import { useState, useEffect } from 'react';
import { Menu, X, Instagram } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
}

export default function Header({ onOpenBooking }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('startseite');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection based on scroll position
      const sections = ['startseite', 'leistungen', 'referenzen', 'ueber-uns'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#121214]/85 backdrop-blur-md border-b border-white/5 py-4 shadow-lg shadow-black/20'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between">
        {/* Logo-Bereich */}
        <div 
          onClick={() => scrollToSection('startseite')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          {/* Circular Logo Image */}
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/15 flex-shrink-0 bg-white p-0.5 shadow-md transition-transform duration-300 group-hover:scale-105">
            <img 
              src="/logo.png" 
              alt="Puro Detail Logo" 
              className="w-full h-full object-contain rounded-full"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "/src/assets/images/puro_detail_final_logo_1784651444302.jpg";
              }}
            />
          </div>
          
          <div className="flex flex-col">
            <span className="text-lg font-sans font-light tracking-[0.3em] text-white uppercase transition-colors duration-300">
              PURO <span className="text-zinc-500 group-hover:text-white transition-colors">DETAIL</span>
            </span>
            <span className="text-[8px] font-mono tracking-[0.4em] text-zinc-500 uppercase mt-0.5">
              Plettenberg
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {[
            { id: 'startseite', label: 'Startseite' },
            { id: 'leistungen', label: 'Leistungen' },
            { id: 'referenzen', label: 'Referenzen' },
            { id: 'ueber-uns', label: 'Über uns' },
          ].map((navItem) => (
            <button
              key={navItem.id}
              onClick={() => scrollToSection(navItem.id)}
              className={`text-[11px] font-sans font-light tracking-[0.25em] uppercase transition-all duration-300 relative py-2 cursor-pointer ${
                activeSection === navItem.id
                  ? 'text-white font-medium'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {navItem.label}
            </button>
          ))}

          {/* Instagram Button right next to Über uns */}
          <a
            href="https://www.instagram.com/purodetail_official/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer group"
            title="Puro Detail auf Instagram"
            aria-label="Instagram Profile"
          >
            <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
          </a>
        </nav>

        {/* CTA Button Header */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 bg-transparent border border-white/20 text-white text-[10px] font-sans font-light tracking-[0.2em] uppercase rounded-none hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
          >
            Termin anfragen
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-zinc-300 hover:text-white p-2 cursor-pointer"
          aria-label="Menü öffnen"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-[#121214] z-40 border-t border-white/5 flex flex-col justify-between px-6 py-12 transition-all duration-300">
          <div className="flex flex-col space-y-6">
            {/* Mobile Navigation Links */}
            {[
              { id: 'startseite', label: 'Startseite' },
              { id: 'leistungen', label: 'Leistungen' },
              { id: 'referenzen', label: 'Referenzen' },
              { id: 'ueber-uns', label: 'Über uns' },
            ].map((navItem) => (
              <button
                key={navItem.id}
                onClick={() => scrollToSection(navItem.id)}
                className={`text-left text-xl font-sans font-extralight uppercase tracking-[0.18em] py-3 border-b border-white/5 cursor-pointer transition-colors ${
                  activeSection === navItem.id
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {navItem.label}
              </button>
            ))}
            {/* Instagram Link in Mobile Menu */}
            <a
              href="https://www.instagram.com/purodetail_official/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-xl font-sans font-extralight uppercase tracking-[0.18em] py-3 border-b border-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <Instagram className="w-5 h-5 text-zinc-400" />
              <span>Instagram</span>
            </a>
          </div>

          <div className="flex flex-col space-y-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-4 bg-transparent border border-white/20 text-white text-center font-sans text-xs font-light uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer shadow-lg"
            >
              Jetzt Termin buchen
            </button>
            <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span>Puro Detail Plettenberg</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
