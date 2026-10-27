import React from 'react';
import { MapPin, Phone, Clock, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface FooterProps {
  onNavClick: (href: string) => void;
  language: 'en' | 'pa';
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, language }) => {
  return (
    <footer className="bg-[#07192F] text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Hospital Logo & Statement (col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavClick('#home');
              }}
              className="inline-block"
            >
              <img
                src="/images/logo_white.png"
                alt="Metro Multispeciality Hospital - We Cure With Care"
                className="h-[46px] w-auto object-contain"
              />
            </a>

            <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed max-w-sm">
              {language === 'pa'
                ? 'ਹਮਦਰਦੀ, ਆਧੁਨਿਕ ਸਹੂਲਤਾਂ, ਅਤੇ ਮਰੀਜ਼-ਪਹਿਲ ਪਹੁੰਚ ਨਾਲ ਗੁਣਵੱਤਾ ਵਾਲੀ ਸਿਹਤ ਸੰਭਾਲ ਪ੍ਰਦਾਨ ਕਰਨ ਲਈ ਵਚਨਬੱਧ।'
                : 'Committed to providing quality healthcare with compassion, modern facilities, and a patient-first approach.'}
            </p>

            {/* Social Icons matching screenshot */}
            <div className="flex items-center gap-3 pt-1 text-slate-400">
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#linkedin"
                onClick={(e) => e.preventDefault()}
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                onClick={(e) => e.preventDefault()}
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white mb-4 tracking-wide">
              {language === 'pa' ? 'ਮੁੱਖ ਲਿੰਕ' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('#home');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('#about');
                  }}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('#services');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#doctors"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('#doctors');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Doctors
                </a>
              </li>
              <li>
                <a
                  href="#facilities"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('#facilities');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Facilities
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('#contact');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services (col-span-4) */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-bold text-white mb-4 tracking-wide">
              {language === 'pa' ? 'ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ' : 'Our Services'}
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-[13px] text-slate-400">
              {/* Sub-col 1 */}
              <div className="space-y-2">
                <p className="hover:text-white transition-colors cursor-pointer">General Medicine</p>
                <p className="hover:text-white transition-colors cursor-pointer">General & Laparoscopic Surgeries</p>
                <p className="hover:text-white transition-colors cursor-pointer">Obstetrics & Gynecology</p>
                <p className="hover:text-white transition-colors cursor-pointer">Orthopedics</p>
                <p className="hover:text-white transition-colors cursor-pointer">Pediatrics</p>
                <p className="hover:text-white transition-colors cursor-pointer">Anesthesia</p>
              </div>

              {/* Sub-col 2 */}
              <div className="space-y-2">
                <p className="hover:text-white transition-colors cursor-pointer">Plastic Surgery (On Call)</p>
                <p className="hover:text-white transition-colors cursor-pointer">Psychiatry (On Call)</p>
                <p className="hover:text-white transition-colors cursor-pointer">X-Ray</p>
                <p className="hover:text-white transition-colors cursor-pointer">Ultrasound</p>
                <p className="hover:text-white transition-colors cursor-pointer">Laboratory</p>
                <p className="hover:text-white transition-colors cursor-pointer">Emergency Services</p>
              </div>
            </div>
          </div>

          {/* Column 4: Contact Us (col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white mb-4 tracking-wide">
              {language === 'pa' ? 'ਸੰਪਰਕ ਕਰੋ' : 'Contact Us'}
            </h4>
            
            <div className="space-y-3 text-xs sm:text-[13px] text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0875E1] shrink-0 mt-0.5" />
                <span>{HOSPITAL_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0875E1] shrink-0" />
                <a
                  href={`tel:${HOSPITAL_INFO.phoneTel}`}
                  className="hover:text-white transition-colors font-medium"
                >
                  {HOSPITAL_INFO.phoneFormatted}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#0875E1] shrink-0" />
                <span>{HOSPITAL_INFO.operatingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© 2024 Metro Multispeciality Hospital. All Rights Reserved.</p>
          <p>Designed with care for a healthier community.</p>
        </div>

      </div>
    </footer>
  );
};
