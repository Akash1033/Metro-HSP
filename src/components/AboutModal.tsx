import React from 'react';
import { X, CheckCircle, Building2, Users, ShieldCheck, HeartHandshake } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onBookAppointment,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#08284B] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-xl font-bold text-white">About Metro Multispeciality Hospital</h3>
          <p className="text-xs text-blue-200 mt-1">We Cure With Care · Pahwa Rd, Ludhiana</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto text-xs sm:text-[13px] text-slate-600">
          <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200">
            <img
              src="/images/hospital_about.jpg"
              alt="Hospital Exterior"
              className="w-full h-48 object-cover"
            />
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#08284B] mb-2">Our Healthcare Philosophy</h4>
            <p className="leading-relaxed">
              {HOSPITAL_INFO.aboutText} Established with a dedication to clinical excellence, Metro Multispeciality Hospital brings together experienced consultants, modern operating theatres, digital diagnostic systems, and responsive 24/7 emergency medical teams.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#0875E1] shrink-0" />
              <div>
                <strong className="block text-slate-800 text-xs">Patient Safety First</strong>
                <span className="text-[11px] text-slate-500">Strict infection control & NABH compliance protocols</span>
              </div>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-start gap-2.5">
              <HeartHandshake className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong className="block text-slate-800 text-xs">Transparent Care</strong>
                <span className="text-[11px] text-slate-500">Ethical consultations with clear medical guidance</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onBookAppointment();
              }}
              className="w-full py-3 bg-[#0875E1] hover:bg-[#0766c6] text-white font-bold rounded-lg shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              Book an Appointment
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
