import React, { useState } from 'react';
import {
  Stethoscope,
  Activity,
  HeartHandshake,
  Bone,
  Smile,
  Syringe,
  Sparkles,
  Brain,
  ScanLine,
  Monitor,
  FlaskConical,
  CheckCircle2,
  ShieldCheck,
  Users,
  Heart,
  Plus,
  Minus,
  ArrowRight,
  Calendar,
  Thermometer,
  Droplet,
  Wind,
  Utensils,
  ChevronRight,
  Quote,
} from 'lucide-react';
import { ColorStripe } from '../components/ColorStripe';
import { EmergencyBanner } from '../components/EmergencyBanner';
import {
  SERVICES,
  SERVICES_PAGE_CARDS,
  SERVICES_PAGE_FAQS,
  COMMON_CONDITIONS,
  HOSPITAL_INFO,
  ServicePageCard,
} from '../data/hospitalData';
import { ServiceItem } from '../types';

interface ServicesPageProps {
  onOpenBooking: (doctorName?: string, departmentName?: string) => void;
  onSelectService: (service: ServiceItem) => void;
  onNavigateHome: () => void;
  language: 'en' | 'pa';
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenBooking,
  onSelectService,
  onNavigateHome,
  language,
}) => {
  // Accordion state for FAQs
  const [openFaqId, setOpenFaqId] = useState<string | null>('s-faq-1');

  // Toggle FAQ item
  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  // Helper to get Lucide icon component by name
  const renderCardIcon = (iconName: string, iconColor: string) => {
    const props = { className: 'w-6 h-6', style: { color: iconColor } };
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
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Brain':
        return <Brain {...props} />;
      case 'ScanLine':
        return <ScanLine {...props} />;
      case 'Monitor':
        return <Monitor {...props} />;
      case 'FlaskConical':
        return <FlaskConical {...props} />;
      default:
        return <Activity {...props} />;
    }
  };

  // Helper for Common Conditions icons
  const renderConditionIcon = (iconName: string, color: string) => {
    const props = { className: 'w-4 h-4', style: { color } };
    switch (iconName) {
      case 'Thermometer':
        return <Thermometer {...props} />;
      case 'Droplet':
        return <Droplet {...props} />;
      case 'Heart':
        return <Heart {...props} />;
      case 'Wind':
        return <Wind {...props} />;
      case 'Utensils':
        return <Utensils {...props} />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      default:
        return <CheckCircle2 {...props} />;
    }
  };

  const handleLearnMore = (card: ServicePageCard) => {
    const matchingService =
      SERVICES.find((s) => s.id === card.serviceId) || SERVICES[0];
    onSelectService(matchingService);
  };

  const scrollToServices = () => {
    const el = document.getElementById('comprehensive-services-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 font-sans">
      {/* 1. BREADCRUMB & HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F7FD] via-[#F8FBFE] to-white border-b border-slate-100">
        {/* Subtle decorative medical cross patterns in background */}
        <div className="absolute top-12 left-10 text-blue-200/40 select-none pointer-events-none text-8xl font-light">
          +
        </div>
        <div className="absolute top-20 right-1/3 text-blue-200/30 select-none pointer-events-none text-9xl font-light">
          +
        </div>

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pb-16 relative z-10">
          {/* Breadcrumb matching reference screenshot: Home > Services */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[13.5px] font-medium text-slate-500 mb-8"
          >
            <button
              onClick={onNavigateHome}
              className="text-[#0875E1] hover:underline cursor-pointer transition-colors"
            >
              Home
            </button>
            <span className="text-slate-400">›</span>
            <span className="text-[#08284B] font-semibold">Services</span>
          </nav>

          {/* Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headlines & 3 Badges */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#08284B] tracking-tight leading-[1.18]">
                Our Medical <span className="text-[#0875E1]">Services</span>
              </h1>

              <p className="text-base sm:text-[16.5px] text-slate-600 leading-relaxed max-w-xl">
                Comprehensive healthcare services under one roof, delivered with modern
                technology, experienced doctors and a patient-first approach.
              </p>

              {/* 3 Circular Badges in a Row matching reference */}
              <div className="pt-2 flex flex-wrap items-center gap-6 sm:gap-10">
                {/* Badge 1: Expert Care */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#EBF5FF] flex items-center justify-center text-[#0875E1] shadow-sm mb-2.5">
                    <Stethoscope className="w-6 h-6 text-[#0875E1]" />
                  </div>
                  <span className="text-[13px] font-bold text-[#08284B] leading-tight">
                    Expert
                  </span>
                  <span className="text-[13px] font-bold text-[#08284B] leading-tight">
                    Care
                  </span>
                </div>

                {/* Badge 2: Dedicated Specialists */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#E6F8F0] flex items-center justify-center text-[#10B981] shadow-sm mb-2.5">
                    <Users className="w-6 h-6 text-[#10B981]" />
                  </div>
                  <span className="text-[13px] font-bold text-[#08284B] leading-tight">
                    Dedicated
                  </span>
                  <span className="text-[13px] font-bold text-[#08284B] leading-tight">
                    Specialists
                  </span>
                </div>

                {/* Badge 3: Modern Technology */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#FEF3C7] flex items-center justify-center text-[#F59E0B] shadow-sm mb-2.5">
                    <ShieldCheck className="w-6 h-6 text-[#F59E0B]" />
                  </div>
                  <span className="text-[13px] font-bold text-[#08284B] leading-tight">
                    Modern
                  </span>
                  <span className="text-[13px] font-bold text-[#08284B] leading-tight">
                    Technology
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Doctor Consultation Image with Quote Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-white group">
                <img
                  src="/images/services_hero_consultation.jpg"
                  alt="Doctor consulting patient at Metro Multispeciality Hospital"
                  className="w-full h-[320px] sm:h-[350px] object-cover object-top"
                />

                {/* Overlaid White Quote Card matching reference */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-5 sm:right-6 bg-white/95 backdrop-blur-md rounded-xl p-4 sm:p-5 shadow-md border border-slate-100/90">
                  <div className="flex items-start gap-3">
                    <Quote className="w-5 h-5 text-[#0875E1] shrink-0 rotate-180 fill-[#0875E1]/15" />
                    <div className="space-y-2">
                      <p className="text-xs sm:text-[13px] font-medium text-slate-700 leading-snug italic">
                        “Your health is our priority. We provide compassionate and
                        personalized care for every patient.”
                      </p>
                      <div className="w-8 h-[2.5px] bg-[#0875E1] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPREHENSIVE CARE FOR EVERY NEED (11 SERVICE CARDS) */}
      <section id="comprehensive-services-grid" className="py-14 sm:py-18 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Row: Title on Left, Book Appointment Button on Right */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold tracking-widest text-[#08284B] uppercase">
                  OUR SERVICES
                </span>
                <ColorStripe />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#08284B] tracking-tight">
                Comprehensive Care for Every Need
              </h2>
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#EBF3FC] hover:bg-blue-100/80 text-[#0875E1] text-[13.5px] font-semibold transition-all shrink-0 cursor-pointer shadow-xs active:scale-95"
            >
              <span>Book an Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 11 Service Cards Grid matching reference layout: 4 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {SERVICES_PAGE_CARDS.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Icon in pastel circle */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-5 transition-transform group-hover:scale-105"
                    style={{ backgroundColor: card.circleBg }}
                  >
                    {renderCardIcon(card.iconName, card.iconColor)}
                  </div>

                  {/* Title & optional (On Call) */}
                  <h3 className="text-[17px] font-bold text-[#08284B] tracking-tight leading-snug mb-2 group-hover:text-[#0875E1] transition-colors">
                    {card.title} {card.subtitle && <span className="font-semibold text-slate-600 block text-sm">{card.subtitle}</span>}
                  </h3>

                  {/* Description */}
                  <p className="text-[13px] text-slate-500 leading-relaxed mb-5">
                    {card.description}
                  </p>
                </div>

                {/* Learn More link */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleLearnMore(card)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#0875E1] hover:text-blue-700 cursor-pointer group/link transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </button>

                  <button
                    onClick={() => onOpenBooking(undefined, card.departmentKey)}
                    title={`Book for ${card.title}`}
                    className="p-1.5 rounded-md text-slate-400 hover:text-[#0875E1] hover:bg-blue-50 transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED DEPARTMENT SECTION */}
      <section className="py-14 sm:py-18 bg-[#FAFBFD] border-y border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Department Description, Bullets, and Action Buttons */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold tracking-widest text-[#08284B] uppercase">
                    FEATURED DEPARTMENT
                  </span>
                  <ColorStripe />
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#08284B] tracking-tight">
                  General Medicine
                </h2>
              </div>

              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                Our General Medicine department provides comprehensive care for a wide range
                of medical conditions, focusing on prevention, early diagnosis and long-term
                management.
              </p>

              {/* 4 Checkmark Bullets */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0875E1] shrink-0 fill-blue-50" />
                  <span className="text-[14px] text-slate-700 font-medium">
                    Treatment for common and complex illnesses
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0875E1] shrink-0 fill-blue-50" />
                  <span className="text-[14px] text-slate-700 font-medium">
                    Preventive health checkups
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0875E1] shrink-0 fill-blue-50" />
                  <span className="text-[14px] text-slate-700 font-medium">
                    Chronic disease management (diabetes, hypertension, etc.)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0875E1] shrink-0 fill-blue-50" />
                  <span className="text-[14px] text-slate-700 font-medium">
                    Personalized treatment plans
                  </span>
                </div>
              </div>

              {/* Action Buttons: Book an Appointment + View All Services */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={() => onOpenBooking(undefined, 'General Medicine')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0875E1] hover:bg-blue-600 text-white text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <span>Book an Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={scrollToServices}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-[#0875E1] hover:bg-blue-50 text-[#0875E1] text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <span>View All Services</span>
                </button>
              </div>
            </div>

            {/* Right Column: Composite Card with Doctor photo + Common Conditions We Treat */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden grid grid-cols-1 sm:grid-cols-12">
                {/* Doctor Photo */}
                <div className="sm:col-span-5 h-[280px] sm:h-auto relative">
                  <img
                    src="/images/services_featured_doctor.jpg"
                    alt="Doctor in General Medicine consultation"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Common Conditions List */}
                <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-[17px] font-bold text-[#08284B] tracking-tight mb-4">
                      Common Conditions We Treat
                    </h3>

                    <div className="divide-y divide-slate-100">
                      {COMMON_CONDITIONS.map((cond) => (
                        <div
                          key={cond.id}
                          className="py-2.5 flex items-center gap-3 group hover:translate-x-1 transition-transform"
                        >
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                            style={{ backgroundColor: cond.bgColor }}
                          >
                            {renderConditionIcon(cond.iconName, cond.iconColor)}
                          </div>
                          <span className="text-xs sm:text-[13.5px] font-medium text-slate-700">
                            {cond.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold tracking-widest text-[#08284B] uppercase">
                HOW IT WORKS
              </span>
              <ColorStripe />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#08284B] tracking-tight">
              Get the Care You Need in 3 Simple Steps
            </h2>
          </div>

          {/* 3 Step Cards with connecting arrows */}
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 lg:gap-6 items-center">
            {/* Step 1 */}
            <div
              onClick={scrollToServices}
              className="md:col-span-3 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer relative group flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-[#0875E1] text-white flex items-center justify-center font-bold text-sm shrink-0">
                1
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-[#EBF5FF] flex items-center justify-center text-[#0875E1] mb-3 group-hover:scale-105 transition-transform">
                  <Calendar className="w-6 h-6 text-[#0875E1]" />
                </div>
                <h3 className="text-base font-bold text-[#08284B] mb-1 group-hover:text-[#0875E1] transition-colors">
                  Choose a Service
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                  Select the department or service you need.
                </p>
              </div>
            </div>

            {/* Connecting Arrow 1 */}
            <div className="hidden md:flex md:col-span-1 justify-center text-[#0875E1]">
              <ArrowRight className="w-6 h-6 opacity-60" />
            </div>

            {/* Step 2 */}
            <div
              onClick={() => onOpenBooking()}
              className="md:col-span-3 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer relative group flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-[#0875E1] text-white flex items-center justify-center font-bold text-sm shrink-0">
                2
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-[#EBF5FF] flex items-center justify-center text-[#0875E1] mb-3 group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6 text-[#0875E1]" />
                </div>
                <h3 className="text-base font-bold text-[#08284B] mb-1 group-hover:text-[#0875E1] transition-colors">
                  Book an Appointment
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                  Pick a convenient date and time.
                </p>
              </div>
            </div>

            {/* Connecting Arrow 2 */}
            <div className="hidden md:flex md:col-span-1 justify-center text-[#0875E1]">
              <ArrowRight className="w-6 h-6 opacity-60" />
            </div>

            {/* Step 3 */}
            <div
              onClick={() => onOpenBooking()}
              className="md:col-span-3 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer relative group flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-[#0875E1] text-white flex items-center justify-center font-bold text-sm shrink-0">
                3
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-[#EBF5FF] flex items-center justify-center text-[#0875E1] mb-3 group-hover:scale-105 transition-transform">
                  <Stethoscope className="w-6 h-6 text-[#0875E1]" />
                </div>
                <h3 className="text-base font-bold text-[#08284B] mb-1 group-hover:text-[#0875E1] transition-colors">
                  Consult Our Specialists
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                  Get expert care from our experienced doctors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-14 sm:py-18 bg-[#FAFBFD] border-t border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold tracking-widest text-[#08284B] uppercase">
                  OUR SERVICES
                </span>
                <ColorStripe />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#08284B] tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <button
              onClick={() => {
                // If all closed or partial, expand all; otherwise collapse
                setOpenFaqId((prev) => (prev ? null : 's-faq-1'));
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#EBF3FC] hover:bg-blue-100/80 text-[#0875E1] text-[13.5px] font-semibold transition-all shrink-0 cursor-pointer shadow-xs active:scale-95"
            >
              <span>View All FAQs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 6 FAQs in 2 Columns matching reference */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start">
            {/* Column 1: FAQs 1, 2, 3 */}
            <div className="space-y-4">
              {SERVICES_PAGE_FAQS.slice(0, 3).map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer hover:bg-slate-50/50 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-[15px] font-bold text-[#08284B] pr-4">
                        {faq.question}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-[13.5px] text-slate-600 leading-relaxed border-t border-slate-100/80">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Column 2: FAQs 4, 5, 6 */}
            <div className="space-y-4">
              {SERVICES_PAGE_FAQS.slice(3, 6).map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer hover:bg-slate-50/50 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-[15px] font-bold text-[#08284B] pr-4">
                        {faq.question}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-[13.5px] text-slate-600 leading-relaxed border-t border-slate-100/80">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. EMERGENCY ASSISTANCE BANNER */}
      <EmergencyBanner language={language} />
    </div>
  );
};
