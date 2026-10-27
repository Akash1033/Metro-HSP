import React from 'react';
import {
  ArrowRight,
  Stethoscope,
  Activity,
  HeartHandshake,
  Bone,
  Smile,
  Syringe,
  UserCheck,
  Brain,
  ScanLine,
  Monitor,
  FlaskConical,
} from 'lucide-react';
import { ColorStripe } from './ColorStripe';
import { SERVICES } from '../data/hospitalData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenBooking: (doctorName?: string, departmentName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenBooking,
}) => {
  // Render specific icon based on iconName
  const renderIcon = (iconName: string, themeColor: string) => {
    const props = { className: 'w-7 h-7', style: { color: themeColor } };
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope {...props} />;
      case 'Activity':
        return <Activity {...props} />;
      case 'HeartHandshake':
        return <HeartHandshake {...props} />;
      case 'Bone':
        return <Bone {...props} />;
      case 'Smile':
        return <Smile {...props} />;
      case 'Syringe':
        return <Syringe {...props} />;
      case 'UserCheck':
        return <UserCheck {...props} />;
      case 'Brain':
        return <Brain {...props} />;
      case 'ScanLine':
        return <ScanLine {...props} />;
      case 'Monitor':
        return <Monitor {...props} />;
      case 'FlaskConical':
        return <FlaskConical {...props} />;
      default:
        return <Stethoscope {...props} />;
    }
  };

  const row1Services = SERVICES.slice(0, 6);
  const row2Services = SERVICES.slice(6, 11);

  return (
    <section id="services" className="py-14 md:py-18 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold tracking-wider text-[#08284B] uppercase">
                OUR SERVICES —
              </span>
            </div>
            <ColorStripe width="w-20" className="mb-2" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08284B] tracking-tight">
              Comprehensive Healthcare Services
            </h2>
          </div>

          <button
            onClick={() => onSelectService(SERVICES[0])}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#EAF5FF] hover:bg-[#d8edff] text-[#0875E1] text-xs font-bold transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Services Cards */}
        <div className="space-y-4 sm:space-y-5">
          {/* Row 1: 6 cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5 sm:gap-4">
            {row1Services.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => onSelectService(service)}
                className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(8,117,225,0.08)] hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div
                  className="w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: service.bgTint }}
                >
                  {renderIcon(service.iconName, service.themeColor)}
                </div>
                <h3 className="text-xs sm:text-[13px] font-bold text-[#08284B] group-hover:text-[#0875E1] transition-colors leading-tight">
                  {service.title}
                </h3>
              </button>
            ))}
          </div>

          {/* Row 2: 5 cards (Centered) */}
          <div className="flex flex-wrap justify-center gap-3.5 sm:gap-4">
            {row2Services.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => onSelectService(service)}
                className="w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] md:w-[calc(20%-13px)] bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(8,117,225,0.08)] hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div
                  className="w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: service.bgTint }}
                >
                  {renderIcon(service.iconName, service.themeColor)}
                </div>
                <h3 className="text-xs sm:text-[13px] font-bold text-[#08284B] group-hover:text-[#0875E1] transition-colors leading-tight">
                  {service.title}
                </h3>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
