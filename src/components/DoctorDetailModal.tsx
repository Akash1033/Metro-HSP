import React from 'react';
import { X, Calendar, Award, Clock, CheckCircle } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorDetailModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBookWithDoctor: (doctorName: string, departmentName: string) => void;
}

export const DoctorDetailModal: React.FC<DoctorDetailModalProps> = ({
  doctor,
  onClose,
  onBookWithDoctor,
}) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
        
        {/* Header with Doctor Image & Name */}
        <div className="bg-[#08284B] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/10 shrink-0 border-2 border-white/20">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">{doctor.name}</h3>
              <p className="text-xs text-blue-200 font-medium mt-0.5">{doctor.specialty}</p>
              <p className="text-[11px] text-slate-300 mt-1">{doctor.qualification}</p>
              <span className="inline-block mt-1 text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-blue-100">
                {doctor.pmcNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          <div>
            <h4 className="font-bold text-[#08284B] uppercase tracking-wider text-[11px] mb-1">
              Clinical Specialization
            </h4>
            <p className="text-slate-600 leading-relaxed">{doctor.experience}</p>
          </div>

          <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-slate-700">
              <Clock className="w-4 h-4 text-[#0875E1] shrink-0" />
              <span>
                <strong>OPD Timings:</strong> {doctor.timing || '10:00 AM - 02:00 PM'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Days:</strong> {doctor.availableDays?.join(', ') || 'Monday - Saturday'}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookWithDoctor(doctor.name, doctor.department);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#0875E1] hover:bg-[#0766c6] text-white font-bold rounded-lg shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment with {doctor.name}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
