import React, { useState } from 'react';
import {
  Heart,
  Users,
  ShieldCheck,
  Ambulance,
  Bed,
  HeartPulse,
  FlaskConical,
  ScanLine,
  Monitor,
  Play,
  ArrowRight,
  Sparkles,
  BriefcaseMedical,
  Calendar,
  Quote,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { ColorStripe } from '../components/ColorStripe';
import { EmergencyBanner } from '../components/EmergencyBanner';
import { FacilityDetailModal } from '../components/FacilityDetailModal';
import { TourVideoModal } from '../components/TourVideoModal';
import { GalleryLightBoxModal } from '../components/GalleryLightBoxModal';
import { FACILITIES, HOSPITAL_GALLERY } from '../data/hospitalData';
import { FacilityItem } from '../types';

// ============================================================================
// IMAGE CONFIG
// Easily edit URLs and alternative text for Facilities page images here.
// ============================================================================
const FACILITY_IMAGES = {
  hero: {
    src: "/images/facilities/hero.jpg", // pick: pexels.com/search/hospital%20ward/
    alt: "Modern hospital ward with patient beds"
  },
  emergency: {
    src: "https://images.pexels.com/photos/3452997/pexels-photo-3452997.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Paramedics loading a stretcher into an ambulance for 24-hour emergency services"
  },
  trauma: {
    src: "/images/facilities/trauma.jpg", // pick: pexels.com/search/emergency%20room/
    alt: "Emergency and trauma care team attending to a patient"
  },
  ecg: {
    src: "/images/facilities/ecg.jpg", // pick: pexels.com/search/ecg/
    alt: "ECG test with electrodes for heart health assessment"
  },
  laboratory: {
    src: "/images/facilities/lab.jpg", // pick: pexels.com/search/medical%20laboratory/
    alt: "Laboratory technician testing blood samples in the clinical laboratory"
  },
  xray: {
    src: "https://images.pexels.com/photos/7617601/pexels-photo-7617601.jpeg", // pick: pexels.com/search/x-ray%20machine/
    alt: "Digital X-ray machine and radiology room"
  },
  ultrasound: {
    src: "https://images.pexels.com/photos/7089304/pexels-photo-7089304.jpeg", // pick: pexels.com/search/ultrasound/
    alt: "Doctor performing an ultrasound scan on a patient"
  }
};

// Map facility IDs to the corresponding image config entry
const getFacilityConfig = (id: string) => {
  if (id.includes('emergency')) return FACILITY_IMAGES.emergency;
  if (id.includes('trauma')) return FACILITY_IMAGES.trauma;
  if (id.includes('ecg')) return FACILITY_IMAGES.ecg;
  if (id.includes('lab')) return FACILITY_IMAGES.laboratory;
  if (id.includes('x-ray') || id.includes('xray')) return FACILITY_IMAGES.xray;
  if (id.includes('ultrasound')) return FACILITY_IMAGES.ultrasound;
  return FACILITY_IMAGES.emergency;
};

interface FacilitiesPageProps {
  onOpenBooking: (doctorName?: string, departmentName?: string) => void;
  onNavigateHome: () => void;
  language: 'en' | 'pa';
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({
  onOpenBooking,
  onNavigateHome,
  language,
}) => {
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);

  // Track image load errors to display fallback #eaf2fb background without broken icon
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (key: string) => {
    setImageErrors((prev) => ({ ...prev, [key]: true }));
  };

  // Icon helper for the 6 facilities
  const renderFacilityIcon = (iconName: string, iconColor: string) => {
    const props = { className: 'w-6 h-6', style: { color: iconColor } };
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

  const handleOpenGallery = (index: number = 0) => {
    setGalleryInitialIndex(index);
    setGalleryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FBFE]">
      {/* 1. Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center text-xs sm:text-[13px] text-slate-500">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#0875E1] transition-colors font-medium flex items-center gap-1"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-400" />
          <span className="text-[#0875E1] font-semibold">Facilities</span>
        </div>
      </div>

      {/* 2. Hero Section: "Modern Facilities for Better Care" */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F0F7FD] via-white to-white py-12 lg:py-16 border-b border-slate-100">
        {/* Soft background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Eyebrow + Heading + Paragraph + 3 Badges */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold tracking-wider text-[#08284B] uppercase">
                    OUR FACILITIES
                  </span>
                  <ColorStripe width="w-16" />
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#08284B] tracking-tight leading-[1.15]">
                  Modern Facilities <br />
                  <span className="text-[#0875E1]">for Better Care</span>
                </h1>
              </div>

              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-xl">
                At Metro Multispeciality Hospital, we are equipped with modern
                medical infrastructure and advanced technology to provide safe,
                accurate and comfortable healthcare for every patient.
              </p>

              {/* 3 Badges in a horizontal row */}
              <div className="pt-2 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg">
                {/* Badge 1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#EBF5FF] flex items-center justify-center text-[#0875E1] mb-2 shadow-sm border border-blue-100">
                    <Heart className="w-5 h-5 fill-[#0875E1]/20" />
                  </div>
                  <span className="text-xs font-bold text-[#08284B] leading-tight">
                    Advanced <br />Technology
                  </span>
                </div>

                {/* Badge 2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#ECFDF5] flex items-center justify-center text-[#10B981] mb-2 shadow-sm border border-emerald-100">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#08284B] leading-tight">
                    Safe &amp; Comfortable <br />Environment
                  </span>
                </div>

                {/* Badge 3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] mb-2 shadow-sm border border-blue-100">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#08284B] leading-tight">
                    Patient-Centric <br />Infrastructure
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Ward Photograph with Overlaid Quote */}
            <div className="lg:col-span-6">
              <div
                className="relative rounded-[24px] overflow-hidden shadow-[0_12px_40px_rgba(8,117,225,0.12)] border border-blue-100/80 group aspect-[16/11] w-full"
                style={{ backgroundColor: '#eaf2fb' }}
              >
                {FACILITY_IMAGES.hero.src &&
                FACILITY_IMAGES.hero.src.trim() !== '' &&
                FACILITY_IMAGES.hero.src !== 'PASTE_URL_HERE' &&
                !imageErrors['hero'] ? (
                  <img
                    src={FACILITY_IMAGES.hero.src}
                    alt={FACILITY_IMAGES.hero.alt}
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="412"
                    onError={() => handleImageError('hero')}
                    style={{
                      aspectRatio: '16 / 11',
                      filter: 'saturate(0.95) contrast(1.03)',
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400" />
                )}

                {/* Subtle overlay gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.05) 100%)',
                  }}
                />

                {/* Overlaid Quote Card on bottom right */}
                <div className="absolute bottom-4 right-4 max-w-[280px] sm:max-w-[340px] bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/80 hidden xs:block">
                  <div className="flex items-start gap-2.5">
                    <Quote className="w-6 h-6 text-[#0875E1] shrink-0 fill-[#0875E1]/10 -mt-1" />
                    <div>
                      <p className="text-xs sm:text-[13px] font-medium text-slate-700 leading-snug">
                        “Modern infrastructure, compassionate care and a safer tomorrow for our community.”
                      </p>
                      <div className="w-8 h-1 bg-[#0875E1] rounded-full mt-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Key Facilities Section (6 Cards in 3x2 Grid) */}
      <section className="py-14 lg:py-18 bg-[#FBFDFE]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row: Eyebrow + Heading + Book Appointment Button */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                  YOUR CARE, OUR INFRASTRUCTURE
                </span>
                <ColorStripe width="w-16" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#08284B] tracking-tight">
                Our Key Facilities
              </h2>
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EBF5FF] hover:bg-[#DEEEFF] text-[#0875E1] font-bold text-xs sm:text-[13px] transition-colors border border-blue-100 self-start sm:self-auto shadow-sm"
            >
              <span>Book an Appointment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 6 Cards Grid (3 columns desktop, 2 tablet, 1 mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FACILITIES.map((facility) => {
              const imgConfig = getFacilityConfig(facility.id);
              const hasValidUrl =
                imgConfig.src &&
                imgConfig.src.trim() !== '' &&
                imgConfig.src !== 'PASTE_URL_HERE';
              const hasError = imageErrors[facility.id];

              return (
                <div
                  key={facility.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(8,117,225,0.1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
                  onClick={() =>
                    setSelectedFacility({
                      ...facility,
                      image: hasValidUrl && !hasError ? imgConfig.src : facility.image,
                    })
                  }
                >
                  {/* Image Header with rounded top, 3:2 aspect ratio, #eaf2fb fallback */}
                  <div
                    className="relative w-full aspect-[3/2] overflow-hidden rounded-t-2xl"
                    style={{ backgroundColor: '#eaf2fb', aspectRatio: '3 / 2' }}
                  >
                    {hasValidUrl && !hasError ? (
                      <img
                        src={imgConfig.src}
                        alt={imgConfig.alt}
                        loading="lazy"
                        decoding="async"
                        width="375"
                        height="250"
                        onError={() => handleImageError(facility.id)}
                        style={{
                          aspectRatio: '3 / 2',
                          filter: 'saturate(0.95) contrast(1.03)',
                        }}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : null}

                    {/* Subtle Color Overlay: rgba(255,255,255,0.0) to rgba(0,0,0,0.05) */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.05) 100%)',
                      }}
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Icon and Title Row */}
                      <div className="flex items-center gap-3.5 mb-3">
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110"
                          style={{ backgroundColor: facility.bgTint }}
                        >
                          {renderFacilityIcon(facility.iconName, facility.themeColor)}
                        </div>
                        <h3 className="text-base font-bold text-[#08284B] group-hover:text-[#0875E1] transition-colors leading-snug">
                          {facility.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed line-clamp-3 mb-4">
                        {facility.description}
                      </p>
                    </div>

                    {/* Learn More Link */}
                    <div className="pt-2 border-t border-slate-50">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0875E1] group-hover:gap-2.5 transition-all">
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. State-of-the-Art Infrastructure Section */}
      <section className="py-14 lg:py-20 bg-white border-y border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Heading + Paragraph + Book Button (col-span-4) */}
            <div className="lg:col-span-4 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                    STATE-OF-THE-ART INFRASTRUCTURE
                  </span>
                  <ColorStripe width="w-16" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08284B] tracking-tight leading-snug">
                  A Safer and More Comfortable Experience
                </h2>
              </div>

              <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed">
                Our hospital is designed to provide a clean, modern and
                patient-friendly environment. We continuously upgrade our
                infrastructure and equipment to ensure accurate diagnosis,
                effective treatment and better patient care.
              </p>

              <div>
                <button
                  onClick={() => onOpenBooking()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0875E1] hover:bg-[#0662be] text-white font-bold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(8,117,225,0.28)] hover:shadow-[0_6px_20px_rgba(8,117,225,0.4)]"
                >
                  <span>Book an Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Middle Column: Reception Video Tour Card with Play Button (col-span-4) */}
            <div className="lg:col-span-4">
              <div
                onClick={() => setIsTourOpen(true)}
                className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 group cursor-pointer aspect-[4/3] bg-slate-900"
              >
                <img
                  src="/images/contact/reception_clean.jpg"
                  alt="Hospital Reception Infrastructure"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-slate-900/25 group-hover:bg-slate-900/15 transition-colors" />

                {/* Big White Circular Play Button in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-2xl flex items-center justify-center text-[#0875E1] group-hover:scale-115 transition-transform duration-300">
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-[#0875E1] ml-1" />
                  </div>
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold">
                    Click to view virtual tour
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: 4 Feature Points with Icons (col-span-4) */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Feature 1 */}
              <div className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#EBF5FF] flex items-center justify-center shrink-0 text-[#0875E1] shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13.5px] font-bold text-[#08284B] leading-snug">
                    Clean &amp; Hygienic Environment
                  </h4>
                  <p className="text-[12px] text-slate-500 leading-relaxed mt-0.5">
                    Maintained with strict cleanliness and hygiene practices.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#ECFDF5] flex items-center justify-center shrink-0 text-[#10B981] shadow-sm">
                  <BriefcaseMedical className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13.5px] font-bold text-[#08284B] leading-snug">
                    Modern Medical Equipment
                  </h4>
                  <p className="text-[12px] text-slate-500 leading-relaxed mt-0.5">
                    Advanced technology for accurate diagnosis and treatment.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#FFFBEB] flex items-center justify-center shrink-0 text-[#F59E0B] shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13.5px] font-bold text-[#08284B] leading-snug">
                    Patient-Friendly Facilities
                  </h4>
                  <p className="text-[12px] text-slate-500 leading-relaxed mt-0.5">
                    Comfortable waiting areas and well-managed patient flow.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0 text-[#2563EB] shadow-sm">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13.5px] font-bold text-[#08284B] leading-snug">
                    Trained &amp; Supportive Staff
                  </h4>
                  <p className="text-[12px] text-slate-500 leading-relaxed mt-0.5">
                    Dedicated to providing a safe and smooth experience for every patient.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. Inside Our Hospital Gallery (4 Columns) */}
      <section className="py-14 lg:py-18 bg-[#FBFDFE]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                  GLIMPSES OF OUR FACILITIES
                </span>
                <ColorStripe width="w-16" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#08284B] tracking-tight">
                Inside Our Hospital
              </h2>
            </div>

            <button
              onClick={() => handleOpenGallery(0)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EBF5FF] hover:bg-[#DEEEFF] text-[#0875E1] font-bold text-xs sm:text-[13px] transition-colors border border-blue-100 self-start sm:self-auto shadow-sm"
            >
              <span>View More Photos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4 Gallery Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {HOSPITAL_GALLERY.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleOpenGallery(index)}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden cursor-pointer group flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="p-2 rounded-full bg-white/90 text-slate-800 shadow-md">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Caption label */}
                <div className="p-3.5 text-center">
                  <h3 className="text-xs sm:text-[13.5px] font-bold text-[#08284B] group-hover:text-[#0875E1] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Emergency Assistance Banner */}
      <EmergencyBanner language={language} />

      {/* Facility Detail Modal */}
      <FacilityDetailModal
        facility={selectedFacility}
        onClose={() => setSelectedFacility(null)}
        onOpenBooking={onOpenBooking}
        language={language}
      />

      {/* Reception Virtual Tour Modal */}
      <TourVideoModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onOpenBooking={() => onOpenBooking()}
      />

      {/* Gallery Lightbox Modal */}
      <GalleryLightBoxModal
        isOpen={galleryModalOpen}
        initialIndex={galleryInitialIndex}
        onClose={() => setGalleryModalOpen(false)}
      />
    </div>
  );
};
