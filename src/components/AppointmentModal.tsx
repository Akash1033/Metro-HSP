import React from 'react';
import { X } from 'lucide-react';
import { AppointmentBookingForm } from './AppointmentBookingForm';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoctorName?: string;
  initialDepartmentName?: string;
  initialDate?: string;
  initialTime?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialDoctorName,
  initialDepartmentName,
  initialDate,
  initialTime,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-auto animate-in zoom-in-95 duration-200">
        {/* Close Button top-right */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 z-20 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Embedded Booking Form */}
        <AppointmentBookingForm
          initialDepartment={initialDepartmentName}
          initialDoctor={initialDoctorName}
          initialDate={initialDate}
          initialTime={initialTime}
          onClose={onClose}
          formId="modal-appointment-form"
        />
      </div>
    </div>
  );
};
