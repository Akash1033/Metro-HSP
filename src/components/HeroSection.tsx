import React from 'react';
import {
  HeartHandshake,
  Stethoscope,
  Building2,
  Phone,
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { AppointmentBookingForm } from './AppointmentBookingForm';

interface HeroSectionProps {
  onOpenBooking?: (doctorName?: string, departmentName?: string, date?: string, time?: string) => void;
  language?: 'en' | 'pa';
}

export const HeroSection: React.FC<HeroSectionProps> = ({ language = 'en' }) => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-[#EAF5FF] via-[#F4F9FE] to-[#E8F3FD] min-h-[580px] lg:min-h-[620px] xl:min-h-[660px] flex items-center border-b border-slate-100"
    >
      {/* Decorative Faint Medical Plus Shapes */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.25]">
        <span className="absolute top-6 left-8 text-[#9AC5EC] text-4xl font-light">+</span>
        <span className="absolute top-32 left-1/4 text-[#9AC5EC] text-6xl font-light">+</span>
        <span className="absolute bottom-8 left-10 text-[#9AC5EC] text-4xl font-light">+</span>
      </div>

      {/* Hospital Building Photograph — Desktop: Full-Height, Continuous Horizon with Left Edge Blend */}
      <div
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-[56%] xl:w-[59%] 2xl:w-[62%] h-full pointer-events-none select-none"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 4%, rgba(0,0,0,0.85) 9%, black 15%, black 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 4%, rgba(0,0,0,0.85) 9%, black 15%, black 100%)',
        }}
      >
        <img
          src="/images/hero_hospital_facade.jpg"
          alt="Metro Multispeciality Hospital Building"
          className="w-full h-full object-cover object-[24%_center] xl:object-[27%_center]"
        />

        {/* Subtle soft left edge fade matching the hero background */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#EAF5FF] to-transparent pointer-events-none"
        />
      </div>

      {/* Main Content Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full relative z-10 py-7 sm:py-9 lg:py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-0">
          
          {/* Left Column: Heading, Description, Benefit Highlights, Emergency Card */}
          <div className="w-full lg:w-[47%] xl:w-[44%] flex flex-col justify-center relative z-20">
            
            {/* 1. Hospital Eyebrow Label with Blue Accent Bar */}
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
              <span className="text-xs sm:text-[13px] font-bold tracking-wider text-[#08284B] uppercase">
                {language === 'pa' ? 'ਮੈਟਰੋ ਮਲਟੀਸਪੈਸ਼ਲਿਟੀ ਹਸਪਤਾਲ' : 'METRO MULTISPECIALITY HOSPITAL'}
              </span>
              <span className="w-8 h-[2px] bg-[#0875E1] rounded-full inline-block" />
            </div>

            {/* 2. Main Headline: Quality Healthcare, Delivered With Care */}
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[45px] font-extrabold text-[#08284B] leading-[1.18] tracking-tight mb-3 sm:mb-4">
              Quality Healthcare, <br />
              Delivered <span className="text-[#0875E1]">With Care</span>
            </h1>

            {/* 3. Supporting Description */}
            <p className="text-sm sm:text-[15px] lg:text-base text-[#52647A] leading-relaxed max-w-[480px] mb-6 sm:mb-7">
              {language === 'pa'
                ? 'ਤੁਹਾਡੇ ਅਤੇ ਤੁਹਾਡੇ ਪਰਿਵਾਰ ਲਈ ਹਮਦਰਦੀ ਭਰੀ ਦੇਖਭਾਲ, ਆਧੁਨਿਕ ਸਹੂਲਤਾਂ ਅਤੇ ਤਜਰਬੇਕਾਰ ਡਾਕਟਰ।'
                : 'Compassionate care, modern facilities and experienced doctors for you and your family.'}
            </p>

            {/* 4. Three Benefit Circles */}
            <div className="flex items-start gap-4 sm:gap-7 mb-6 sm:mb-7">
              {/* Benefit 1: Multi-Speciality Care */}
              <div className="flex flex-col items-center text-center w-22 sm:w-24">
                <div className="w-12 h-12 rounded-full bg-[#EAF5FF] flex items-center justify-center p-1.5 shadow-xs">
                  <div className="w-9 h-9 rounded-full bg-[#0875E1] text-white flex items-center justify-center shadow-xs">
                    <HeartHandshake className="w-4.5 h-4.5 stroke-[2.2]" />
                  </div>
                </div>
                <span className="text-[11.5px] font-bold text-[#08284B] leading-tight mt-2">
                  Multi-Speciality <br /> Care
                </span>
              </div>

              {/* Benefit 2: Experienced Doctors */}
              <div className="flex flex-col items-center text-center w-22 sm:w-24">
                <div className="w-12 h-12 rounded-full bg-[#ECFDF5] flex items-center justify-center p-1.5 shadow-xs">
                  <div className="w-9 h-9 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-xs">
                    <Stethoscope className="w-4.5 h-4.5 stroke-[2.2]" />
                  </div>
                </div>
                <span className="text-[11.5px] font-bold text-[#08284B] leading-tight mt-2">
                  Experienced <br /> Doctors
                </span>
              </div>

              {/* Benefit 3: Modern Facilities */}
              <div className="flex flex-col items-center text-center w-22 sm:w-24">
                <div className="w-12 h-12 rounded-full bg-[#EAF5FF] flex items-center justify-center p-1.5 shadow-xs">
                  <div className="w-9 h-9 rounded-full bg-[#0875E1] text-white flex items-center justify-center shadow-xs">
                    <Building2 className="w-4.5 h-4.5 stroke-[2.2]" />
                  </div>
                </div>
                <span className="text-[11.5px] font-bold text-[#08284B] leading-tight mt-2">
                  Modern <br /> Facilities
                </span>
              </div>
            </div>

            {/* 5. Emergency Assistance Banner with Red Theme */}
            <div>
              <a
                href={`tel:${HOSPITAL_INFO.phoneTel}`}
                className="inline-flex items-center gap-3 bg-[#FFF0F0] border border-[#FED7D7] rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-xs hover:shadow-md hover:border-red-300 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EF3340] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs shrink-0">
                  <Phone className="w-5 h-5 fill-current" />
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] sm:text-[10.5px] font-bold text-slate-500 uppercase tracking-wide">
                    FOR EMERGENCY / ASSISTANCE
                  </p>
                  <p className="text-xl sm:text-2xl font-black text-[#EF3340] tracking-tight">
                    {HOSPITAL_INFO.phone}
                  </p>
                </div>
              </a>
            </div>

          </div>

          {/* Right Column: Exactly ONE Visible 6-Field Appointment Booking Card (Desktop & Mobile) */}
          <div className="w-full lg:w-[48%] xl:w-[46%] flex flex-col items-center lg:items-end justify-center relative z-20 mt-6 lg:mt-0">
            {/* Mobile View: Building Photograph placed cleanly above the form */}
            <div className="lg:hidden w-full max-w-[420px] rounded-2xl overflow-hidden aspect-[16/10] shadow-md border border-slate-100 mb-5">
              <img
                src="/images/hero_hospital_facade.jpg"
                alt="Metro Multispeciality Hospital Building"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Exactly ONE Appointment Booking Form Instance */}
            <div className="w-full max-w-[420px] lg:max-w-[375px] xl:max-w-[405px]">
              <AppointmentBookingForm
                compact={true}
                formId="hero-appointment-form"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
