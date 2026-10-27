import React from 'react';
import {
  Ambulance,
  Bed,
  HeartPulse,
  FlaskConical,
  ScanLine,
  Monitor,
} from 'lucide-react';
import { ColorStripe } from './ColorStripe';
import { FACILITIES } from '../data/hospitalData';
import { FacilityItem } from '../types';

interface FacilitiesSectionProps {
  onSelectFacility?: (facility: FacilityItem) => void;
  language: 'en' | 'pa';
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({
  onSelectFacility,
  language,
}) => {
  const renderFacilityIcon = (iconName: string, themeColor: string) => {
    const props = { className: 'w-7 h-7', style: { color: themeColor } };
    switch (iconName) {
      case 'Ambulance':
        return <Ambulance {...props} />;
      case 'Bed':
        return <Bed {...props} />;
      case 'HeartPulse':
        return <HeartPulse {...props} />;
      case 'FlaskConical':
        return <FlaskConical {...props} />;
      case 'ScanLine':
        return <ScanLine {...props} />;
      case 'Monitor':
        return <Monitor {...props} />;
      default:
        return <Bed {...props} />;
    }
  };

  return (
    <section id="facilities" className="py-14 md:py-18 bg-[#FBFDFE]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold tracking-wider text-[#08284B] uppercase">
              {language === 'pa' ? 'ਸਾਡੀਆਂ ਸਹੂਲਤਾਂ —' : 'OUR FACILITIES —'}
            </span>
          </div>
          <ColorStripe width="w-20" className="mb-2" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08284B] tracking-tight">
            {language === 'pa'
              ? 'ਬਿਹਤਰ ਦੇਖਭਾਲ ਲਈ ਆਧੁਨਿਕ ਸਹੂਲਤਾਂ'
              : 'Modern Facilities for Better Care'}
          </h2>
        </div>

        {/* 6 Facility Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {FACILITIES.map((facility) => (
            <div
              key={facility.id}
              onClick={() => onSelectFacility && onSelectFacility(facility)}
              className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(8,117,225,0.08)] hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
            >
              <div
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: facility.bgTint }}
              >
                {renderFacilityIcon(facility.iconName, facility.themeColor)}
              </div>
              <h3 className="text-xs sm:text-[13px] font-bold text-[#08284B] group-hover:text-[#0875E1] transition-colors leading-snug">
                {facility.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
