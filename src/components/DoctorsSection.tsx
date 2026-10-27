import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ColorStripe } from './ColorStripe';
import { DOCTORS } from '../data/hospitalData';
import { Doctor } from '../types';

interface DoctorsSectionProps {
  onSelectDoctor: (doctor: Doctor) => void;
  onOpenBooking: (doctorName?: string, departmentName?: string) => void;
  onNavigateToDoctors?: () => void;
  language: 'en' | 'pa';
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({
  onSelectDoctor,
  onNavigateToDoctors,
  language,
}) => {
  // Show only 4 doctors in a single row on the Home page
  const featuredDoctors = DOCTORS.slice(0, 4);

  return (
    <section id="doctors" className="py-12 md:py-16 bg-[#F8FBFE] border-t border-slate-100">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            {/* Small Eyebrow Label */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold tracking-wider text-[#0878E8] uppercase">
                {language === 'pa' ? 'ਸਾਡੇ ਡਾਕਟਰ' : 'OUR DOCTORS'}
              </span>
              <ColorStripe width="w-16" />
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2B50] tracking-tight leading-tight">
              {language === 'pa'
                ? 'ਸਾਡੇ ਤਜਰਬੇਕਾਰ ਡਾਕਟਰਾਂ ਨੂੰ ਮਿਲੋ'
                : 'Meet Our Experienced Doctors'}
            </h2>

            {/* Supporting Subtitle */}
            <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 leading-relaxed">
              {language === 'pa'
                ? 'ਤੁਹਾਡੀ ਸਿਹਤ ਅਤੇ ਤੰਦਰੁਸਤੀ ਲਈ ਸਮਰਪਿਤ ਤਜਰਬੇਕਾਰ ਮਾਹਿਰ।'
                : 'Experienced specialists dedicated to your health and well-being.'}
            </p>
          </div>

          {/* View All Doctors Button */}
          <button
            type="button"
            onClick={() => {
              if (onNavigateToDoctors) {
                onNavigateToDoctors();
              } else {
                onSelectDoctor(DOCTORS[0]);
              }
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#EFF7FF] hover:bg-[#E0F0FE] text-[#0878E8] text-xs font-bold border border-[#DCE7F5] transition-all self-start sm:self-auto cursor-pointer shadow-xs hover:shadow-sm"
          >
            <span>{language === 'pa' ? 'ਸਾਰੇ ਡਾਕਟਰ ਵੇਖੋ' : 'View All Doctors'}</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>
        </div>

        {/* 2. Responsive 4-Column Grid: Exactly 4 doctors in a row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-5.5">
          {featuredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() => onSelectDoctor(doctor)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectDoctor(doctor);
                }
              }}
              className="bg-white border border-[#DCE7F5] hover:border-[#0878E8]/40 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(8,40,75,0.04)] hover:shadow-[0_8px_24px_rgba(8,120,232,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0878E8] focus-visible:ring-offset-2"
            >
              {/* Doctor Portrait Area: Sleek and compact */}
              <div className="w-full aspect-[4/3] bg-[#F1F6FB] overflow-hidden relative">
                <img
                  src={doctor.image}
                  alt={`Portrait of ${doctor.name}, ${doctor.specialty}`}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Compact Card Content Body */}
              <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between text-left">
                <div>
                  {/* Doctor Full Name */}
                  <h3 className="text-sm sm:text-[14.5px] font-bold text-[#0B2B50] group-hover:text-[#0878E8] transition-colors leading-snug mb-0.5">
                    {doctor.name}
                  </h3>

                  {/* Medical Specialty */}
                  <p className="text-[11.5px] sm:text-xs font-semibold text-[#0878E8] leading-snug mb-1">
                    {doctor.specialty}
                  </p>

                  {/* Qualifications */}
                  <p className="text-[10.5px] sm:text-[11px] text-[#64748B] leading-relaxed mb-2.5">
                    {doctor.qualification}
                  </p>
                </div>

                {/* Subtle Divider & Footer */}
                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-1 text-[10.5px]">
                  {/* Registration Number */}
                  <span className="font-mono text-slate-400 font-medium">
                    {doctor.pmcNumber || 'Metro Specialist'}
                  </span>

                  {/* Action Link */}
                  <span className="inline-flex items-center gap-1 font-bold text-[#0878E8] group-hover:translate-x-0.5 transition-transform">
                    <span>View Profile</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
