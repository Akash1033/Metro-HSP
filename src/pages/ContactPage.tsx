import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  Send,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Navigation,
  ExternalLink,
  Car,
  Users,
  ShieldCheck,
  Headphones,
  ArrowRight,
  ChevronDown,
  BellRing,
  PhoneCall,
  Loader2,
  Maximize2,
  X,
  Award,
} from 'lucide-react';
import { ColorStripe } from '../components/ColorStripe';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface ContactPageProps {
  onOpenBooking: (doctorName?: string, departmentName?: string) => void;
  onNavigateHome: () => void;
  language: 'en' | 'pa';
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onOpenBooking,
  onNavigateHome,
  language,
}) => {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    id: string;
    fullName: string;
    subject: string;
    message: string;
    date: string;
  } | null>(null);

  // Reception photo view state (authentic hospital reception desk vs patient waiting lounge)
  const [receptionView, setReceptionView] = useState<'sign' | 'lounge'>('sign');
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  // Validate form inputs
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName =
        language === 'pa' ? 'ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰਨਾ ਲਾਜ਼ਮੀ ਹੈ' : 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName =
        language === 'pa' ? 'ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਵੈਧ ਨਾਮ ਦਰਜ ਕਰੋ' : 'Please enter a valid full name';
    }

    // Phone validation (Indian 10-digit mobile)
    const phoneClean = formData.phone.replace(/[\s\-\(\)\+]/g, '');
    const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      errors.phone =
        language === 'pa' ? 'ਫੋਨ ਨੰਬਰ ਦਰਜ ਕਰਨਾ ਲਾਜ਼ਮੀ ਹੈ' : 'Phone number is required';
    } else if (!phoneRegex.test(phoneClean)) {
      errors.phone =
        language === 'pa'
          ? 'ਕਿਰਪਾ ਕਰਕੇ 10-ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ'
          : 'Please enter a valid 10-digit mobile number';
    }

    // Email is optional, but if entered must be valid
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email =
          language === 'pa'
            ? 'ਕਿਰਪਾ ਕਰਕੇ ਵੈਧ ਈਮੇਲ ਪਤਾ ਦਰਜ ਕਰੋ'
            : 'Please enter a valid email address';
      }
    }

    if (!formData.subject.trim() || formData.subject === 'Select a subject') {
      errors.subject =
        language === 'pa' ? 'ਕਿਰਪਾ ਕਰਕੇ ਵਿਸ਼ਾ ਚੁਣੋ' : 'Please select a subject';
    }

    if (!formData.message.trim()) {
      errors.message =
        language === 'pa' ? 'ਸੰਦੇਸ਼ ਲਿਖਣਾ ਲਾਜ਼ਮੀ ਹੈ' : 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message =
        language === 'pa'
          ? 'ਸੰਦੇਸ਼ ਘੱਟੋ-ਘੱਟ 10 ਅੱਖਰਾਂ ਦਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ'
          : 'Please provide a message with at least 10 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit your enquiry.');
      }

      setSubmittedData({
        id: data.messageId || `MSG-${Math.floor(100000 + Math.random() * 900000)}`,
        fullName: formData.fullName,
        subject: formData.subject,
        message: formData.message,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      });
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setServerError(
        err.message ||
          'Unable to send message. Please contact our reception desk directly at 090565 79319.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
    });
    setFormErrors({});
    setServerError(null);
    setSubmittedData(null);
  };

  const openGoogleMapsDirections = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        'Metro Multispeciality Hospital, Pahwa Rd, near Neela Jhanda Gurudwara, New Shivaji Nagar, New Hargobind Nagar, Ludhiana, Punjab 141008'
      )}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 font-sans">
      {/* ========================================================= */}
      {/* 1. HERO SECTION: "Get in Touch / We're Here to Help You" */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#F0F6FD] via-[#F4F9FE] to-[#EAF2FB] border-b border-slate-100">
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-10 left-8 text-blue-200/35 select-none pointer-events-none text-8xl font-light">
          +
        </div>
        <div className="absolute bottom-6 left-1/3 text-blue-200/25 select-none pointer-events-none text-9xl font-light">
          +
        </div>

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pb-16 relative z-10">
          {/* Breadcrumb: Home > Contact Us */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[13.5px] font-medium text-slate-500 mb-6 sm:mb-8"
          >
            <button
              onClick={onNavigateHome}
              className="text-[#0875E1] hover:underline cursor-pointer transition-colors"
            >
              {language === 'pa' ? 'ਘਰ' : 'Home'}
            </button>
            <span className="text-slate-400">›</span>
            <span className="text-[#08284B] font-semibold">
              {language === 'pa' ? 'ਸੰਪਰਕ ਕਰੋ' : 'Contact Us'}
            </span>
          </nav>

          {/* Hero Content Grid: Left Text & Right Blended Staff/Reception Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Headlines & 3 Highlights */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#08284B] tracking-tight leading-[1.15]">
                  {language === 'pa' ? (
                    <>
                      ਸੰਪਰਕ ਕਰੋ <br />
                      <span className="text-[#0875E1]">ਅਸੀਂ ਤੁਹਾਡੀ ਸੇਵਾ ਵਿੱਚ ਹਾਜ਼ਰ ਹਾਂ</span>
                    </>
                  ) : (
                    <>
                      Get in Touch <br />
                      We’re Here to <span className="text-[#0875E1]">Help You</span>
                    </>
                  )}
                </h1>

                <p className="text-sm sm:text-[15.5px] text-slate-600 leading-relaxed max-w-xl mt-3">
                  {language === 'pa'
                    ? 'ਮੁਲਾਕਾਤਾਂ, ਪੁੱਛਗਿੱਛ ਜਾਂ ਕਿਸੇ ਵੀ ਸਹਾਇਤਾ ਲਈ ਸਾਡੀ ਟੀਮ ਹਮੇਸ਼ਾ ਤੁਹਾਡੇ ਸਾਥ ਲਈ ਤਿਆਰ ਹੈ।'
                    : 'For appointments, enquiries or any assistance, our team is always ready to support you.'}
                </p>
              </div>

              {/* 3 Compact Benefit Highlights with Blue Icons matching reference */}
              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-[13px] font-bold text-[#08284B]">
                {/* Highlight 1: Compassionate Support */}
                <div className="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-blue-100/80 shadow-2xs">
                  <div className="w-7 h-7 rounded-full bg-[#0875E1] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span>
                    {language === 'pa' ? 'ਹਮਦਰਦ ਦੇਖਭਾਲ' : 'Compassionate Support'}
                  </span>
                </div>

                {/* Highlight 2: Quick Response */}
                <div className="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-blue-100/80 shadow-2xs">
                  <div className="w-7 h-7 rounded-full bg-[#0875E1] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Users className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span>
                    {language === 'pa' ? 'ਤੁਰੰਤ ਜਵਾਬ' : 'Quick Response'}
                  </span>
                </div>

                {/* Highlight 3: 24/7 Assistance */}
                <div className="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-blue-100/80 shadow-2xs">
                  <div className="w-7 h-7 rounded-full bg-[#0875E1] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <PhoneCall className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    {language === 'pa' ? '24/7 ਸਹਾਇਤਾ' : '24/7 Assistance'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Reception Staff Image with Seamless Left Gradient Blend */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(8,117,225,0.08)] bg-white border border-blue-100/60 group">
                <img
                  src="/images/contact/hero_staff_reception.jpg"
                  alt="Metro Multispeciality Hospital Reception Desk and Staff"
                  className="w-full h-[260px] sm:h-[300px] lg:h-[320px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                />
                {/* Soft Left & Bottom Fade Overlays for seamless blending matching reference */}
                <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#F0F6FD] via-[#F0F6FD]/40 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. FOUR CONTACT INFORMATION CARDS (Directly below hero)   */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-10">
            {/* Card 1: Call Us */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#0875E1] text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-sm">
                  <Phone className="w-5 h-5 fill-current" />
                </div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {language === 'pa' ? 'ਸਾਨੂੰ ਕਾਲ ਕਰੋ' : 'Call Us'}
                </h3>
                <a
                  href={`tel:${HOSPITAL_INFO.phoneTel}`}
                  className="text-[17px] font-black text-[#08284B] hover:text-[#0875E1] transition-colors block mb-1 tracking-tight"
                >
                  +91 90565-79319
                </a>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mt-2 pt-2 border-t border-slate-100">
                {language === 'pa'
                  ? '24/7 ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ ਉਪਲਬਧ'
                  : '24/7 Emergency Services Available'}
              </p>
            </div>

            {/* Card 2: Email Us */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#FEE2E2] text-[#EF4444] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                  <Mail className="w-5 h-5 text-[#EF4444]" />
                </div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {language === 'pa' ? 'ਈਮੇਲ ਭੇਜੋ' : 'Email Us'}
                </h3>
                <a
                  href="mailto:info@metrohospital.com"
                  className="text-[15px] font-bold text-[#08284B] hover:text-[#0875E1] transition-colors block mb-1 truncate"
                >
                  info@metrohospital.com
                </a>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mt-2 pt-2 border-t border-slate-100">
                {language === 'pa' ? 'ਆਮ ਪੁੱਛਗਿੱਛ ਲਈ' : 'For general enquiries'}
              </p>
            </div>

            {/* Card 3: Visit Us */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                  <MapPin className="w-5 h-5 text-[#10B981]" />
                </div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {language === 'pa' ? 'ਸਾਡੇ ਕੋਲ ਆਓ' : 'Visit Us'}
                </h3>
                <p className="text-xs sm:text-[13px] font-bold text-[#08284B] leading-snug mb-1">
                  {HOSPITAL_INFO.address}
                </p>
                <p className="text-xs text-slate-500">{HOSPITAL_INFO.landmark}</p>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={openGoogleMapsDirections}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0875E1] hover:underline cursor-pointer"
                >
                  <span>{language === 'pa' ? 'ਰਸਤਾ ਵੇਖੋ' : 'Get Directions'}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Card 4: Working Hours */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#F3E8FF] text-[#8B5CF6] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                  <Clock className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {language === 'pa' ? 'ਕੰਮ ਦੇ ਘੰਟੇ' : 'Working Hours'}
                </h3>
                <p className="text-xs sm:text-[13px] font-semibold text-[#08284B] leading-tight">
                  Mon - Sat: 9:00 AM - 8:00 PM
                </p>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-tight mt-0.5 mb-1">
                  Sunday: 9:00 AM - 2:00 PM
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Emergency:</span>
                <span className="font-extrabold text-[#EF4444] bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
                  24/7 Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. MAIN CONTACT SECTION: FORM (LEFT) + RECEPTION (RIGHT) */}
      {/* ========================================================= */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold tracking-widest text-[#08284B] uppercase">
                    {language === 'pa' ? 'ਸਾਨੂੰ ਸੁਨੇਹਾ ਭੇਜੋ' : 'SEND US A MESSAGE'}
                  </span>
                  <ColorStripe />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08284B] tracking-tight">
                  {language === 'pa' ? 'ਸੰਪਰਕ ਫਾਰਮ' : 'Contact Us'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {language === 'pa'
                    ? 'ਹੇਠਾਂ ਦਿੱਤਾ ਫਾਰਮ ਭਰੋ ਅਤੇ ਸਾਡੀ ਟੀਮ ਤੁਹਾਡੇ ਨਾਲ ਜਲਦੀ ਤੋਂ ਜਲਦੀ ਸੰਪਰਕ ਕਰੇਗੀ।'
                    : 'Fill out the form below and our team will get back to you as soon as possible.'}
                </p>
              </div>

              {/* Server-Side Error Alert if submission failed */}
              {serverError && (
                <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-700 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Submission Error</strong>
                    <span>{serverError}</span>
                  </div>
                </div>
              )}

              {/* Form Success State: Shown only when accepted by backend */}
              {submittedData ? (
                <div className="bg-[#F0FDF4] border border-emerald-200 rounded-2xl p-7 sm:p-8 text-center space-y-4 animate-in fade-in duration-300 shadow-xs">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full mb-1">
                      Enquiry ID: {submittedData.id}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#08284B]">
                      {language === 'pa' ? 'ਸੁਨੇਹਾ ਸਫਲਤਾਪੂਰਵਕ ਪ੍ਰਾਪਤ ਹੋਇਆ' : 'Message Received Successfully'}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#08284B]">{submittedData.fullName}</strong>!
                    Your enquiry regarding{' '}
                    <span className="font-semibold text-[#0875E1]">{submittedData.subject}</span> has
                    been registered with our hospital desk. Our front-office team will call you back promptly.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0875E1] hover:bg-[#0766c6] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
                    >
                      <span>Send Another Message</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Actual Contact Form */
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4 sm:space-y-5"
                >
                  {/* Row 1: Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-[#08284B] mb-1.5">
                        {language === 'pa' ? 'ਪੂਰਾ ਨਾਮ *' : 'Full Name *'}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => {
                            setFormData({ ...formData, fullName: e.target.value });
                            if (formErrors.fullName) {
                              setFormErrors({ ...formErrors, fullName: '' });
                            }
                          }}
                          placeholder={language === 'pa' ? 'ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ' : 'Enter your full name'}
                          className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border ${
                            formErrors.fullName
                              ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                              : 'border-slate-200 bg-[#F8FAFC] focus:border-[#0875E1] focus:bg-white'
                          } focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all`}
                        />
                      </div>
                      {formErrors.fullName && (
                        <p className="text-[11.5px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{formErrors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-[#08284B] mb-1.5">
                        {language === 'pa' ? 'ਫੋਨ ਨੰਬਰ *' : 'Phone Number *'}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (formErrors.phone) {
                              setFormErrors({ ...formErrors, phone: '' });
                            }
                          }}
                          placeholder={language === 'pa' ? 'ਆਪਣਾ ਫੋਨ ਨੰਬਰ ਦਰਜ ਕਰੋ' : 'Enter your phone number'}
                          className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border ${
                            formErrors.phone
                              ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                              : 'border-slate-200 bg-[#F8FAFC] focus:border-[#0875E1] focus:bg-white'
                          } focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all`}
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="text-[11.5px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{formErrors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Subject Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-[#08284B] mb-1.5">
                      {language === 'pa' ? 'ਵਿਸ਼ਾ *' : 'Subject *'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <select
                        value={formData.subject}
                        onChange={(e) => {
                          setFormData({ ...formData, subject: e.target.value });
                          if (formErrors.subject) {
                            setFormErrors({ ...formErrors, subject: '' });
                          }
                        }}
                        className={`w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl border appearance-none ${
                          formErrors.subject
                            ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                            : 'border-slate-200 bg-[#F8FAFC] focus:border-[#0875E1] focus:bg-white'
                        } focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-slate-700 cursor-pointer`}
                      >
                        <option value="">
                          {language === 'pa' ? 'ਵਿਸ਼ਾ ਚੁਣੋ' : 'Select a subject'}
                        </option>
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Appointment Enquiry">Appointment Enquiry</option>
                        <option value="Doctor or Department Information">
                          Doctor or Department Information
                        </option>
                        <option value="Facilities Information">Facilities Information</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                    {formErrors.subject && (
                      <p className="text-[11.5px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{formErrors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Row 3: Message Textarea */}
                  <div>
                    <label className="block text-xs font-bold text-[#08284B] mb-1.5">
                      {language === 'pa' ? 'ਸੰਦੇਸ਼ *' : 'Message *'}
                    </label>
                    <div className="relative">
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (formErrors.message) {
                            setFormErrors({ ...formErrors, message: '' });
                          }
                        }}
                        placeholder={
                          language === 'pa'
                            ? 'ਅਸੀਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ?'
                            : 'How can we help you?'
                        }
                        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border ${
                          formErrors.message
                            ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                            : 'border-slate-200 bg-[#F8FAFC] focus:border-[#0875E1] focus:bg-white'
                        } focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all resize-y`}
                      />
                    </div>
                    {formErrors.message && (
                      <p className="text-[11.5px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{formErrors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Optional Email Address Field */}
                  <div>
                    <label className="block text-xs font-bold text-[#08284B] mb-1.5">
                      {language === 'pa' ? 'ਈਮੇਲ ਪਤਾ (ਵਿਕਲਪਿਕ)' : 'Email Address (Optional)'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email) {
                            setFormErrors({ ...formErrors, email: '' });
                          }
                        }}
                        placeholder="youremail@example.com"
                        className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border ${
                          formErrors.email
                            ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                            : 'border-slate-200 bg-[#F8FAFC] focus:border-[#0875E1] focus:bg-white'
                        } focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all`}
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-[11.5px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{formErrors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#0875E1] hover:bg-[#0766c6] text-white font-bold text-xs sm:text-sm shadow-[0_3px_12px_rgba(8,117,225,0.25)] hover:shadow-[0_6px_18px_rgba(8,117,225,0.32)] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{language === 'pa' ? 'ਭੇਜਿਆ ਜਾ ਰਿਹਾ ਹੈ...' : 'Sending...'}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{language === 'pa' ? 'ਸੁਨੇਹਾ ਭੇਜੋ' : 'Send Message'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Authentic Hospital Reception Photo & "Our Reception" Panel */}
            <div className="lg:col-span-5 space-y-4">
              {/* Photo View Selector Tabs */}
              <div className="flex items-center justify-between bg-slate-100/90 p-1 rounded-xl border border-slate-200">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setReceptionView('sign')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      receptionView === 'sign'
                        ? 'bg-white text-[#0875E1] shadow-xs border border-blue-100'
                        : 'text-slate-600 hover:text-[#08284B]'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{language === 'pa' ? 'ਰਿਸੈਪਸ਼ਨ ਕਾਊਂਟਰ' : 'Reception Desk'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setReceptionView('lounge')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      receptionView === 'lounge'
                        ? 'bg-white text-[#0875E1] shadow-xs border border-blue-100'
                        : 'text-slate-600 hover:text-[#08284B]'
                    }`}
                  >
                    <span>{language === 'pa' ? 'ਵੇਟਿੰਗ ਲਾਉਂਜ' : 'Waiting Lounge'}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="px-2.5 py-1 text-[11px] font-bold text-slate-500 hover:text-[#0875E1] transition-colors flex items-center gap-1 cursor-pointer"
                  title={language === 'pa' ? 'ਵੱਡਾ ਕਰਕੇ ਦੇਖੋ' : 'Enlarge Photo'}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{language === 'pa' ? 'ਜ਼ੂਮ' : 'Expand'}</span>
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-white group flex flex-col">
                {/* Hospital Photo with Smooth View Switching */}
                <div className="h-[270px] sm:h-[320px] lg:h-[350px] overflow-hidden bg-slate-900 relative cursor-pointer"
                     onClick={() => setIsPhotoModalOpen(true)}
                >
                  <img
                    src={
                      receptionView === 'sign'
                        ? '/assets/aistudio/WhatsApp_Image_2026-10-14_at_12.27.29_PM_c04f1764.jpeg'
                        : '/images/contact/reception_lounge_photo.jpg'
                    }
                    alt={
                      receptionView === 'sign'
                        ? 'Metro Multispeciality Hospital Official Reception Desk and Illuminated Signboard'
                        : 'Metro Multispeciality Hospital Waiting Lounge'
                    }
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
                      receptionView === 'sign' ? 'object-[center_62%]' : 'object-center'
                    }`}
                  />

                  {/* Gradient Overlay for visual polish */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Top-Left Verified Hospital Facility Badge */}
                  <div className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-[11px] font-bold flex items-center gap-1.5 border border-white/20 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>
                      {receptionView === 'sign'
                        ? (language === 'pa' ? 'ਅਸਲ ਹਸਪਤਾਲ ਰਿਸੈਪਸ਼ਨ' : 'Official Hospital Reception Desk')
                        : (language === 'pa' ? 'ਮਰੀਜ਼ ਵੇਟਿੰਗ ਲਾਉਂਜ' : 'Patient Waiting Lounge')}
                    </span>
                  </div>

                  {/* Top-Right Click to Enlarge Prompt */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPhotoModalOpen(true);
                    }}
                    className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20 shadow-sm"
                    aria-label="Enlarge photo"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Subtle bottom tag showing real signboard note */}
                  {receptionView === 'sign' && (
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white/90">
                      <span className="bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-md font-medium border border-white/10">
                        Metro Multispeciality Hospital, Ludhiana
                      </span>
                      <span className="bg-[#0875E1]/90 backdrop-blur-xs px-2.5 py-1 rounded-md font-bold text-white shadow-2xs">
                        Open 24/7
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Caption Panel matching reference design exactly */}
                <div className="bg-gradient-to-r from-[#085CB4] to-[#0A6FD8] text-white p-5 sm:p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 shadow-xs border border-white/25">
                    <Users className="w-6 h-6 text-white stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-[17px] font-extrabold tracking-tight leading-snug">
                      {language === 'pa' ? 'ਸਾਡਾ ਰਿਸੈਪਸ਼ਨ ਡੈਸਕ' : 'Our Reception'}
                    </h4>
                    <p className="text-xs text-blue-100 font-medium leading-relaxed mt-0.5">
                      {language === 'pa'
                        ? 'ਦੋਸਤਾਨਾ ਸਟਾਫ ਮੁਲਾਕਾਤਾਂ, ਪੁੱਛਗਿੱਛ ਅਤੇ ਜਾਣਕਾਰੀ ਲਈ ਤੁਹਾਡੀ ਸਹਾਇਤਾ ਲਈ ਤਿਆਰ ਹੈ।'
                        : 'Friendly staff ready to assist you with appointments, enquiries and general information.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. EMERGENCY ASSISTANCE BANNER (Full Width)               */}
      {/* ========================================================= */}
      <section className="py-3 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFF5F5] border border-[#FED7D7] rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(239,51,64,0.06)] flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8">
            {/* Left: Icon & Title */}
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#EF3340] border border-red-200 flex items-center justify-center shrink-0 shadow-xs relative">
                <BellRing className="w-6 h-6 animate-pulse" />
                <span className="absolute -bottom-1 -right-1 bg-[#EF3340] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full shadow-2xs">
                  24
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#08284B] leading-tight">
                  {language === 'pa' ? 'ਤੁਰੰਤ ਸਹਾਇਤਾ ਦੀ ਲੋੜ ਹੈ?' : 'Need Immediate Assistance?'}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-[#EF3340] mt-0.5">
                  {language === 'pa'
                    ? '24 ਘੰਟੇ ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ ਉਪਲਬਧ ਹਨ'
                    : '24 Hours Emergency Services Available'}
                </p>
              </div>
            </div>

            {/* Center: Big Red Phone Number */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-red-100 text-[#EF3340] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 fill-current" />
              </div>
              <a
                href={`tel:${HOSPITAL_INFO.phoneTel}`}
                className="text-2xl sm:text-3xl font-black text-[#EF3340] hover:text-[#d3222e] tracking-tight transition-colors"
              >
                90565-79319
              </a>
            </div>

            {/* Right: Call Now CTA */}
            <div className="w-full sm:w-auto flex justify-center">
              <a
                href={`tel:${HOSPITAL_INFO.phoneTel}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#EF3340] hover:bg-[#d6232f] text-white text-xs sm:text-sm font-extrabold shadow-[0_3px_12px_rgba(239,51,64,0.28)] hover:shadow-[0_6px_18px_rgba(239,51,64,0.38)] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>{language === 'pa' ? 'ਹੁਣੇ ਕਾਲ ਕਰੋ' : 'Call Now'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. HOSPITAL LOCATION SECTION (MAP LEFT + QUICK INFO RIGHT)*/}
      {/* ========================================================= */}
      <section className="py-12 sm:py-16 bg-[#FAFBFD] border-t border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Our Location & Interactive Map */}
            <div className="lg:col-span-7">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold tracking-widest text-[#08284B] uppercase">
                    {language === 'pa' ? 'ਸਾਡਾ ਪਤਾ' : 'FIND US HERE'}
                  </span>
                  <ColorStripe />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08284B] tracking-tight">
                  {language === 'pa' ? 'ਸਾਡਾ ਪਤਾ' : 'Our Location'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {language === 'pa'
                    ? 'ਲੁਧਿਆਣਾ ਦੇ ਕੇਂਦਰ ਵਿੱਚ ਸੁਵਿਧਾਜਨਕ ਸਥਾਨ, ਤੁਹਾਡੀਆਂ ਸਿਹਤ ਸੰਭਾਲ ਲੋੜਾਂ ਲਈ ਆਸਾਨੀ ਨਾਲ ਪਹੁੰਚਯੋਗ।'
                    : 'Conveniently located in the heart of Ludhiana, easily accessible for your healthcare needs.'}
                </p>
              </div>

              {/* Map Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                {/* Live Google Maps Embed Area using user-provided embed */}
                <div className="relative h-[300px] sm:h-[360px] bg-slate-100 overflow-hidden">
                  <iframe
                    src={HOSPITAL_INFO.googleMapsEmbedUrl}
                    title="Metro Multispeciality Hospital Location Map"
                    width="100%"
                    height="100%"
                    className="w-full h-full border-0"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />

                  {/* View Larger Map Button (Top Right) */}
                  <button
                    type="button"
                    onClick={openGoogleMapsDirections}
                    className="absolute top-3.5 right-3.5 px-3.5 py-1.5 rounded-lg bg-white/95 hover:bg-white text-[#0875E1] border border-blue-200 text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer z-10"
                  >
                    <span>{language === 'pa' ? 'ਵੱਡਾ ਨਕਸ਼ਾ ਵੇਖੋ' : 'View Larger Map'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                {/* Bottom Address Bar with Get Directions Button */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0875E1] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-[13.5px] font-bold text-[#08284B] leading-snug">
                        {HOSPITAL_INFO.address}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {HOSPITAL_INFO.landmark}, Ludhiana — Easily Accessible from Major Areas
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={openGoogleMapsDirections}
                    className="inline-flex items-center justify-center gap-2 px-4.5 py-2.5 rounded-xl border border-[#0875E1] bg-white text-[#0875E1] hover:bg-blue-50 text-xs sm:text-[13px] font-bold transition-all shrink-0 cursor-pointer shadow-2xs"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{language === 'pa' ? 'ਰਸਤਾ ਪ੍ਰਾਪਤ ਕਰੋ' : 'Get Directions'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Quick Contact Information List */}
            <div className="lg:col-span-5">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold tracking-widest text-[#08284B] uppercase">
                    {language === 'pa' ? 'ਤੁਰੰਤ ਜਾਣਕਾਰੀ' : 'QUICK INFORMATION'}
                  </span>
                  <ColorStripe />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08284B] tracking-tight">
                  {language === 'pa' ? 'ਸੰਪਰਕ ਜਾਣਕਾਰੀ' : 'Contact Information'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {language === 'pa'
                    ? 'ਤੁਹਾਡੀ ਸਹੂਲਤ ਲਈ ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰਨ ਦੇ ਕਈ ਤਰੀਕੇ।'
                    : 'Multiple ways to reach us for your convenience.'}
                </p>
              </div>

              {/* Contact Card Container with 4 Rows */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 divide-y divide-slate-100 space-y-4">
                {/* Row 1: Phone */}
                <div className="pt-1 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#EBF5FF] text-[#0875E1] flex items-center justify-center shrink-0 shadow-2xs">
                    <Phone className="w-5 h-5 text-[#0875E1]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">
                      {language === 'pa' ? 'ਫੋਨ ਨੰਬਰ' : 'Phone Number'}
                    </span>
                    <a
                      href={`tel:${HOSPITAL_INFO.phoneTel}`}
                      className="text-sm sm:text-[15.5px] font-bold text-[#08284B] hover:text-[#0875E1] transition-colors"
                    >
                      +91 90565-79319
                    </a>
                    <span className="text-xs text-slate-400 block">24/7 Emergency Services</span>
                  </div>
                </div>

                {/* Row 2: Email */}
                <div className="pt-4 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#FEE2E2] text-[#EF4444] flex items-center justify-center shrink-0 shadow-2xs">
                    <Mail className="w-5 h-5 text-[#EF4444]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">
                      {language === 'pa' ? 'ਈਮੇਲ ਪਤਾ' : 'Email Address'}
                    </span>
                    <a
                      href="mailto:info@metrohospital.com"
                      className="text-sm sm:text-[15px] font-bold text-[#08284B] hover:text-[#0875E1] transition-colors"
                    >
                      info@metrohospital.com
                    </a>
                    <span className="text-xs text-slate-400 block">
                      {language === 'pa' ? 'ਆਮ ਪੁੱਛਗਿੱਛ ਲਈ' : 'For general enquiries'}
                    </span>
                  </div>
                </div>

                {/* Row 3: Address */}
                <div className="pt-4 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0 shadow-2xs">
                    <MapPin className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">
                      {language === 'pa' ? 'ਹਸਪਤਾਲ ਦਾ ਪਤਾ' : 'Hospital Address'}
                    </span>
                    <p className="text-xs sm:text-[13px] font-bold text-[#08284B] leading-snug">
                      {HOSPITAL_INFO.address}
                    </p>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      {HOSPITAL_INFO.landmark}
                    </span>
                  </div>
                </div>

                {/* Row 4: Working Hours */}
                <div className="pt-4 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#F3E8FF] text-[#8B5CF6] flex items-center justify-center shrink-0 shadow-2xs">
                    <Clock className="w-5 h-5 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">
                      {language === 'pa' ? 'ਕੰਮ ਦੇ ਘੰਟੇ' : 'Working Hours'}
                    </span>
                    <p className="text-xs sm:text-[13px] font-bold text-[#08284B] leading-tight">
                      Mon - Sat: 9:00 AM - 8:00 PM
                    </p>
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-tight mt-0.5">
                      Sunday: 9:00 AM - 2:00 PM
                    </p>
                    <span className="text-xs text-[#EF4444] font-bold block mt-1">
                      Emergency: 24/7 Available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. SERVICE AND PATIENT SUPPORT HIGHLIGHTS (4-ITEM STRIP)  */}
      {/* ========================================================= */}
      <section className="py-7 sm:py-8 bg-[#EEF6FD] border-y border-blue-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Highlight 1: Easy Accessibility */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#0875E1] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Car className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-[14px] font-extrabold text-[#08284B]">
                  {language === 'pa' ? 'ਆਸਾਨ ਪਹੁੰਚ' : 'Easy Accessibility'}
                </h4>
                <p className="text-xs text-slate-600 leading-snug mt-0.5">
                  {language === 'pa'
                    ? 'ਸੜਕ ਅਤੇ ਜਨਤਕ ਆਵਾਜਾਈ ਦੁਆਰਾ ਚੰਗੀ ਤਰ੍ਹਾਂ ਜੁੜਿਆ ਹੋਇਆ'
                    : 'Well connected by road and public transport'}
                </p>
              </div>
            </div>

            {/* Highlight 2: Patient Support */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#0875E1] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-[14px] font-extrabold text-[#08284B]">
                  {language === 'pa' ? 'ਮਰੀਜ਼ ਸਹਾਇਤਾ' : 'Patient Support'}
                </h4>
                <p className="text-xs text-slate-600 leading-snug mt-0.5">
                  {language === 'pa' ? 'ਮਿਲਣਸਾਰ ਅਤੇ ਮਦਦਗਾਰ ਸਟਾਫ' : 'Friendly and helpful staff'}
                </p>
              </div>
            </div>

            {/* Highlight 3: Clean Environment */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#0875E1] text-white flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-[14px] font-extrabold text-[#08284B]">
                  {language === 'pa' ? 'ਸਾਫ਼ ਵਾਤਾਵਰਨ' : 'Clean Environment'}
                </h4>
                <p className="text-xs text-slate-600 leading-snug mt-0.5">
                  {language === 'pa' ? 'ਸੁਰੱਖਿਅਤ ਅਤੇ ਸਵੱਛ ਇਮਾਰਤ' : 'Safe and hygienic premises'}
                </p>
              </div>
            </div>

            {/* Highlight 4: Quick Response */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#0875E1] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-[14px] font-extrabold text-[#08284B]">
                  {language === 'pa' ? 'ਤੁਰੰਤ ਜਵਾਬ' : 'Quick Response'}
                </h4>
                <p className="text-xs text-slate-600 leading-snug mt-0.5">
                  {language === 'pa'
                    ? 'ਅਸੀਂ ਤੁਹਾਡੇ ਸਵਾਲਾਂ ਦਾ ਜਲਦੀ ਜਵਾਬ ਦਿੰਦੇ ਹਾਂ'
                    : 'We respond to your queries as soon as possible'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Authentic Reception Photo */}
      {isPhotoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsPhotoModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#08284B] px-4 sm:px-6 py-3.5 text-white flex items-center justify-between border-b border-blue-900/40">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold tracking-tight">
                    {language === 'pa'
                      ? 'ਮੈਟਰੋ ਮਲਟੀਸਪੈਸ਼ਲਿਟੀ ਹਸਪਤਾਲ — ਅਧਿਕਾਰਤ ਰਿਸੈਪਸ਼ਨ ਡੈਸਕ'
                      : 'Metro Multispeciality Hospital — Official Reception Desk'}
                  </h3>
                  <p className="text-[11px] text-blue-200">
                    Pahwa Rd, near Neela Jhanda Gurudwara, Ludhiana, Punjab
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close photo preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image View */}
            <div className="bg-black/90 p-2 sm:p-4 flex items-center justify-center max-h-[72vh] overflow-hidden">
              <img
                src={
                  receptionView === 'sign'
                    ? '/assets/aistudio/WhatsApp_Image_2026-10-14_at_12.27.29_PM_c04f1764.jpeg'
                    : '/images/contact/reception_lounge_photo.jpg'
                }
                alt="Metro Multispeciality Hospital Official Reception Desk and Signboard"
                className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Modal Footer */}
            <div className="bg-[#08284B] px-4 sm:px-6 py-3 border-t border-blue-900/40 flex flex-wrap items-center justify-between gap-3 text-xs text-blue-100">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-emerald-300 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <Award className="w-3.5 h-3.5" />
                  NABH Accredited & Certified
                </span>
                <span className="text-slate-300">24 Hours Open Desk</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsPhotoModalOpen(false);
                  onOpenBooking();
                }}
                className="px-4 py-1.5 rounded-lg bg-[#0875E1] hover:bg-[#0766c6] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
              >
                {language === 'pa' ? 'ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ' : 'Book Appointment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
