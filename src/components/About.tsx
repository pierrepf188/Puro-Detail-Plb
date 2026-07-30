import { MapPin, Phone, Mail, Clock, ShieldCheck, Award, ThumbsUp } from 'lucide-react';

export default function About() {
  return (
    <section
      id="ueber-uns"
      className="py-24 md:py-32 bg-[#121214] text-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-sans font-extralight tracking-[0.18em] uppercase text-white">
              Über Puro Detail
            </h2>
            <div className="h-[1px] w-20 bg-white/20 mt-5" />
          </div>
        </div>

        {/* Layout: Info Columns Left, Google Map Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Detailed Studio Philosophy & Details (7 Columns) */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6">
              <p className="text-zinc-300 font-sans text-sm md:text-base leading-relaxed">
                Egal ob Innenreinigung, Lackaufbereitung oder komplette Fahrzeugpflege – bei uns bekommt dein Auto die Pflege, die es verdient.
              </p>
              
              <ul className="space-y-3 font-sans text-sm md:text-base text-zinc-300">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-white/60 rounded-full"></span>
                  <span>Gründliche Innenreinigung</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-white/60 rounded-full"></span>
                  <span>Professionelle Außenaufbereitung</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-white/60 rounded-full"></span>
                  <span>Individuelle Pakete für jedes Fahrzeug</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-white/60 rounded-full"></span>
                  <span>Reparaturen & Steinschlag-Service</span>
                </li>
              </ul>

              <div className="pt-4 space-y-2 font-sans text-sm md:text-base text-zinc-400">
                <p>Transparente Preise – keine Überraschungen</p>
                <p>Qualität bis ins Detail</p>
              </div>

              <p className="text-white font-sans font-medium text-sm md:text-base pt-4 tracking-wide">
                Jetzt Termin sichern & dein Fahrzeug wieder zum Strahlen bringen!
              </p>
            </div>

            {/* Address & Opening Hours List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
              
              {/* Kontakt-Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                  Anschrift & Kontakt
                </h4>
                <div className="space-y-3 font-sans text-sm text-zinc-300">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-zinc-300 shrink-0" />
                    <span>Im Steinkamp 13-15, 58840 Plettenberg</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span className="font-mono">+49 (0) 2391 123456</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span className="font-mono">info@puro-detail.de</span>
                  </div>
                </div>
              </div>

              {/* Öffnungszeiten */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                  Öffnungszeiten
                </h4>
                <div className="space-y-2 font-sans text-sm text-zinc-300">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Montag - Freitag:</span>
                    </span>
                    <span className="font-mono">08:00 - 18:00 Uhr</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>Samstag:</span>
                    <span className="font-mono">09:00 - 14:00 Uhr</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Sonntag:</span>
                    <span className="font-mono font-medium">Geschlossen</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Styled Google Maps Container (5 Columns) */}
          <div className="lg:col-span-5 w-full space-y-4">
            <div className="relative w-full aspect-[4/3] sm:aspect-square bg-zinc-950 rounded-sm border border-white/10 overflow-hidden group shadow-xl">
              
              {/* Google Maps Real Iframe Embed with specific location search */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10000!2d7.869551712211933!3d51.20976897161821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b950ffbf150bf9%3A0xdd31c005d180d7d5!2sIm%20Steinkamp%2013-15%2C%2058840%20Plettenberg!5e0!3m2!1sde!2sde!4v1710000000000!5m2!1sde!2sde"
                className="w-full h-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Puro Detail Standort Plettenberg"
              />

              {/* Styled dark frame bezel */}
              <div className="absolute inset-0 border-4 border-[#121214] pointer-events-none" />
              
              {/* Floating location tag card */}
              <div className="absolute top-4 left-4 bg-[#121214]/90 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-sm pointer-events-none flex items-center space-x-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-white uppercase">
                  Puro Detail
                </span>
              </div>
            </div>

            {/* Sub-label directions guidance */}
            <div className="flex justify-center pt-1">
              <a
                href="https://www.google.com/maps/place/Im+Steinkamp+13-15,+58840+Plettenberg/@51.2096458,7.8716708,20.5z/data=!4m15!1m8!3m7!1s0x47b951ac4fa6dff5:0x1c2760ffab259dd0!2s58840+Plettenberg!3b1!8m2!3d51.2197462!4d7.8590561!16s%2Fg%2F1vn17mg2!3m5!1s0x47b950ffbf150bf9:0xdd31c005d180d7d5!8m2!3d51.209769!4d7.8717404!16s%2Fg%2F11v5t5ngc7?entry=ttu"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-400 hover:text-white border border-white/5 bg-zinc-900/40 hover:bg-zinc-800/80 transition-all duration-300 rounded-sm font-semibold active:scale-95"
              >
                ➔ Route in Google Maps planen
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
