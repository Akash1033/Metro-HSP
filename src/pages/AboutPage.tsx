import React, { useState } from 'react';
import {
  ChevronRight,
  ArrowRight,
  Target,
  Eye,
  Gem,
  Check,
  Stethoscope,
  Users,
  Settings,
  Heart,
  ShieldCheck,
  HeartHandshake,
  Phone,
  AlertCircle,
  Siren,
  Building2,
} from 'lucide-react';
import { ColorStripe } from '../components/ColorStripe';
import { EmergencyBanner } from '../components/EmergencyBanner';
import { GalleryLightBoxModal } from '../components/GalleryLightBoxModal';
import { HOSPITAL_INFO, HOSPITAL_GALLERY } from '../data/hospitalData';

interface AboutPageProps {
  onOpenBooking: (doctorName?: string, departmentName?: string) => void;
  onNavigateHome: () => void;
  onNavigateFacilities?: () => void;
  language: 'en' | 'pa';
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenBooking,
  onNavigateHome,
  onNavigateFacilities,
  language,
}) => {
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const handleOpenGallery = (index: number) => {
    setGalleryIndex(index);
    setGalleryModalOpen(true);
  };

  const handleFacilitiesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateFacilities) {
      onNavigateFacilities();
    } else {
      window.location.hash = '#facilities';
    }
  };

  return (
    <div className="bg-white text-[#0F172A] selection:bg-blue-100 selection:text-[#0875E1]">
      {/* ========================================================= */}
      {/* 1. HERO SECTION WITH BREADCRUMB AND HOSPITAL IMAGE       */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F5F9FE] via-[#EDF5FD] to-[#E3F0FC] pt-5 pb-14 md:pb-20 border-b border-blue-50/60">
        {/* Decorative Translucent Medical Cross Watermark */}
        <div className="absolute top-2 left-6 pointer-events-none select-none opacity-20 z-0">
          <span className="text-[#93C5FD] text-7xl font-light leading-none">+</span>
        </div>

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb: Home > About Us */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium mb-6">
            <button
              type="button"
              onClick={onNavigateHome}
              className="text-slate-600 hover:text-[#0875E1] transition-colors cursor-pointer"
            >
              {language === 'pa' ? 'ਘਰ' : 'Home'}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#08284B] font-semibold">
              {language === 'pa' ? 'ਸਾਡੇ ਬਾਰੇ' : 'About Us'}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Eyebrow Label with inline 4-color stripe */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold tracking-wider text-[#08284B] uppercase">
                  {language === 'pa'
                    ? 'ਮੈਟਰੋ ਮਲਟੀਸਪੈਸ਼ਲਿਟੀ ਹਸਪਤਾਲ ਬਾਰੇ'
                    : 'ABOUT METRO MULTISPECIALITY HOSPITAL'}
                </span>
                <ColorStripe width="w-16" variant="about" />
              </div>

              {/* H1 Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#08284B] tracking-tight leading-[1.15] mb-5">
                {language === 'pa' ? (
                  <>
                    ਤੁਹਾਡੀ ਸਿਹਤ, <br />
                    <span className="text-[#0875E1]">ਸਾਡੀ ਵਚਨਬੱਧਤਾ</span>
                  </>
                ) : (
                  <>
                    Your Health, <br />
                    <span className="text-[#0875E1]">Our Commitment</span>
                  </>
                )}
              </h1>

              {/* Paragraph */}
              <p className="text-sm sm:text-base text-[#52647A] leading-relaxed max-w-xl mb-9">
                {language === 'pa'
                  ? 'ਮੈਟਰੋ ਮਲਟੀਸਪੈਸ਼ਲਿਟੀ ਹਸਪਤਾਲ ਵਿਖੇ, ਅਸੀਂ ਆਧੁਨਿਕ ਬੁਨਿਆਦੀ ਢਾਂਚੇ ਅਤੇ ਮਰੀਜ਼-ਪਹਿਲ ਪਹੁੰਚ ਨਾਲ ਉੱਚ-ਗੁਣਵੱਤਾ, ਹਮਦਰਦ ਅਤੇ ਕਿਫਾਇਤੀ ਸਿਹਤ ਸੰਭਾਲ ਪ੍ਰਦਾਨ ਕਰਨ ਲਈ ਸਮਰਪਿਤ ਹਾਂ।'
                  : 'At Metro Multispeciality Hospital, we are dedicated to providing high-quality, compassionate and affordable healthcare with modern infrastructure and a patient-first approach.'}
              </p>

              {/* 4 Feature Badges Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-3 max-w-xl">
                {/* 1. Patient-Centric Care */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 rounded-full bg-[#EBF5FF] text-[#0875E1] flex items-center justify-center shadow-xs mb-2 transition-transform group-hover:scale-105">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-[#08284B] leading-tight">
                    {language === 'pa' ? 'ਮਰੀਜ਼-ਕੇਂਦਰਿਤ' : 'Patient-Centric'} <br />
                    {language === 'pa' ? 'ਦੇਖਭਾਲ' : 'Care'}
                  </span>
                </div>

                {/* 2. Experienced Doctors */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shadow-xs mb-2 transition-transform group-hover:scale-105">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-[#08284B] leading-tight">
                    {language === 'pa' ? 'ਤਜਰਬੇਕਾਰ' : 'Experienced'} <br />
                    {language === 'pa' ? 'ਡਾਕਟਰ' : 'Doctors'}
                  </span>
                </div>

                {/* 3. Modern Infrastructure */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 rounded-full bg-[#E6F7F0] text-[#0D9488] flex items-center justify-center shadow-xs mb-2 transition-transform group-hover:scale-105">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-[#08284B] leading-tight">
                    {language === 'pa' ? 'ਆਧੁਨਿਕ' : 'Modern'} <br />
                    {language === 'pa' ? 'ਸਹੂਲਤਾਂ' : 'Infrastructure'}
                  </span>
                </div>

                {/* 4. Compassionate Approach */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shadow-xs mb-2 transition-transform group-hover:scale-105">
                    <Heart className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-[#08284B] leading-tight">
                    {language === 'pa' ? 'ਹਮਦਰਦ' : 'Compassionate'} <br />
                    {language === 'pa' ? 'ਪਹੁੰਚ' : 'Approach'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Hospital Building Photograph */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-[0_12px_36px_rgba(8,117,225,0.12)] border-4 border-white">
                <img
                  src="/images/hospital_about.jpg"
                  alt="Metro Multispeciality Hospital Building - Pahwa Rd, Ludhiana"
                  className="w-full h-[280px] sm:h-[350px] lg:h-[400px] object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. WHO WE ARE SECTION                                     */}
      {/* ========================================================= */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Text Column */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Eyebrow with inline 4-color stripe */}
              <div className="flex items-center gap-3 mb-2.5">
                <span className="text-xs font-bold tracking-wider text-[#08284B] uppercase">
                  {language === 'pa' ? 'ਅਸੀਂ ਕੌਣ ਹਾਂ' : 'WHO WE ARE'}
                </span>
                <ColorStripe width="w-16" variant="about" />
              </div>

              {/* H2 Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#08284B] tracking-tight leading-tight mb-5">
                {language === 'pa' ? (
                  <>
                    ਲੁਧਿਆਣਾ ਵਿੱਚ ਇੱਕ ਭਰੋਸੇਯੋਗ <br />
                    ਸਿਹਤ ਸੰਭਾਲ ਭਾਈਵਾਲ
                  </>
                ) : (
                  <>
                    A Trusted Healthcare Partner <br />
                    in Ludhiana
                  </>
                )}
              </h2>

              {/* Paragraph */}
              <p className="text-sm sm:text-base text-[#52647A] leading-relaxed mb-8">
                {language === 'pa'
                  ? 'ਮੈਟਰੋ ਮਲਟੀਸਪੈਸ਼ਲਿਟੀ ਹਸਪਤਾਲ ਇੱਕ ਬਹੁ-ਵਿਸ਼ੇਸ਼ਤਾ ਸਿਹਤ ਸੰਭਾਲ ਕੇਂਦਰ ਹੈ ਜੋ ਇੱਕੋ ਛੱਤ ਹੇਠ ਵਿਆਪਕ ਡਾਕਟਰੀ ਸੇਵਾਵਾਂ ਪ੍ਰਦਾਨ ਕਰਨ ਲਈ ਵਚਨਬੱਧ ਹੈ। ਅਸੀਂ ਆਪਣੇ ਮਰੀਜ਼ਾਂ ਲਈ ਵਧੀਆ ਨਤੀਜੇ ਯਕੀਨੀ ਬਣਾਉਣ ਲਈ ਆਧੁਨਿਕ ਤਕਨਾਲੋਜੀ, ਤਜਰਬੇਕਾਰ ਡਾਕਟਰਾਂ ਅਤੇ ਹਮਦਰਦ ਦੇਖਭਾਲ ਨੂੰ ਜੋੜਦੇ ਹਾਂ।'
                  : 'Metro Multispeciality Hospital is a multi-specialty healthcare facility committed to delivering comprehensive medical services under one roof. We combine modern technology, experienced doctors and compassionate care to ensure the best possible outcomes for our patients.'}
              </p>

              {/* Action Button */}
              <div>
                <button
                  type="button"
                  onClick={() => onOpenBooking()}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0875E1] hover:bg-[#0766c6] text-white text-sm font-bold transition-all shadow-[0_4px_14px_rgba(8,117,225,0.25)] hover:shadow-[0_6px_20px_rgba(8,117,225,0.35)] active:scale-[0.98] cursor-pointer"
                >
                  <span>{language === 'pa' ? 'ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ' : 'Book an Appointment'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Photo Column with Overlaid Badge */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-100">
                <img
                  src="/images/about/doctor_consultation.jpg"
                  alt="Doctor consulting senior patient with care"
                  className="w-full h-[260px] sm:h-[310px] md:h-[340px] object-cover"
                />

                {/* Overlaid Floating Badge */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-blue-50/80 p-3.5 sm:p-4 max-w-[280px] sm:max-w-[320px] flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF5FF] text-[#0875E1] flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#08284B] leading-tight">
                      {language === 'pa'
                        ? 'ਹਰ ਮਰੀਜ਼ ਲਈ ਹਮਦਰਦ ਦੇਖਭਾਲ'
                        : 'Compassionate Care for Every Patient'}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-snug">
                      {language === 'pa'
                        ? 'ਅਸੀਂ ਹਰ ਮਰੀਜ਼ ਨਾਲ ਸਤਿਕਾਰ, ਦੇਖਭਾਲ ਅਤੇ ਨਿੱਜੀ ਧਿਆਨ ਨਾਲ ਪੇਸ਼ ਆਉਂਦੇ ਹਾਂ।'
                        : 'We treat every patient with respect, care and personal attention.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. MISSION, VISION & VALUES CARDS (3 CARDS ROW)           */}
      {/* ========================================================= */}
      <section className="py-14 md:py-20 bg-[#F8FAFC] border-y border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {/* Card 1: Our Mission */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-start">
              <div className="w-14 h-14 rounded-full bg-[#EBF5FF] text-[#0875E1] flex items-center justify-center mb-5 shrink-0">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#08284B] mb-2.5">
                {language === 'pa' ? 'ਸਾਡਾ ਮਿਸ਼ਨ' : 'Our Mission'}
              </h3>
              <p className="text-xs sm:text-sm text-[#52647A] leading-relaxed">
                {language === 'pa'
                  ? 'ਮਰੀਜ਼ਾਂ ਦੀ ਸੁਰੱਖਿਆ, ਤੰਦਰੁਸਤੀ ਅਤੇ ਲੰਬੇ ਸਮੇਂ ਦੀ ਸਿਹਤ \'ਤੇ ਧਿਆਨ ਕੇਂਦਰਿਤ ਕਰਦੇ ਹੋਏ ਉੱਚ-ਗੁਣਵੱਤਾ, ਕਿਫਾਇਤੀ ਅਤੇ ਪਹੁੰਚਯੋਗ ਸਿਹਤ ਸੰਭਾਲ ਸੇਵਾਵਾਂ ਪ੍ਰਦਾਨ ਕਰਨਾ।'
                  : 'To deliver high-quality, affordable and accessible healthcare services with a focus on patient safety, well-being and long-term health.'}
              </p>
            </div>

            {/* Card 2: Our Vision */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-start">
              <div className="w-14 h-14 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center mb-5 shrink-0">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#08284B] mb-2.5">
                {language === 'pa' ? 'ਸਾਡਾ ਦ੍ਰਿਸ਼ਟੀਕੋਣ' : 'Our Vision'}
              </h3>
              <p className="text-xs sm:text-sm text-[#52647A] leading-relaxed">
                {language === 'pa'
                  ? 'ਇੱਕ ਭਰੋਸੇਯੋਗ ਸਿਹਤ ਸੰਭਾਲ ਸੰਸਥਾ ਬਣਨਾ, ਜੋ ਕਲੀਨਿਕਲ ਉੱਤਮਤਾ, ਆਧੁਨਿਕ ਸਹੂਲਤਾਂ ਅਤੇ ਹਮਦਰਦ ਪਹੁੰਚ ਲਈ ਜਾਣੀ ਜਾਂਦੀ ਹੈ।'
                  : 'To be a trusted healthcare institution, recognized for clinical excellence, modern facilities and a compassionate approach.'}
              </p>
            </div>

            {/* Card 3: Our Values (Rose / Pink Tinted) */}
            <div className="bg-[#FFF5F5] rounded-2xl p-6 sm:p-7 border border-red-100/80 shadow-[0_2px_12px_rgba(239,68,68,0.04)] flex flex-col justify-start">
              <div className="w-14 h-14 rounded-full bg-[#FEE2E2] text-[#EF4444] flex items-center justify-center mb-5 shrink-0">
                <Gem className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#08284B] mb-3">
                {language === 'pa' ? 'ਸਾਡੇ ਮੁੱਲ' : 'Our Values'}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#52647A]">
                <li className="flex items-center gap-2.5 font-medium text-slate-700">
                  <Check className="w-4 h-4 text-[#0875E1] shrink-0" />
                  <span>{language === 'pa' ? 'ਮਰੀਜ਼-ਪਹਿਲ ਪਹੁੰਚ' : 'Patient First Approach'}</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium text-slate-700">
                  <Check className="w-4 h-4 text-[#0875E1] shrink-0" />
                  <span>{language === 'pa' ? 'ਇਮਾਨਦਾਰੀ ਅਤੇ ਪਾਰਦਰਸ਼ਤਾ' : 'Integrity and Transparency'}</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium text-slate-700">
                  <Check className="w-4 h-4 text-[#0875E1] shrink-0" />
                  <span>{language === 'pa' ? 'ਗੁਣਵੱਤਾ ਅਤੇ ਸੁਰੱਖਿਆ' : 'Quality and Safety'}</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium text-slate-700">
                  <Check className="w-4 h-4 text-[#0875E1] shrink-0" />
                  <span>{language === 'pa' ? 'ਸਤਿਕਾਰ ਅਤੇ ਹਮਦਰਦੀ' : 'Respect and Compassion'}</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium text-slate-700">
                  <Check className="w-4 h-4 text-[#0875E1] shrink-0" />
                  <span>{language === 'pa' ? 'ਨਿਰੰਤਰ ਸੁਧਾਰ' : 'Continuous Improvement'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. WHY CHOOSE US ("What Makes Us Different")             */}
      {/* ========================================================= */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Eyebrow + inline stripe */}
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-xs font-bold tracking-wider text-[#08284B] uppercase">
              {language === 'pa' ? 'ਸਾਨੂੰ ਕਿਉਂ ਚੁਣੋ' : 'WHY CHOOSE US'}
            </span>
            <ColorStripe width="w-16" variant="about" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#08284B] tracking-tight mb-8 sm:mb-10">
            {language === 'pa' ? 'ਕਿਹੜੀ ਚੀਜ਼ ਸਾਨੂੰ ਵੱਖਰੀ ਬਣਾਉਂਦੀ ਹੈ' : 'What Makes Us Different'}
          </h2>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Multi-Speciality Care */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-[#EBF5FF] text-[#0875E1] flex items-center justify-center mb-4">
                <Stethoscope className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-[#08284B] mb-2">
                {language === 'pa' ? 'ਬਹੁ-ਵਿਸ਼ੇਸ਼ਤਾ ਦੇਖਭਾਲ' : 'Multi-Speciality Care'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {language === 'pa'
                  ? 'ਇੱਕੋ ਛੱਤ ਹੇਠ ਡਾਕਟਰੀ ਸੇਵਾਵਾਂ ਦੀ ਇੱਕ ਵਿਸ਼ਾਲ ਸ਼੍ਰੇਣੀ।'
                  : 'A wide range of medical services under one roof.'}
              </p>
            </div>

            {/* Card 2: Experienced Team */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-[#FFE4E6] text-[#F43F5E] flex items-center justify-center mb-4">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-[#08284B] mb-2">
                {language === 'pa' ? 'ਤਜਰਬੇਕਾਰ ਟੀਮ' : 'Experienced Team'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {language === 'pa'
                  ? 'ਵੱਖ-ਵੱਖ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵਿੱਚ ਹੁਨਰਮੰਦ ਅਤੇ ਸਮਰਪਿਤ ਡਾਕਟਰ।'
                  : 'Skilled and dedicated doctors across specialties.'}
              </p>
            </div>

            {/* Card 3: Modern Infrastructure */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center mb-4">
                <Settings className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-[#08284B] mb-2">
                {language === 'pa' ? 'ਆਧੁਨਿਕ ਬੁਨਿਆਦੀ ਢਾਂਚਾ' : 'Modern Infrastructure'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {language === 'pa'
                  ? 'ਉੱਨਤ ਉਪਕਰਣ ਅਤੇ ਆਧੁਨਿਕ ਸਹੂਲਤਾਂ।'
                  : 'Advanced equipment and modern facilities.'}
              </p>
            </div>

            {/* Card 4: Compassionate Environment */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center mb-4">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-[#08284B] mb-2">
                {language === 'pa' ? 'ਹਮਦਰਦ ਮਾਹੌਲ' : 'Compassionate Environment'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {language === 'pa'
                  ? 'ਨਿੱਜੀ ਦੇਖਭਾਲ ਨਾਲ ਮਰੀਜ਼-ਅਨੁਕੂਲ ਪਹੁੰਚ।'
                  : 'Patient-friendly approach with personalized care.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. OUR HOSPITAL SECTION (GALLERY ROW WITH UNDERLINE BARS) */}
      {/* ========================================================= */}
      <section className="py-14 md:py-20 bg-white border-t border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Eyebrow + inline stripe */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold tracking-wider text-[#08284B] uppercase">
              {language === 'pa' ? 'ਸਾਡਾ ਹਸਪਤਾਲ' : 'OUR HOSPITAL'}
            </span>
            <ColorStripe width="w-16" variant="about" />
          </div>

          {/* Heading + View All Facilities CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#08284B] tracking-tight">
              {language === 'pa' ? 'ਬਿਹਤਰ ਦੇਖਭਾਲ ਲਈ ਆਧੁਨਿਕ ਸਹੂਲਤਾਂ' : 'Modern Infrastructure for Better Care'}
            </h2>

            <a
              href="#facilities"
              onClick={handleFacilitiesClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#EBF5FF] hover:bg-blue-100 text-[#0875E1] font-semibold text-xs sm:text-sm transition-colors shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <span>{language === 'pa' ? 'ਸਾਰੀਆਂ ਸਹੂਲਤਾਂ ਦੇਖੋ' : 'View All Facilities'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 4 Gallery Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOSPITAL_GALLERY.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleOpenGallery(index)}
                className="group cursor-pointer flex flex-col"
              >
                {/* Photo container */}
                <div className="rounded-2xl overflow-hidden shadow-xs border border-slate-100 bg-slate-100 relative aspect-[4/3] group-hover:shadow-md transition-shadow">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-xs text-[#0875E1] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {language === 'pa' ? 'ਵੇਖੋ' : 'View'}
                    </span>
                  </div>
                </div>

                {/* Title + Short blue underline accent bar */}
                <h3 className="text-sm font-bold text-[#08284B] mt-3 group-hover:text-[#0875E1] transition-colors">
                  {item.title}
                </h3>
                <div className="h-[2.5px] w-6 bg-[#0875E1] rounded-full mt-1.5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. EMERGENCY ASSISTANCE BANNER                            */}
      {/* ========================================================= */}
      <section className="pb-16 pt-4 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F0F7FF] rounded-2xl p-6 sm:p-7 border border-blue-100/80 shadow-[0_4px_20px_rgba(8,117,225,0.06)] flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left Info: Siren Icon + Headings */}
            <div className="flex items-center gap-4 sm:gap-5 w-full lg:w-auto">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-blue-100 text-[#EF4444] flex items-center justify-center shrink-0">
                <Siren className="w-7 h-7 text-[#EF4444] animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#08284B] tracking-tight">
                  {language === 'pa' ? 'ਕੀ ਤੁਰੰਤ ਸਹਾਇਤਾ ਦੀ ਲੋੜ ਹੈ?' : 'Need Immediate Assistance?'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {language === 'pa'
                    ? '24 ਘੰਟੇ ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ ਉਪਲਬਧ ਹਨ'
                    : '24 Hours Emergency Services Available'}
                </p>
              </div>
            </div>

            {/* Middle Vertical Divider (Desktop) */}
            <div className="hidden lg:block h-12 w-[1px] bg-blue-200/60" />

            {/* Right Contact: Phone Number & Red CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between lg:justify-end gap-5 w-full lg:w-auto">
              <a
                href={`tel:${HOSPITAL_INFO.phoneTel}`}
                className="flex items-center gap-2.5 text-xl sm:text-2xl font-extrabold text-[#EF4444] hover:text-[#DC2626] transition-colors"
              >
                <Phone className="w-6 h-6 fill-[#EF4444]" />
                <span>{HOSPITAL_INFO.phoneFormatted}</span>
              </a>

              <a
                href={`tel:${HOSPITAL_INFO.phoneTel}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-bold shadow-[0_4px_14px_rgba(239,68,68,0.3)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.4)] transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>{language === 'pa' ? 'ਹੁਣੇ ਕਾਲ ਕਰੋ' : 'Call Now'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Facility Photos */}
      <GalleryLightBoxModal
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
        initialIndex={galleryIndex}
      />
    </div>
  );
};
