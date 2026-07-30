import { useState } from 'react';
import { ShieldAlert, Scale, X, HelpCircle } from 'lucide-react';

export default function Footer() {
  const [modalType, setModalType] = useState<'impressum' | 'datenschutz' | null>(null);

  return (
    <footer className="relative bg-[#0d0d0f] border-t border-white/5 py-16 text-zinc-500 font-sans text-xs">
      
      {/* Decorative colored pixel strip indicating craftsmanship */}
      <div className="absolute top-0 left-0 right-0 h-[1px] flex">
        <span className="w-1/3 h-full bg-[#2EBE59]/30"></span>
        <span className="w-1/3 h-full bg-white/20"></span>
        <span className="w-1/3 h-full bg-[#E53E3E]/30"></span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-12 border-b border-white/5">
          
          {/* Brand block with Logo */}
          <div className="flex items-center space-x-3">
            {/* Circular Logo Image */}
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-white p-0.5 shadow-md">
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
            
            <div className="space-y-1">
              <div className="text-sm font-sans tracking-widest font-extrabold text-white">
                PURO <span className="text-zinc-500">DETAIL</span>
              </div>
              <p className="max-w-md text-zinc-600 text-[10px] leading-relaxed">
                Exklusives Car Detailing & Fahrzeugaufbereitung in Plettenberg. Premium-Pflege, Lackveredelung und Keramikversiegelung für perfekten Glanz und Werterhalt.
              </p>
            </div>
          </div>

          {/* Links block */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-widest font-mono">
            <button
              onClick={() => setModalType('impressum')}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Impressum</span>
            </button>
            <button
              onClick={() => setModalType('datenschutz')}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Datenschutz</span>
            </button>
          </div>

        </div>

        {/* Copy Area with elegant typography */}
        <div className="pt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-zinc-600 text-[11px]">
          <p>© {new Date().getFullYear()} Puro Detail. Alle Rechte vorbehalten.</p>
          <p className="font-mono">
            Handwerk aus Plettenberg (58840)
          </p>
        </div>
      </div>

      {/* COMPLIANT LEGAL DIALOGS (IMPRINT / PRIVACY) */}
      {modalType && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div onClick={() => setModalType(null)} className="fixed inset-0 bg-black/85 backdrop-blur-sm" />
          
          <div className="relative bg-[#121214] border border-white/10 w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden z-10 max-h-[80vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-zinc-950/40">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                {modalType === 'impressum' ? 'Rechtliche Informationen (Impressum)' : 'Datenschutzerklärung'}
              </span>
              <button
                onClick={() => setModalType(null)}
                className="text-zinc-500 hover:text-white p-1 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 md:p-8 space-y-6 text-zinc-300 text-xs sm:text-sm font-sans overflow-y-auto leading-relaxed">
              
              {modalType === 'impressum' ? (
                <>
                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider">Angaben gemäß § 5 TMG</h3>
                    <p>
                      Purodetail Alessio Catania<br />
                      Im Steinkamp 13-15<br />
                      58840 Plettenberg<br />
                      Deutschland
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider">Vertreten durch</h3>
                    <p>Catania Alessio Davide</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider">Kontakt</h3>
                    <p>
                      Telefon: +49 (0) 2391 123456<br />
                      E-Mail: info@puro-detail.de
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider">Steuernummer &amp; Umsatzsteuer-ID</h3>
                    <p>
                      Steuernummer: 30250164280<br />
                      Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                      DE458764088
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider">Streitschlichtung</h3>
                    <p>
                      Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                      <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer" className="text-white underline ml-1">
                        https://ec.europa.eu/consumers/odr
                      </a>.<br />
                      Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider">1. Datenschutz auf einen Blick</h3>
                    <p>
                      Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider">2. Datenerfassung auf unserer Website</h3>
                    <p>
                      <strong>Wie erfassen wir Ihre Daten?</strong><br />
                      Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in unser Buchungsanfrage-Formular eingeben (Name, E-Mail, Telefonnummer, Fahrzeugklasse).
                    </p>
                    <p>
                      <strong>Wofür nutzen wir Ihre Daten?</strong><br />
                      Die Daten werden ausschließlich zur Kontaktaufnahme bzgl. Ihrer gewünschten Car-Detailing Leistungen verwendet. Es erfolgt keine Weitergabe an unbefugte Dritte.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider">3. Ihre Rechte</h3>
                    <p>
                      Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenden Sie sich hierzu an info@puro-detail.de.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider">4. Hosting &amp; Server-Logs</h3>
                    <p>
                      Der Provider dieser Webseiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt (IP-Adresse, Browsertyp, Betriebssystem). Dies dient dem stabilen Betrieb unserer Präsentation.
                    </p>
                  </div>
                </>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/5 bg-zinc-950/40 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-sans font-bold uppercase tracking-widest cursor-pointer rounded-sm"
              >
                Verstanden
              </button>
            </div>

          </div>
        </div>
      )}

    </footer>
  );
}
