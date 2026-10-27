import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Layers,
  Stethoscope,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS, TIME_SLOTS, HOSPITAL_INFO } from '../data/hospitalData';
import { AppointmentRecord } from '../types';

interface AppointmentBookingFormProps {
  initialDepartment?: string;
  initialDoctor?: string;
  initialDate?: string;
  initialTime?: string;
  onSuccess?: (appointment: AppointmentRecord) => void;
  onClose?: () => void;
  compact?: boolean;
  formId?: string;
}

export const AppointmentBookingForm: React.FC<AppointmentBookingFormProps> = ({
  initialDepartment = '',
  initialDoctor = '',
  initialDate = '',
  initialTime = '',
  onSuccess,
  onClose,
  compact = false,
  formId = 'appointment-form',
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  // 6 Controlled Form Fields
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [department, setDepartment] = useState(initialDepartment);
  const [preferredDoctor, setPreferredDoctor] = useState(initialDoctor);
  const [preferredDate, setPreferredDate] = useState(initialDate || todayStr);
  const [preferredTime, setPreferredTime] = useState(initialTime || '');

  // UI & Submission States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentRecord | null>(null);

  // Sync initial props
  useEffect(() => {
    if (initialDepartment) setDepartment(initialDepartment);
    if (initialDoctor) setPreferredDoctor(initialDoctor);
    if (initialDate) setPreferredDate(initialDate);
    if (initialTime) setPreferredTime(initialTime);
  }, [initialDepartment, initialDoctor, initialDate, initialTime]);

  // Filter doctors by selected department
  const availableDoctors = department
    ? DOCTORS.filter((d) => d.department === department)
    : [];

  // Reset doctor selection whenever department changes
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setDepartment(selected);
    setPreferredDoctor('');
    if (errors.department) {
      setErrors((prev) => ({ ...prev, department: '' }));
    }
  };

  // Validation function
  const validate = () => {
    const newErrors: Record<string, string> = {};

    // 1. Full Name: required
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter a valid full name';
    }

    // 2. Phone Number: required Indian 10-digit mobile number
    const cleanPhone = phoneNumber.replace(/[\s\-()]/g, '');
    const indianPhoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!indianPhoneRegex.test(cleanPhone)) {
      newErrors.phoneNumber = 'Enter a valid 10-digit number (e.g. 9876543210)';
    }

    // 3. Department: required dropdown
    if (!department) {
      newErrors.department = 'Please select a department';
    }

    // 5. Preferred Date: required date picker, not in past
    if (!preferredDate) {
      newErrors.preferredDate = 'Please select a date';
    } else if (preferredDate < todayStr) {
      newErrors.preferredDate = 'Date cannot be in the past';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const payload = {
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      department: department.trim(),
      preferredDoctor: preferredDoctor ? preferredDoctor.trim() : 'No preference',
      preferredDate,
      preferredTime: preferredTime || 'Any time',
    };

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit appointment request.');
      }

      // Backend accepted the request
      const confirmed: AppointmentRecord = data.appointment;
      setConfirmedBooking(confirmed);
      if (onSuccess) {
        onSuccess(confirmed);
      }
    } catch (err: any) {
      console.error('Appointment booking error:', err);
      setServerError(
        err.message ||
          'Unable to reach appointment service. Please call our hospital desk directly at 090565 79319.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setConfirmedBooking(null);
    setFullName('');
    setPhoneNumber('');
    setDepartment('');
    setPreferredDoctor('');
    setPreferredDate(todayStr);
    setPreferredTime('');
    setErrors({});
    setServerError(null);
  };

  return (
    <div
      id={formId}
      className={`w-full bg-white text-[#64748B] rounded-2xl ${
        compact
          ? 'p-4 sm:p-5 shadow-[0_10px_35px_rgba(8,40,75,0.12)] border border-[#DCE7F5]'
          : 'p-5 sm:p-7 shadow-[0_4px_25px_rgba(8,120,232,0.08)] border border-[#DCE7F5]'
      }`}
    >
      {/* 1. Form Heading with Primary Blue Theme */}
      <div className="flex items-center gap-3 pb-3 mb-3.5 border-b border-[#EFF7FF]">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#EFF7FF] text-[#0878E8] flex items-center justify-center shrink-0 border border-[#DCE7F5] shadow-xs">
          <Calendar className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm sm:text-base font-bold text-[#0B2B50] tracking-tight leading-tight">
            Book an Appointment
          </h2>
          <p className="text-[10.5px] sm:text-xs text-[#64748B] truncate mt-0.5 font-normal">
            Quick scheduling with our expert specialists — same-day slots available
          </p>
        </div>
      </div>

      {/* Server Error Alert (retains fields) */}
      {serverError && (
        <div className="mb-3.5 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-800 text-xs animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1 leading-snug">
            <span className="font-semibold">Notice:</span> {serverError}
          </div>
        </div>
      )}

      {/* 2. Success / Booking Confirmation View */}
      {confirmedBooking ? (
        <div className="space-y-4 py-1 animate-in zoom-in-95 duration-200">
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-200">
              <CheckCircle2 className="w-7 h-7 stroke-[2.2]" />
            </div>
            <span className="inline-block px-2.5 py-0.5 bg-emerald-100/80 text-emerald-800 text-[11px] font-bold rounded-full mb-1">
              Request Received
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-[#0B2B50]">
              Appointment Confirmed!
            </h3>
            <p className="text-xs text-[#64748B] max-w-xs mx-auto mt-1 leading-relaxed">
              Thank you, <strong className="text-[#0B2B50]">{confirmedBooking.fullName}</strong>. Our hospital coordination desk will call you to verify your slot.
            </p>
          </div>

          {/* Appointment Details Box */}
          <div className="bg-[#EFF7FF]/60 border border-[#DCE7F5] rounded-xl p-3.5 space-y-2 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-[#DCE7F5]/80">
              <span className="text-[#64748B]">Reference ID:</span>
              <span className="font-mono font-bold text-[#0878E8] bg-white px-2 py-0.5 rounded border border-[#DCE7F5]">
                {confirmedBooking.id}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11.5px] pt-1">
              <div>
                <span className="text-[#64748B] block text-[10.5px]">Specialty</span>
                <span className="font-semibold text-[#0B2B50] truncate block">{confirmedBooking.department}</span>
              </div>
              <div>
                <span className="text-[#64748B] block text-[10.5px]">Doctor</span>
                <span className="font-semibold text-[#0B2B50] truncate block">
                  {confirmedBooking.preferredDoctor || 'Any Specialist'}
                </span>
              </div>
              <div>
                <span className="text-[#64748B] block text-[10.5px]">Date</span>
                <span className="font-bold text-emerald-700">{confirmedBooking.preferredDate}</span>
              </div>
              <div>
                <span className="text-[#64748B] block text-[10.5px]">Time</span>
                <span className="font-bold text-emerald-700">{confirmedBooking.preferredTime || 'Any time'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#DCE7F5]/80 text-[11px] text-[#0878E8] font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Status: {confirmedBooking.status}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2.5 px-3 bg-[#EFF7FF] hover:bg-blue-100 text-[#0878E8] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Book Another</span>
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-3 bg-[#0B2B50] hover:bg-[#08203c] text-white text-xs font-bold rounded-xl transition-colors text-center cursor-pointer"
              >
                Done
              </button>
            )}
          </div>
        </div>
      ) : (
        /* 3. The 6 Required Fields */
        <form onSubmit={handleSubmit} noValidate className="space-y-2.5 sm:space-y-3">
          
          {/* Responsive Layout: 2 columns on compact / desktop, 1 column on very narrow mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            
            {/* Field 1: Full Name */}
            <div className="space-y-1">
              <label
                htmlFor={`${formId}-fullName`}
                className="block text-[11px] sm:text-[11.5px] font-semibold text-[#0B2B50]"
              >
                Full Name <span className="text-[#0878E8]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#0878E8]">
                  <User className="w-3.5 h-3.5" />
                </div>
                <input
                  id={`${formId}-fullName`}
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  placeholder="Enter your full name"
                  className={`w-full pl-8 pr-2.5 py-1.5 sm:py-2 text-xs text-[#0B2B50] bg-white border rounded-lg placeholder:text-slate-400 focus:outline-none transition-all ${
                    errors.fullName
                      ? 'border-red-400 focus:ring-1 focus:ring-red-400'
                      : 'border-[#DCE7F5] focus:border-[#0878E8] focus:ring-2 focus:ring-[#0878E8]/15'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-[10px] text-red-600 font-medium">{errors.fullName}</p>
              )}
            </div>

            {/* Field 2: Phone Number */}
            <div className="space-y-1">
              <label
                htmlFor={`${formId}-phoneNumber`}
                className="block text-[11px] sm:text-[11.5px] font-semibold text-[#0B2B50]"
              >
                Phone Number <span className="text-[#0878E8]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#0878E8]">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <input
                  id={`${formId}-phoneNumber`}
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: '' });
                  }}
                  placeholder="Enter your phone number"
                  className={`w-full pl-8 pr-2.5 py-1.5 sm:py-2 text-xs text-[#0B2B50] bg-white border rounded-lg placeholder:text-slate-400 focus:outline-none transition-all ${
                    errors.phoneNumber
                      ? 'border-red-400 focus:ring-1 focus:ring-red-400'
                      : 'border-[#DCE7F5] focus:border-[#0878E8] focus:ring-2 focus:ring-[#0878E8]/15'
                  }`}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-[10px] text-red-600 font-medium">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Field 3: Department */}
            <div className="space-y-1">
              <label
                htmlFor={`${formId}-department`}
                className="block text-[11px] sm:text-[11.5px] font-semibold text-[#0B2B50]"
              >
                Department <span className="text-[#0878E8]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#0878E8]">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <select
                  id={`${formId}-department`}
                  value={department}
                  onChange={handleDepartmentChange}
                  className={`w-full pl-8 pr-7 py-1.5 sm:py-2 text-xs text-[#0B2B50] bg-white border rounded-lg appearance-none focus:outline-none transition-all cursor-pointer ${
                    errors.department
                      ? 'border-red-400 focus:ring-1 focus:ring-red-400'
                      : 'border-[#DCE7F5] focus:border-[#0878E8] focus:ring-2 focus:ring-[#0878E8]/15'
                  }`}
                >
                  <option value="" disabled>
                    Select specialty
                  </option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-[#0878E8]">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
              {errors.department && (
                <p className="text-[10px] text-red-600 font-medium">{errors.department}</p>
              )}
            </div>

            {/* Field 4: Preferred Doctor */}
            <div className="space-y-1">
              <label
                htmlFor={`${formId}-preferredDoctor`}
                className="block text-[11px] sm:text-[11.5px] font-semibold text-[#0B2B50]"
              >
                Preferred Doctor <span className="text-[#64748B] font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#0878E8]">
                  <Stethoscope className="w-3.5 h-3.5" />
                </div>
                <select
                  id={`${formId}-preferredDoctor`}
                  disabled={!department}
                  value={preferredDoctor}
                  onChange={(e) => setPreferredDoctor(e.target.value)}
                  className={`w-full pl-8 pr-7 py-1.5 sm:py-2 text-xs border rounded-lg appearance-none focus:outline-none transition-all ${
                    !department
                      ? 'bg-slate-50 text-slate-400 border-[#DCE7F5] cursor-not-allowed'
                      : 'bg-white text-[#0B2B50] border-[#DCE7F5] focus:border-[#0878E8] focus:ring-2 focus:ring-[#0878E8]/15 cursor-pointer'
                  }`}
                >
                  {!department ? (
                    <option value="">Select department first</option>
                  ) : (
                    <>
                      <option value="">No preference (Any doctor)</option>
                      {availableDoctors.map((doc) => (
                        <option key={doc.id} value={doc.name}>
                          {doc.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-[#0878E8]">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Field 5: Preferred Date */}
            <div className="space-y-1">
              <label
                htmlFor={`${formId}-preferredDate`}
                className="block text-[11px] sm:text-[11.5px] font-semibold text-[#0B2B50]"
              >
                Preferred Date <span className="text-[#0878E8]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#0878E8]">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <input
                  id={`${formId}-preferredDate`}
                  type="date"
                  min={todayStr}
                  value={preferredDate}
                  onChange={(e) => {
                    setPreferredDate(e.target.value);
                    if (errors.preferredDate) setErrors({ ...errors, preferredDate: '' });
                  }}
                  className={`w-full pl-8 pr-2.5 py-1.5 sm:py-2 text-xs text-[#0B2B50] bg-white border rounded-lg focus:outline-none transition-all cursor-pointer ${
                    errors.preferredDate
                      ? 'border-red-400 focus:ring-1 focus:ring-red-400'
                      : 'border-[#DCE7F5] focus:border-[#0878E8] focus:ring-2 focus:ring-[#0878E8]/15'
                  }`}
                />
              </div>
              {errors.preferredDate && (
                <p className="text-[10px] text-red-600 font-medium">{errors.preferredDate}</p>
              )}
            </div>

            {/* Field 6: Preferred Time */}
            <div className="space-y-1">
              <label
                htmlFor={`${formId}-preferredTime`}
                className="block text-[11px] sm:text-[11.5px] font-semibold text-[#0B2B50]"
              >
                Preferred Time <span className="text-[#64748B] font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#0878E8]">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <select
                  id={`${formId}-preferredTime`}
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full pl-8 pr-7 py-1.5 sm:py-2 text-xs text-[#0B2B50] bg-white border border-[#DCE7F5] rounded-lg appearance-none focus:outline-none focus:border-[#0878E8] focus:ring-2 focus:ring-[#0878E8]/15 transition-all cursor-pointer"
                >
                  <option value="">Any time</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-[#0878E8]">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Section */}
          <div className="pt-2 sm:pt-2.5 border-t border-[#EFF7FF] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
            
            {/* Reassurance text with green check */}
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#64748B]">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0 stroke-[2.3]" />
              <span className="leading-tight">
                No charges to book — our team confirms by phone.
              </span>
            </div>

            {/* Primary Blue Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0878E8] hover:bg-[#0766c6] text-white text-xs sm:text-[13px] font-bold transition-all shadow-[0_3px_12px_rgba(8,120,232,0.25)] hover:shadow-[0_4px_16px_rgba(8,120,232,0.35)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer shrink-0"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Scheduling...</span>
                </>
              ) : (
                <>
                  <span>Book Appointment</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
                </>
              )}
            </button>

          </div>

        </form>
      )}
    </div>
  );
};
