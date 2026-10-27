import React from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { ColorStripe } from './ColorStripe';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface LocationSectionProps {
  language: 'en' | 'pa';
}

export const LocationSection: React.FC<LocationSectionProps> = ({ language }) => {
  return (
    <section id="contact" className="py-14 md:py-18 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold tracking-wider text-[#08284B] uppercase">
              {language === 'pa' ? 'ਸਾਡਾ ਪਤਾ —' : 'OUR LOCATION —'}
            </span>
          </div>
          <ColorStripe width="w-20" className="mb-2" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08284B] tracking-tight">
            {language === 'pa'
              ? 'ਮੈਟਰੋ ਮਲਟੀਸਪੈਸ਼ਲਿਟੀ ਹਸਪਤਾਲ ਆਓ'
              : 'Visit Metro Multispeciality Hospital'}
          </h2>
        </div>

        {/* 3 Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Box 1: Address & Contacts */}
          <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-6 sm:p-7 flex flex-col justify-center space-y-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#0875E1] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Location
                </h4>
                <p className="text-sm font-bold text-[#08284B] leading-snug">
                  {HOSPITAL_INFO.address}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#0875E1] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Phone className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Helpline / Emergency
                </h4>
                <a
                  href={`tel:${HOSPITAL_INFO.phoneTel}`}
                  className="text-base font-bold text-[#08284B] hover:text-[#0875E1] transition-colors leading-snug"
                >
                  {HOSPITAL_INFO.phoneFormatted}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#0875E1] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Working Hours
                </h4>
                <p className="text-sm font-bold text-[#08284B] leading-snug">
                  {HOSPITAL_INFO.operatingHours}
                </p>
              </div>
            </div>

          </div>

          {/* Box 2: Google Maps Embed */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group bg-slate-100 min-h-[250px] sm:min-h-[280px]">
            <iframe
              src={HOSPITAL_INFO.googleMapsEmbedUrl}
              title="Metro Multispeciality Hospital Location Map"
              width="100%"
              height="100%"
              className="w-full h-full min-h-[250px] sm:min-h-[280px] border-0"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                'Metro Multispeciality Hospital, Pahwa Rd, near Neela Jhanda Gurudwara, New Shivaji Nagar, New Hargobind Nagar, Ludhiana, Punjab 141008'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm text-[#0875E1] text-[11px] font-bold shadow-md hover:bg-white transition-all z-10"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Box 3: Hospital Interior Reception Photo */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group bg-slate-50 min-h-[220px]">
            <img
              src="/images/hospital_interior.jpg"
              alt="Metro Multispeciality Hospital Reception & Waiting Lounge"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 right-4 text-white pointer-events-none">
              <span className="text-[11px] font-semibold bg-[#08284B]/70 px-2 py-0.5 rounded backdrop-blur-sm">
                Reception & Patient Care Desk
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
