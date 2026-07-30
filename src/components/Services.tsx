import { useState } from 'react';
import { SERVICES } from '../data/services';
import { ServiceItem } from '../types';
import * as Icons from 'lucide-react';

interface ServicesProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function Services({ onOpenBooking }: ServicesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAll, setShowAll] = useState<boolean>(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'Alle Leistungen' },
    { id: 'Innen', name: 'Innen' },
    { id: 'Außen', name: 'Außen' },
    { id: 'Pakete', name: 'Pakete' },
    { id: 'Reparaturen', name: 'Reparaturen' },
  ];

  const filteredServices = selectedCategory === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === selectedCategory);

  const visibleServices = selectedCategory === 'all' && !showAll
    ? filteredServices.slice(0, 3)
    : filteredServices;

  // Helper to dynamically render Lucide icons
  const renderIcon = (iconName: string) => {
    // Standardize to matching Lucide icons
    if (iconName === 'Shield') {
      return <Icons.Shield className="w-5 h-5 text-zinc-300" />;
    } else if (iconName === 'Sparkles') {
      return <Icons.Sparkles className="w-5 h-5 text-zinc-300" />;
    } else if (iconName === 'Droplets') {
      return <Icons.Droplets className="w-5 h-5 text-zinc-300" />;
    } else if (iconName === 'Heart') {
      return <Icons.Heart className="w-5 h-5 text-zinc-300" />;
    }
    return <Icons.Wrench className="w-5 h-5 text-zinc-300" />;
  };

  return (
    <section
      id="leistungen"
      className="py-24 md:py-32 bg-[#121214] text-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header with generous Whitespace */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-sans font-extralight tracking-[0.18em] uppercase text-white">
              Unsere exklusiven Leistungen
            </h2>
            <div className="h-[1px] w-20 bg-white/20 mt-5" />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-white/5 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setShowAll(false);
              }}
              className={`px-5 py-2 text-xs font-sans tracking-widest uppercase transition-all duration-300 rounded-sm cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-zinc-800 text-white border-b border-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* CSS Grid System - Responsive and precise spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {visibleServices.map((service: ServiceItem) => {
            const isHovered = hoveredCard === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-[#18181c] border border-white/5 p-8 rounded-sm hover:border-zinc-800 transition-all duration-300 flex flex-col justify-between shadow-md"
              >
                <div>
                  {/* Category & Icon Row */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase px-2 py-1 bg-zinc-900 border border-white/5 rounded-sm">
                      {service.category}
                    </span>
                    <div className="p-2.5 bg-zinc-900/60 rounded-sm border border-white/5">
                      {renderIcon(service.iconName)}
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl md:text-2xl font-sans font-bold mb-3 tracking-tight group-hover:text-white transition-colors">
                    {service.name}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs font-sans font-medium text-zinc-400 tracking-wide mb-4">
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-zinc-500 font-sans text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Visual Bullet Points */}
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-xs font-sans text-zinc-400">
                        <span className="mr-2 text-zinc-500 font-bold">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Meta & Price Actions */}
                <div className="border-t border-white/5 pt-6 mt-auto flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                      Dauer / Preis
                    </span>
                    <div className="flex items-baseline space-x-2 mt-1">
                      <span className="text-zinc-400 font-mono text-xs">{service.duration}</span>
                      <span className="text-zinc-600 font-mono text-xs">•</span>
                      <span className="text-white font-mono text-sm font-semibold">{service.price}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenBooking(service.id)}
                    className="px-4 py-2 bg-transparent border border-white/10 text-white text-[10px] font-sans tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer rounded-sm active:scale-95"
                  >
                    Details & Buchen
                  </button>
                </div>

                {/* Exquisite Corner Indicator on Hover */}
                <div
                  className={`absolute top-0 right-0 w-1.5 h-1.5 bg-white/40 transition-all duration-300 ${
                    isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Show More Arrow Button */}
        {selectedCategory === 'all' && filteredServices.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex flex-col items-center gap-2 group text-xs font-sans tracking-[0.25em] uppercase text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <span>{showAll ? 'Weniger anzeigen' : 'Weitere Leistungen anzeigen'}</span>
              <div className="p-3 bg-zinc-900 border border-white/5 rounded-full transition-transform duration-300 group-hover:scale-110 flex items-center justify-center mt-1">
                {showAll ? (
                  <Icons.ChevronUp className="w-4 h-4 text-white" />
                ) : (
                  <Icons.ChevronDown className="w-4 h-4 text-white animate-bounce" />
                )}
              </div>
            </button>
          </div>
        )}

        {/* Small-print line matching the price list image */}
        <p className="text-right text-[10px] font-mono text-zinc-500 uppercase mt-4 tracking-wider">
          Preise zzgl. MwSt. • Anfragen an info@purodetail.de
        </p>



      </div>
    </section>
  );
}
