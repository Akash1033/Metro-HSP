import React from 'react';
import { X, Play, ShieldCheck, Sparkles, MapPin, Phone, Calendar } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface TourVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const TourVideoModal: React.FC<TourVideoModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-slate-900 text-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-800 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0875E1]/20 border border-[#0875E1]/40 flex items-center justify-center text-[#0875E1]">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Inside Metro Multispeciality Hospital
              </h3>
              <p className="text-[11px] text-slate-400">
                Reception, Inpatient Wards & Modern Infrastructure
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video / Visual Showcase Container */}
        <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center group">
          <img
            src="/images/contact/reception_clean.jpg"
            alt="Metro Hospital Reception Tour"
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
          />

          {/* Ambient Lighting Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

          {/* Floating Badge */}
          <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-sm border border-slate-700/60 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-200 font-medium">Virtual Campus Overview</span>
          </div>

          {/* Interactive Info overlay in video player */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-xs">
            <div>
              <h4 className="text-base font-bold text-white mb-0.5">
                Main Reception & Outpatient Hall
              </h4>
              <p className="text-slate-300 text-xs flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0875E1]" />
                Ground Floor, Metro Multispeciality Hospital, Ludhiana
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-[#0875E1]/80 rounded-md font-semibold text-[11px]">
                NABH Standards
              </span>
              <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-md font-semibold text-[11px]">
                100% Sanitized
              </span>
            </div>
          </div>
        </div>

        {/* Footer info & Actions */}
        <div className="p-5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#0875E1] shrink-0" />
            <span>Strict hygiene protocols, 24/7 security & patient-first guidance</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`tel:${HOSPITAL_INFO.phoneTel}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Reception: {HOSPITAL_INFO.phoneFormatted}</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2 bg-[#0875E1] hover:bg-[#0662be] text-white text-xs font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/20"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
