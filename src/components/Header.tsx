import React, { useState } from 'react';
import { Calendar, Menu, X, Phone } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface HeaderProps {
  onOpenBooking: (doctorName?: string, departmentName?: string) => void;
  activeSection: string;
  currentPage?: 'home' | 'about' | 'doctors' | 'services' | 'contact' | 'facilities';
  onNavigate?: (page: 'home' | 'about' | 'doctors' | 'services' | 'contact' | 'facilities', sectionId?: string) => void;
  language: 'en' | 'pa';
  onToggleLanguage: (lang: 'en' | 'pa') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  activeSection,
  currentPage = 'home',
  onNavigate,
  language,
  onToggleLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', page: 'home' as const, href: '#home', id: 'home' },
    { label: 'About Us', page: 'about' as const, href: '#about', id: 'about' },
    { label: 'Services', page: 'services' as const, href: '#services', id: 'services' },
    { label: 'Doctors', page: 'doctors' as const, href: '#doctors', id: 'doctors' },
    { label: 'Facilities', page: 'facilities' as const, href: '#facilities', id: 'facilities' },
    { label: 'Contact', page: 'contact' as const, href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (item: (typeof navItems)[0]) => {
    setMobileMenuOpen(false);
    if (item.page === 'about') {
      if (onNavigate) {
        onNavigate('about');
      } else {
        window.location.hash = '#about';
      }
      return;
    }

    if (item.page === 'doctors') {
      if (onNavigate) {
        onNavigate('doctors');
      } else {
        window.location.hash = '#doctors';
      }
      return;
    }

    if (item.page === 'services') {
      if (onNavigate) {
        onNavigate('services');
      } else {
        window.location.hash = '#services';
      }
      return;
    }

    if (item.page === 'facilities') {
      if (onNavigate) {
        onNavigate('facilities');
      } else {
        window.location.hash = '#facilities';
      }
      return;
    }

    if (item.page === 'contact') {
      if (onNavigate) {
        onNavigate('contact');
      } else {
        window.location.hash = '#contact';
      }
      return;
    }

    if (currentPage !== 'home') {
      if (onNavigate) {
        onNavigate('home', item.id);
      } else {
        window.location.hash = item.href;
      }
      return;
    }

    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeaderBookingClick = () => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home') {
      if (onNavigate) {
        onNavigate('home');
      } else {
        window.location.hash = '#home';
      }
    }
    setTimeout(() => {
      const el =
        document.getElementById('hero-appointment-form') ||
        document.getElementById('hero-appointment-form-mobile');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const input = (document.getElementById('hero-appointment-form-fullName') ||
          document.getElementById('hero-appointment-form-mobile-fullName')) as HTMLInputElement | null;
        if (input) {
          input.focus();
        }
      } else {
        onOpenBooking();
      }
    }, 120);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] md:h-[80px]">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group shrink-0"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(navItems[0]);
            }}
          >
            <img
              src="/images/logo.png"
              alt="Metro Multispeciality Hospital - We Cure With Care"
              className="h-[46px] md:h-[52px] w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive =
                currentPage === 'about'
                  ? item.id === 'about'
                  : currentPage === 'doctors'
                  ? item.id === 'doctors'
                  : currentPage === 'services'
                  ? item.id === 'services'
                  : currentPage === 'facilities'
                  ? item.id === 'facilities'
                  : currentPage === 'contact'
                  ? item.id === 'contact'
                  : activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item);
                  }}
                  className={`relative py-2 text-[14.5px] font-medium transition-colors ${
                    isActive
                      ? 'text-[#0878E8] font-semibold'
                      : 'text-[#0B2B50] hover:text-[#0878E8]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0878E8] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action & Language Switcher */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium select-none">
              <button
                type="button"
                onClick={() => onToggleLanguage('pa')}
                className={`transition-colors ${
                  language === 'pa'
                    ? 'text-[#0B2B50] font-bold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                ਪੰਜਾਬੀ
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={() => onToggleLanguage('en')}
                className={`transition-colors ${
                  language === 'en'
                    ? 'text-[#0B2B50] font-bold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                English
              </button>
            </div>

            {/* Book Appointment CTA Button */}
            <button
              onClick={handleHeaderBookingClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0878E8] hover:bg-[#0766c6] text-white text-[13.5px] font-semibold transition-all shadow-[0_2px_8px_rgba(8,120,232,0.25)] hover:shadow-[0_4px_12px_rgba(8,120,232,0.35)] active:scale-[0.98] cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu & Emergency trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${HOSPITAL_INFO.phoneTel}`}
              className="p-2 rounded-full bg-red-50 text-[#EF3340] hover:bg-red-100 transition-colors"
              title="Call Emergency"
            >
              <Phone className="w-5 h-5" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0875E1] rounded-lg focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2 mb-4">
            {navItems.map((item) => {
              const isActive =
                currentPage === 'about'
                  ? item.id === 'about'
                  : currentPage === 'doctors'
                  ? item.id === 'doctors'
                  : currentPage === 'services'
                  ? item.id === 'services'
                  : currentPage === 'facilities'
                  ? item.id === 'facilities'
                  : currentPage === 'contact'
                  ? item.id === 'contact'
                  : activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item);
                  }}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#0875E1] font-semibold'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
            <div className="flex items-center justify-between px-2 text-xs text-slate-500 font-medium">
              <span>Language / ਭਾਸ਼ਾ:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggleLanguage('pa')}
                  className={`px-2 py-1 rounded ${
                    language === 'pa' ? 'bg-blue-100 text-[#0875E1] font-bold' : 'text-slate-500'
                  }`}
                >
                  ਪੰਜਾਬੀ
                </button>
                <button
                  type="button"
                  onClick={() => onToggleLanguage('en')}
                  className={`px-2 py-1 rounded ${
                    language === 'en' ? 'bg-blue-100 text-[#0875E1] font-bold' : 'text-slate-500'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            <button
              onClick={handleHeaderBookingClick}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#0878E8] hover:bg-[#0766c6] text-white text-sm font-semibold shadow-md active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
