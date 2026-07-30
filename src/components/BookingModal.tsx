import React, { useState } from 'react';
import { SERVICES } from '../data/services';
import { X, Calendar, User, Mail, Phone, Car, Clock, Sparkles } from 'lucide-react';
import { BookingState } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export default function BookingModal({ isOpen, onClose, preselectedServiceId }: BookingModalProps) {
  const [formData, setFormData] = useState<BookingState>({
    name: '',
    email: '',
    phone: '',
    serviceId: preselectedServiceId || SERVICES[0].id,
    carSize: 'Coupe/Sedan',
    date: '',
    time: '',
    message: '',
  });

  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(
    preselectedServiceId ? [preselectedServiceId] : [SERVICES[0].id]
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Reset success state and sync preselected service when opening the modal
  React.useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      if (preselectedServiceId) {
        setSelectedServiceIds([preselectedServiceId]);
      } else {
        setSelectedServiceIds([SERVICES[0].id]);
      }
    }
  }, [isOpen, preselectedServiceId]);

  if (!isOpen) return null;

  const activeServices = SERVICES.filter(s => selectedServiceIds.includes(s.id));

  const calculateTotal = () => {
    let sum = 0;
    let hasAufAnfrage = false;
    activeServices.forEach(s => {
      if (s.price.toLowerCase().includes('anfrage')) {
        hasAufAnfrage = true;
      } else {
        const num = parseInt(s.price.replace(/[^0-9]/g, ''), 10);
        if (!isNaN(num)) {
          sum += num;
        }
      }
    });
    if (sum === 0 && hasAufAnfrage) return 'auf Anfrage';
    return `ab ${sum} €${hasAufAnfrage ? ' + auf Anfrage' : ''}`;
  };

  const totalEstimate = calculateTotal();

  const handleServiceToggle = (id: string) => {
    setSelectedServiceIds(prev => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one selected
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate real-time API call
    const refCode = 'PD-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(refCode);
    setIsSuccess(true);

    const servicesListString = activeServices.map(s => `- ${s.name} (${s.price})`).join('\n');

    // Build prefilled mailto email
    const emailSubject = `Puro Detail Terminanfrage [${refCode}] - ${formData.name}`;
    const emailBody = `Hallo Puro Detail Team,

ich möchte hiermit eine Terminanfrage senden:

Name: ${formData.name}
E-Mail: ${formData.email}
Telefon: ${formData.phone}
Fahrzeugklasse: ${formData.carSize}

Gewählte Leistungen:
${servicesListString}

Gesamt-Richtpreis: ${totalEstimate}

Datum: ${formData.date}
Uhrzeit: ${formData.time} Uhr

Zusätzliche Wünsche / Fahrzeug-Modell:
${formData.message || 'Keine Angabe'}

Mit freundlichen Grüßen,
${formData.name}`;

    const mailtoUrl = `mailto:info@purodetail.de?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Trigger mail client redirect
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative bg-[#16161a] border border-white/10 w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden z-10 transition-all duration-300 transform scale-100">
        
        {/* Subtle accent line at top of popup */}
        <div className="h-[1px] bg-white/20 w-full" />

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-zinc-950/40">
          <div>
            <h3 className="text-lg md:text-xl font-sans font-extrabold text-white uppercase tracking-wider">
              {isSuccess ? 'Anfrage Bestätigt' : 'Terminanfrage Sichern'}
            </h3>
            <p className="text-xs text-zinc-400 font-sans mt-1">
              {isSuccess ? 'Ihr Fahrzeug ist in besten Händen.' : 'Premium-Fahrzeugaufbereitung Puro Detail.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-sans font-extrabold text-white">
                Vielen Dank, {formData.name}!
              </h4>
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                Wir haben Ihre Terminanfrage erhalten. Wir melden uns innerhalb der nächsten 2 Stunden telefonisch bei Ihnen.
              </p>
            </div>

            {/* Custom high-end ticket code */}
            <div className="bg-zinc-950 p-6 rounded-sm border border-white/5 inline-block text-left max-w-md w-full mx-auto font-mono text-xs text-zinc-400 space-y-3 shadow-inner">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Vorgangsnummer:</span>
                <span className="text-white font-bold">{bookingRef}</span>
              </div>
              <div className="flex flex-col gap-1 border-b border-white/5 pb-2">
                <span className="text-zinc-500">Gewählte Leistungen:</span>
                <div className="pl-2 space-y-1 text-white font-semibold">
                  {activeServices.map(s => (
                    <div key={s.id} className="flex justify-between text-[11px]">
                      <span>• {s.name}</span>
                      <span className="text-zinc-400 font-normal">{s.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <span>Fahrzeugklasse:</span>
                <span className="text-zinc-300">{formData.carSize}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/5">
                <span>Terminwunsch:</span>
                <span className="text-white">{formData.date} um {formData.time} Uhr</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>Voraussichtlicher Gesamtpreis:</span>
                <span className="text-white font-bold text-sm">{totalEstimate}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-sans font-bold tracking-widest uppercase rounded-sm transition-colors cursor-pointer"
              >
                Ansicht schließen
              </button>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setSelectedServiceIds([SERVICES[0].id]);
                }}
                className="px-6 py-3 border border-white/10 hover:border-white text-white text-xs font-sans font-bold tracking-widest uppercase rounded-sm transition-colors cursor-pointer"
              >
                Weitere Anfrage senden
              </button>
            </div>
          </div>
        ) : (
          /* Dynamic Form */
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            
            {/* Core details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                  <User className="w-3 h-3 text-zinc-400" /> Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="z.B. Lars Hedderich"
                  className="w-full bg-zinc-900 border border-white/10 rounded-sm py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white font-sans"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-zinc-400" /> E-Mail *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@beispiel.de"
                  className="w-full bg-zinc-900 border border-white/10 rounded-sm py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white font-sans"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-zinc-400" /> Telefon *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+49 170 1234567"
                  className="w-full bg-zinc-900 border border-white/10 rounded-sm py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white font-sans"
                />
              </div>

              {/* Car Classification */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                  <Car className="w-3 h-3 text-zinc-400" /> Fahrzeugklasse *
                </label>
                <select
                  value={formData.carSize}
                  onChange={e => setFormData({ ...formData, carSize: e.target.value as any })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-sm py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-white"
                >
                  <option value="Coupe/Sedan">Coupé / Limousine (z.B. Porsche 911)</option>
                  <option value="SUV/Combi">Kombi / SUV (z.B. Audi RS6 Avant)</option>
                  <option value="Sport/Supercar">Hypersportwagen / Exoten</option>
                </select>
              </div>

            </div>

            {/* Service Selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 flex justify-between items-center">
                <span>Gewählte Serviceleistungen (Mehrfachauswahl möglich) *</span>
                <span className="text-[9px] text-zinc-500 font-sans normal-case">Ausgewählt: {selectedServiceIds.length}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((serv) => {
                  const isSelected = selectedServiceIds.includes(serv.id);
                  return (
                    <div
                      key={serv.id}
                      onClick={() => handleServiceToggle(serv.id)}
                      className={`p-3.5 border rounded-sm cursor-pointer transition-all duration-300 flex justify-between items-center ${
                        isSelected
                          ? 'border-white bg-white/5'
                          : 'border-white/5 bg-zinc-900 hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <h4 className="text-xs font-sans font-bold text-white leading-none">
                          {serv.name}
                        </h4>
                        <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
                          {serv.price} • {serv.duration}
                        </span>
                      </div>
                      <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-colors ${
                        isSelected ? 'border-white bg-white' : 'border-zinc-700'
                      }`}>
                        {isSelected && (
                          <svg className="w-2.5 h-2.5 text-black stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Date & Time Choice */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" /> Wunschdatum *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-sm py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-white font-sans"
                />
              </div>

              {/* Time */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" /> Wunschuhrzeit *
                </label>
                <select
                  required
                  value={formData.time}
                  onChange={e => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-sm py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-white font-sans"
                >
                  <option value="">Uhrzeit wählen...</option>
                  <option value="08:30">08:30 Uhr</option>
                  <option value="10:00">10:00 Uhr</option>
                  <option value="13:00">13:00 Uhr</option>
                  <option value="15:30">15:30 Uhr</option>
                </select>
              </div>

            </div>

            {/* Comments */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">
                Zusätzliche Wünsche / Fahrzeug-Modell (Optional)
              </label>
              <textarea
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="z.B. Porsche 911 (992) Carrera 4S, Erstzulassung 2023, Farbe Achatgrau-Metallic..."
                rows={3}
                className="w-full bg-zinc-900 border border-white/10 rounded-sm py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-white font-sans resize-none"
              />
            </div>

            {/* Summary Price estimate banner */}
            <div className="bg-zinc-950 p-4 border border-white/5 rounded-sm flex justify-between items-center text-xs">
              <span className="font-sans text-zinc-400 uppercase tracking-wider">
                Unverbindlicher Gesamt-Richtpreis ({formData.carSize}):
              </span>
              <span className="font-mono text-white text-base font-bold">
                {totalEstimate}
              </span>
            </div>

            {/* Consent and Submit buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-1/3 py-4 border border-white/10 hover:border-zinc-700 text-zinc-400 hover:text-white text-xs font-sans font-bold tracking-widest uppercase rounded-sm transition-colors cursor-pointer"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="w-full sm:w-2/3 py-4 bg-white text-black text-xs font-sans font-extrabold tracking-widest uppercase rounded-sm hover:bg-zinc-200 hover:shadow-lg transition-all duration-300 cursor-pointer text-center active:scale-95"
              >
                Anfrage verbindlich senden
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
