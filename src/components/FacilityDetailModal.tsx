import React from 'react';
import { X, Clock, CheckCircle2, Phone, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { FacilityItem } from '../types';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface FacilityDetailModalProps {
  facility: FacilityItem | null;
  onClose: () => void;
  onOpenBooking: (doctorName?: string, departmentName?: string) => void;
  language: 'en' | 'pa';
}

export const FacilityDetailModal: React.FC<FacilityDetailModalProps> = ({
  facility,
  onClose,
  onOpenBooking,
  language,
}) => {
  if (!facility) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo Header */}
        <div className="relative h-48 sm:h-56 bg-slate-100 overflow-hidden shrink-0">
          {facility.image ? (
            <img
              src={facility.image}
              alt={facility.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: facility.bgTint }}
            >
              <span className="text-4xl font-bold" style={{ color: facility.themeColor }}>
                {facility.title}
              </span>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Title on Image */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md bg-white"
              style={{ color: facility.themeColor }}
            >
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-white/80 bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full mb-1">
                Hospital Facility
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {facility.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Hours & Availability Pill */}
          {facility.hours && (
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-blue-50/70 border border-blue-100/80 rounded-xl text-xs sm:text-[13px] text-[#08284B]">
              <Clock className="w-4 h-4 text-[#0875E1] shrink-0" />
              <span>
                <strong>Operating Schedule:</strong> {facility.hours}
              </span>
            </div>
          )}

          {/* Detailed Description */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Overview
            </h3>
            <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
              {facility.detailedDescription || facility.description}
            </p>
          </div>

          {/* Key Features */}
          {facility.keyFeatures && facility.keyFeatures.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Key Features & Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {facility.keyFeatures.map((feat, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs sm:text-[13px] text-slate-700"
                  >
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: facility.themeColor }}
                    />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Emergency / Contact Notice */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-center justify-between gap-4 text-xs sm:text-sm">
            <div>
              <p className="font-bold text-amber-950">Immediate Assistance Required?</p>
              <p className="text-amber-800 text-xs">Call our 24/7 emergency medical desk at any time.</p>
            </div>
            <a
              href={`tel:${HOSPITAL_INFO.phoneTel}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E53935] hover:bg-[#D32F2F] text-white font-semibold text-xs shrink-0 transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{HOSPITAL_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition-colors"
          >
            Close Details
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenBooking(undefined, facility.title);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0875E1] hover:bg-[#0662be] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-[0_2px_8px_rgba(8,117,225,0.25)] hover:shadow-[0_4px_12px_rgba(8,117,225,0.35)]"
          >
            <Calendar className="w-4 h-4" />
            <span>Book an Appointment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
