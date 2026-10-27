import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ColorStripe } from './ColorStripe';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface AboutSectionProps {
  onLearnMore: () => void;
  language: 'en' | 'pa';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore, language }) => {
  return (
    <section id="about" className="py-14 md:py-20 bg-gradient-to-b from-[#F7FBFF] to-white relative overflow-hidden">
      {/* Decorative Faint Medical Plus Accents */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.25]">
        <span className="absolute top-12 left-10 text-[#A6CCF1] text-6xl font-light">+</span>
        <span className="absolute top-1/2 right-12 text-[#A6CCF1] text-7xl font-light">+</span>
        <span className="absolute bottom-6 left-1/3 text-[#A6CCF1] text-5xl font-light">+</span>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold tracking-wider text-[#08284B] uppercase">
                {language === 'pa'
                  ? 'ਮੈਟਰੋ ਮਲਟੀਸਪੈਸ਼ਲਿਟੀ ਹਸਪਤਾਲ ਬਾਰੇ —'
                  : 'ABOUT METRO MULTISPECIALITY HOSPITAL —'}
              </span>
            </div>
            <ColorStripe width="w-24" className="mb-3" />

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#08284B] tracking-tight mb-5 leading-tight">
              {language === 'pa'
                ? 'ਤੁਹਾਡੀ ਸਿਹਤ, ਸਾਡੀ ਵਚਨਬੱਧਤਾ'
                : 'Your Health, Our Commitment'}
            </h2>

            <p className="text-sm md:text-base text-[#52647A] leading-relaxed mb-8">
              {language === 'pa'
                ? 'ਮੈਟਰੋ ਮਲਟੀਸਪੈਸ਼ਲਿਟੀ ਹਸਪਤਾਲ ਆਧੁਨਿਕ ਬੁਨਿਆਦੀ ਢਾਂਚੇ ਅਤੇ ਮਰੀਜ਼-ਪਹਿਲ ਪਹੁੰਚ ਨਾਲ ਮਿਆਰੀ ਸਿਹਤ ਸੰਭਾਲ ਪ੍ਰਦਾਨ ਕਰਨ ਲਈ ਸਮਰਪਿਤ ਹੈ। ਅਸੀਂ ਤਜਰਬੇਕਾਰ ਡਾਕਟਰਾਂ ਅਤੇ ਦੇਖਭਾਲ ਕਰਨ ਵਾਲੇ ਸਟਾਫ ਦੁਆਰਾ ਸਮਰਥਿਤ ਇੱਕੋ ਛੱਤ ਹੇਠ ਵਿਆਪਕ ਡਾਕਟਰੀ ਸੇਵਾਵਾਂ ਦੀ ਪੇਸ਼ਕਸ਼ ਕਰਦੇ ਹਾਂ।'
                : HOSPITAL_INFO.aboutText}
            </p>

            <div>
              <button
                type="button"
                onClick={onLearnMore}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#0875E1] hover:bg-[#0766c6] text-white text-xs sm:text-sm font-bold transition-all shadow-[0_2px_8px_rgba(8,117,225,0.25)] hover:shadow-[0_4px_14px_rgba(8,117,225,0.35)] active:scale-[0.98] cursor-pointer"
              >
                <span>{language === 'pa' ? 'ਸਾਡੇ ਬਾਰੇ ਹੋਰ ਜਾਣੋ' : 'Know More About Us'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Building Image Column */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 group">
              <img
                src="/images/hospital_about.jpg"
                alt="Metro Multispeciality Hospital Building Exterior"
                className="w-full h-[320px] sm:h-[380px] md:h-[420px] object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
