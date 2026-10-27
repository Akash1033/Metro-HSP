import React from 'react';
import { X, Calendar, CheckCircle2 } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookForService: (departmentName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookForService,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
        
        {/* Header */}
        <div className="bg-[#08284B] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: service.themeColor }}
            >
              <span className="text-xl font-bold">✓</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">{service.title}</h3>
              <p className="text-xs text-blue-200">Metro Multispeciality Hospital</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          <div>
            <h4 className="font-bold text-[#08284B] uppercase tracking-wider text-[11px] mb-1.5">
              Service Overview
            </h4>
            <p className="text-slate-600 leading-relaxed text-[12.5px]">{service.description}</p>
          </div>

          {service.features && service.features.length > 0 && (
            <div>
              <h4 className="font-bold text-[#08284B] uppercase tracking-wider text-[11px] mb-2">
                Procedures & Key Capabilities
              </h4>
              <ul className="space-y-1.5">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 text-[11px] text-slate-700">
            <strong>Consultation Hours:</strong> Daily OPD available from 09:00 AM to 07:00 PM. Emergency trauma services active 24/7.
          </div>

          <button
            onClick={() => {
              onClose();
              onBookForService(service.departmentKey);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#0875E1] hover:bg-[#0766c6] text-white font-bold rounded-lg shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation for {service.title}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
