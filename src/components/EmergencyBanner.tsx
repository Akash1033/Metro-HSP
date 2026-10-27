import React from 'react';
import { Phone, BellRing } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface EmergencyBannerProps {
  language: 'en' | 'pa';
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ language }) => {
  return (
    <section className="py-6 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFF5F5] border border-[#FED7D7] rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(239,51,64,0.06)] flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8">
          
          {/* Left: Icon & Title */}
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-white text-[#EF3340] border border-red-200 flex items-center justify-center shrink-0 shadow-sm relative">
              <BellRing className="w-6 h-6 animate-pulse" />
              <span className="absolute -bottom-1 -right-1 bg-[#EF3340] text-white text-[9px] font-black px-1 rounded-full">
                24
              </span>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#08284B] leading-tight">
                {language === 'pa' ? 'ਤੁਰੰਤ ਸਹਾਇਤਾ ਦੀ ਲੋੜ ਹੈ?' : 'Need Immediate Assistance?'}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#EF3340]">
                {language === 'pa'
                  ? '24 ਘੰਟੇ ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ ਉਪਲਬਧ ਹਨ'
                  : '24 Hours Emergency Services Available'}
              </p>
            </div>
          </div>

          {/* Center: Big Phone Number */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-red-100 text-[#EF3340] flex items-center justify-center">
              <Phone className="w-5 h-5 fill-current" />
            </div>
            <a
              href={`tel:${HOSPITAL_INFO.phoneTel}`}
              className="text-2xl sm:text-3xl font-black text-[#EF3340] hover:text-[#d3222e] tracking-tight transition-colors"
            >
              {HOSPITAL_INFO.phone}
            </a>
          </div>

          {/* Right: Call Now CTA */}
          <div className="w-full sm:w-auto">
            <a
              href={`tel:${HOSPITAL_INFO.phoneTel}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#EF3340] hover:bg-[#d6232f] text-white text-sm font-bold shadow-[0_3px_12px_rgba(239,51,64,0.28)] hover:shadow-[0_6px_18px_rgba(239,51,64,0.38)] active:scale-[0.98] transition-all"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>{language === 'pa' ? 'ਹੁਣੇ ਕਾਲ ਕਰੋ' : 'Call Now'}</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
