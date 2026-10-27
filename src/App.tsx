/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { DoctorsSection } from './components/DoctorsSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { EmergencyBanner } from './components/EmergencyBanner';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { DoctorDetailModal } from './components/DoctorDetailModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { AboutModal } from './components/AboutModal';
import { AboutPage } from './pages/AboutPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { Doctor, ServiceItem, FacilityItem } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'doctors' | 'services' | 'contact' | 'facilities'>('home');
  const [activeSection, setActiveSection] = useState('home');
  const [language, setLanguage] = useState<'en' | 'pa'>('en');

  // Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<{
    doctorName?: string;
    departmentName?: string;
    date?: string;
    time?: string;
  }>({});

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#about') {
        setCurrentPage('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#doctors') {
        setCurrentPage('doctors');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#services') {
        setCurrentPage('services');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#facilities') {
        setCurrentPage('facilities');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#contact') {
        setCurrentPage('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
        if (hash && hash !== '#home') {
          setTimeout(() => {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Track active section on home page via IntersectionObserver
  useEffect(() => {
    if (currentPage !== 'home') return;

    const sectionIds = ['home', 'services', 'about', 'doctors', 'facilities', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { threshold: 0.3 }
        );
        obs.observe(el);
        observers.push(obs);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [currentPage]);

  const handleOpenBooking = (
    doctorName?: string,
    departmentName?: string,
    date?: string,
    time?: string
  ) => {
    if (!doctorName && !departmentName && currentPage === 'home') {
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
        return;
      }
    }
    setBookingPrefill({ doctorName, departmentName, date, time });
    setIsBookingOpen(true);
  };

  const handleNavigate = (page: 'home' | 'about' | 'doctors' | 'services' | 'contact' | 'facilities', sectionId?: string) => {
    if (page === 'about') {
      setCurrentPage('about');
      window.location.hash = '#about';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'doctors') {
      setCurrentPage('doctors');
      window.location.hash = '#doctors';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'services') {
      setCurrentPage('services');
      window.location.hash = '#services';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'facilities') {
      setCurrentPage('facilities');
      window.location.hash = '#facilities';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'contact') {
      setCurrentPage('contact');
      window.location.hash = '#contact';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      if (sectionId && sectionId !== 'home') {
        window.location.hash = `#${sectionId}`;
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        window.location.hash = '#home';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleNavClick = (href: string) => {
    if (href === '#about') {
      handleNavigate('about');
      return;
    }
    if (href === '#doctors') {
      handleNavigate('doctors');
      return;
    }
    if (href === '#services') {
      handleNavigate('services');
      return;
    }
    if (href === '#facilities') {
      handleNavigate('facilities');
      return;
    }
    if (href === '#contact') {
      handleNavigate('contact');
      return;
    }

    if (currentPage !== 'home') {
      const sectionId = href.replace('#', '');
      handleNavigate('home', sectionId);
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#52647A] flex flex-col selection:bg-blue-100 selection:text-[#0875E1]">
      {/* 1. Shared Header */}
      <Header
        onOpenBooking={handleOpenBooking}
        activeSection={activeSection}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        language={language}
        onToggleLanguage={setLanguage}
      />

      <main className="flex-1">
        {currentPage === 'about' ? (
          /* Render Dedicated About Us Page */
          <AboutPage
            onOpenBooking={handleOpenBooking}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateFacilities={() => handleNavigate('facilities')}
            language={language}
          />
        ) : currentPage === 'doctors' ? (
          /* Render Dedicated Doctors Page */
          <DoctorsPage
            onOpenBooking={handleOpenBooking}
            onSelectDoctor={setSelectedDoctor}
            onNavigateHome={() => handleNavigate('home')}
            language={language}
          />
        ) : currentPage === 'services' ? (
          /* Render Dedicated Services Page */
          <ServicesPage
            onOpenBooking={handleOpenBooking}
            onSelectService={setSelectedService}
            onNavigateHome={() => handleNavigate('home')}
            language={language}
          />
        ) : currentPage === 'facilities' ? (
          /* Render Dedicated Facilities Page */
          <FacilitiesPage
            onOpenBooking={handleOpenBooking}
            onNavigateHome={() => handleNavigate('home')}
            language={language}
          />
        ) : currentPage === 'contact' ? (
          /* Render Dedicated Contact Us Page */
          <ContactPage
            onOpenBooking={handleOpenBooking}
            onNavigateHome={() => handleNavigate('home')}
            language={language}
          />
        ) : (
          /* Render Homepage */
          <>
            {/* 2. Hero Section with Permanently Visible Appointment Booking Form */}
            <HeroSection
              onOpenBooking={handleOpenBooking}
              language={language}
            />

            {/* 3. Comprehensive Healthcare Services */}
            <ServicesSection
              onSelectService={setSelectedService}
              onOpenBooking={handleOpenBooking}
            />

            {/* 4. About Metro Multispeciality Hospital */}
            <AboutSection
              onLearnMore={() => handleNavigate('about')}
              language={language}
            />

            {/* 5. Meet Our Experienced Doctors */}
            <DoctorsSection
              onSelectDoctor={setSelectedDoctor}
              onOpenBooking={handleOpenBooking}
              onNavigateToDoctors={() => handleNavigate('doctors')}
              language={language}
            />

            {/* 6. Modern Facilities for Better Care */}
            <FacilitiesSection
              onSelectFacility={(facility) => {
                handleOpenBooking(undefined, facility.title);
              }}
              language={language}
            />

            {/* 7. Emergency Assistance Callout Banner */}
            <EmergencyBanner language={language} />

            {/* 8. Visit Metro Multispeciality Hospital (Location & Map) */}
            <LocationSection language={language} />
          </>
        )}
      </main>

      {/* 9. Shared Hospital Footer */}
      <Footer onNavClick={handleNavClick} language={language} />

      {/* Interactive Modals */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialDoctorName={bookingPrefill.doctorName}
        initialDepartmentName={bookingPrefill.departmentName}
        initialDate={bookingPrefill.date}
        initialTime={bookingPrefill.time}
      />

      <DoctorDetailModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        onBookWithDoctor={(doctorName, departmentName) =>
          handleOpenBooking(doctorName, departmentName)
        }
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookForService={(departmentName) => handleOpenBooking(undefined, departmentName)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onBookAppointment={() => handleOpenBooking()}
      />
    </div>
  );
}
