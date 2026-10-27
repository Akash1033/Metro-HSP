import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronRight,
  ChevronDown,
  LayoutGrid,
  Stethoscope,
  Activity,
  HeartHandshake,
  Bone,
  Smile,
  Syringe,
  Award,
  Brain,
  ScanLine,
  Monitor,
  FlaskConical,
  CheckCircle2,
  ShieldCheck,
  User,
  Users,
  Heart,
  Plus,
  Minus,
  ArrowRight,
  Calendar,
  Layers,
} from 'lucide-react';
import { ColorStripe } from '../components/ColorStripe';
import { EmergencyBanner } from '../components/EmergencyBanner';
import {
  DOCTORS,
  DOCTORS_PAGE_DEPARTMENTS,
  DOCTORS_FAQS,
  HOSPITAL_INFO,
} from '../data/hospitalData';
import { Doctor } from '../types';

interface DoctorsPageProps {
  onOpenBooking: (doctorName?: string, departmentName?: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onNavigateHome: () => void;
  language: 'en' | 'pa';
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({
  onOpenBooking,
  onSelectDoctor,
  onNavigateHome,
  language,
}) => {
  // State for search & filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptDropdown, setSelectedDeptDropdown] = useState('All Departments');
  const [selectedDoctorDropdown, setSelectedDoctorDropdown] = useState('All Doctors');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('All Doctors');

  // Accordion state
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Filter doctors based on all active controls
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      // 1. Search Query (name, specialty, qualification, department)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = doc.name.toLowerCase().includes(query);
        const matchesSpecialty = doc.specialty.toLowerCase().includes(query);
        const matchesDept = doc.department.toLowerCase().includes(query);
        const matchesQual = doc.qualification.toLowerCase().includes(query);
        if (!matchesName && !matchesSpecialty && !matchesDept && !matchesQual) {
          return false;
        }
      }

      // 2. Department Dropdown
      if (selectedDeptDropdown !== 'All Departments') {
        if (!doc.department.toLowerCase().includes(selectedDeptDropdown.toLowerCase())) {
          return false;
        }
      }

      // 3. Doctor Dropdown
      if (selectedDoctorDropdown !== 'All Doctors') {
        if (doc.name !== selectedDoctorDropdown) {
          return false;
        }
      }

      // 4. Category Tab filter
      if (selectedCategoryTab !== 'All Doctors') {
        if (selectedCategoryTab === 'Radiology (X-Ray)' || selectedCategoryTab === 'Ultrasound') {
          if (!doc.department.includes('Radiology') && !doc.department.includes('Ultrasound')) {
            return false;
          }
        } else if (!doc.department.toLowerCase().includes(selectedCategoryTab.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedDeptDropdown, selectedDoctorDropdown, selectedCategoryTab]);

  // Helper for department badge icon on doctor cards
  const renderDeptIcon = (dept: string) => {
    const iconClass = 'w-3.5 h-3.5 text-[#0875E1] shrink-0';
    if (dept.includes('Surgery') || dept.includes('Laparoscopic')) {
      return <Activity className={iconClass} />;
    }
    if (dept.includes('Ortho')) {
      return <Bone className={iconClass} />;
    }
    if (dept.includes('Medicine')) {
      return <Stethoscope className={iconClass} />;
    }
    if (dept.includes('Gynec') || dept.includes('Obstetrics')) {
      return <HeartHandshake className={iconClass} />;
    }
    if (dept.includes('Pediatric')) {
      return <Smile className={iconClass} />;
    }
    if (dept.includes('Radiology') || dept.includes('Ultrasound')) {
      return <Monitor className={iconClass} />;
    }
    return <Stethoscope className={iconClass} />;
  };

  // Helper for category buttons icon
  const renderCategoryIcon = (dept: string, isActive: boolean) => {
    const iconClass = `w-4 h-4 shrink-0 ${isActive ? 'text-white' : ''}`;
    switch (dept) {
      case 'All Doctors':
        return <LayoutGrid className={iconClass} />;
      case 'General Medicine':
        return <Stethoscope className={`${iconClass} ${!isActive ? 'text-[#0875E1]' : ''}`} />;
      case 'General & Laparoscopic Surgeries':
        return <Activity className={`${iconClass} ${!isActive ? 'text-[#0D9488]' : ''}`} />;
      case 'Obstetrics & Gynecology':
        return <HeartHandshake className={`${iconClass} ${!isActive ? 'text-[#EF4444]' : ''}`} />;
      case 'Orthopedics':
        return <Bone className={`${iconClass} ${!isActive ? 'text-[#0284C7]' : ''}`} />;
      case 'Pediatrics':
        return <Smile className={`${iconClass} ${!isActive ? 'text-[#F59E0B]' : ''}`} />;
      case 'Anesthesia':
        return <Syringe className={`${iconClass} ${!isActive ? 'text-[#2563EB]' : ''}`} />;
      case 'Plastic Surgery (On Call)':
        return <Award className={`${iconClass} ${!isActive ? 'text-[#F43F5E]' : ''}`} />;
      case 'Psychiatry (On Call)':
        return <Brain className={`${iconClass} ${!isActive ? 'text-[#3B82F6]' : ''}`} />;
      case 'Radiology (X-Ray)':
        return <ScanLine className={`${iconClass} ${!isActive ? 'text-[#6366F1]' : ''}`} />;
      case 'Ultrasound':
        return <Monitor className={`${iconClass} ${!isActive ? 'text-[#10B981]' : ''}`} />;
      case 'Laboratory':
        return <FlaskConical className={`${iconClass} ${!isActive ? 'text-[#8B5CF6]' : ''}`} />;
      default:
        return <Stethoscope className={iconClass} />;
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDeptDropdown('All Departments');
    setSelectedDoctorDropdown('All Doctors');
    setSelectedCategoryTab('All Doctors');
  };

  const leftFaqs = DOCTORS_FAQS.slice(0, 3);
  const rightFaqs = DOCTORS_FAQS.slice(3, 6);

  return (
    <div className="bg-white">
      {/* 1. Breadcrumbs */}
      <div className="bg-[#F8FBFE] border-b border-slate-100/80">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <button
              onClick={onNavigateHome}
              className="text-[#0875E1] hover:underline transition-colors flex items-center"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#08284B] font-semibold">Doctors</span>
          </nav>
        </div>
      </div>

      {/* 2. Doctors Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EAF5FF] via-[#F4F9FE] to-[#E8F3FD] pt-8 pb-12 md:pt-10 md:pb-14">
        {/* Decorative faint medical crosses */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-[0.22]">
          <span className="absolute top-6 left-8 text-[#9AC5EC] text-4xl font-light">+</span>
          <span className="absolute top-28 left-1/3 text-[#9AC5EC] text-6xl font-light">+</span>
          <span className="absolute bottom-6 left-12 text-[#9AC5EC] text-4xl font-light">+</span>
        </div>

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading, Subtitle, 4 Badges */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#08284B] leading-[1.18] tracking-tight mb-3">
                Our Experienced <br />
                <span className="text-[#0875E1]">Doctors</span>
              </h1>

              <p className="text-sm sm:text-[15px] text-[#52647A] leading-relaxed max-w-[480px] mb-7">
                Meet our team of qualified and compassionate doctors who are committed to providing the best healthcare for you and your family.
              </p>

              {/* 4 Benefit Items in 1 Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-lg">
                {/* 1. Experienced Specialists */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#EAF5FF] flex items-center justify-center p-1 shadow-xs mb-1.5">
                    <div className="w-9 h-9 rounded-full bg-[#0875E1] text-white flex items-center justify-center shadow-xs">
                      <Users className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <span className="text-[11.5px] font-bold text-[#08284B] leading-tight">
                    Experienced <br /> Specialists
                  </span>
                </div>

                {/* 2. Personalized Care */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#ECFDF5] flex items-center justify-center p-1 shadow-xs mb-1.5">
                    <div className="w-9 h-9 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-xs">
                      <ShieldCheck className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <span className="text-[11.5px] font-bold text-[#08284B] leading-tight">
                    Personalized <br /> Care
                  </span>
                </div>

                {/* 3. Patient First Approach */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#FEF3C7] flex items-center justify-center p-1 shadow-xs mb-1.5">
                    <div className="w-9 h-9 rounded-full bg-[#F59E0B] text-white flex items-center justify-center shadow-xs">
                      <Heart className="w-4.5 h-4.5 fill-current" />
                    </div>
                  </div>
                  <span className="text-[11.5px] font-bold text-[#08284B] leading-tight">
                    Patient <br /> First Approach
                  </span>
                </div>

                {/* 4. Multi-Speciality Expertise */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#FEE2E2] flex items-center justify-center p-1 shadow-xs mb-1.5">
                    <div className="w-9 h-9 rounded-full bg-[#EF3340] text-white flex items-center justify-center shadow-xs">
                      <Plus className="w-5 h-5 stroke-[3]" />
                    </div>
                  </div>
                  <span className="text-[11.5px] font-bold text-[#08284B] leading-tight">
                    Multi-Speciality <br /> Expertise
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Image with Quote Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/80 bg-white">
                <img
                  src="/images/doctors_hero_team_clean.jpg"
                  alt="Metro Multispeciality Hospital Doctors Team"
                  className="w-full h-[280px] sm:h-[320px] md:h-[350px] object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Search and Dropdown Filter Bar */}
      <section className="py-6 bg-white border-b border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-3 sm:p-4 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Search input with Search Button */}
              <div className="md:col-span-6 flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search doctor by name, specialty or department..."
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#0875E1] focus:ring-1 focus:ring-[#0875E1]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  className="px-5 py-2.5 bg-[#0875E1] hover:bg-[#0766c6] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shrink-0 shadow-xs cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>
              </div>

              {/* Department Dropdown */}
              <div className="md:col-span-3 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Layers className="w-4 h-4" />
                </div>
                <select
                  value={selectedDeptDropdown}
                  onChange={(e) => setSelectedDeptDropdown(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 font-medium appearance-none focus:outline-none focus:border-[#0875E1] focus:ring-1 focus:ring-[#0875E1] cursor-pointer"
                >
                  <option value="All Departments">All Departments</option>
                  <option value="General Medicine">General Medicine</option>
                  <option value="General & Laparoscopic Surgeries">General & Laparoscopic Surgeries</option>
                  <option value="Obstetrics & Gynecology">Obstetrics & Gynecology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Radiology">Radiology / Ultrasound</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Doctor Dropdown */}
              <div className="md:col-span-3 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <select
                  value={selectedDoctorDropdown}
                  onChange={(e) => setSelectedDoctorDropdown(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 font-medium appearance-none focus:outline-none focus:border-[#0875E1] focus:ring-1 focus:ring-[#0875E1] cursor-pointer"
                >
                  <option value="All Doctors">All Doctors</option>
                  {DOCTORS.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. Browse by Department Category Pills/Grid */}
      <section className="py-8 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#08284B] tracking-tight mb-1.5">
              Browse by Department
            </h2>
            <ColorStripe width="w-20" />
          </div>

          {/* 12 Filter Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3">
            {DOCTORS_PAGE_DEPARTMENTS.map((dept) => {
              const isActive = selectedCategoryTab === dept;
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedCategoryTab(dept)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border text-left ${
                    isActive
                      ? 'bg-[#0875E1] text-white border-[#0875E1] shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {renderCategoryIcon(dept, isActive)}
                  <span className="truncate">{dept}</span>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Our Doctors Grid */}
      <section className="py-8 bg-[#FBFDFE] border-t border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with count */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#08284B] tracking-tight mb-1.5">
                Our Doctors
              </h2>
              <ColorStripe width="w-20" />
            </div>

            <span className="text-xs font-medium text-slate-500">
              Showing {filteredDoctors.length} of {DOCTORS.length} doctors
            </span>
          </div>

          {/* Doctors Grid: 3 columns x 2 rows on desktop */}
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(8,117,225,0.08)] transition-all flex flex-col justify-between group"
                >
                  {/* Top Split: Photo (Left) + Details (Right) */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Doctor Photo */}
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-[#F4F6F9] shrink-0 border border-slate-100">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-[#08284B] leading-tight mb-1 group-hover:text-[#0875E1] transition-colors">
                        {doc.name}
                      </h3>

                      <p className="text-xs font-bold text-[#0875E1] leading-tight mb-1.5">
                        {doc.specialty}
                      </p>

                      <p className="text-[11px] text-slate-500 leading-snug mb-1">
                        {doc.qualification}
                      </p>

                      <p className="text-[10.5px] font-mono text-slate-400 mb-2">
                        {doc.pmcNumber}
                      </p>

                      {/* Department Chip */}
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-blue-100/70 text-[10.5px] font-semibold text-slate-700">
                        {renderDeptIcon(doc.department)}
                        <span className="truncate">{doc.department}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Actions: Book Appointment & View Profile */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => onOpenBooking(doc.name, doc.department)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#0875E1] hover:bg-[#0766c6] text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-[0.98]"
                    >
                      <span>Book Appointment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectDoctor(doc)}
                      className="flex-1 py-2.5 px-3 rounded-lg border border-[#0875E1] hover:bg-[#EAF5FF] text-[#0875E1] text-xs font-bold transition-all cursor-pointer text-center active:scale-[0.98]"
                    >
                      View Profile
                    </button>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center max-w-md mx-auto my-6">
              <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#08284B] mb-1">No Doctors Found</h3>
              <p className="text-xs text-slate-500 mb-4">
                No specialists match your current search and filter criteria.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-[#0875E1] text-white text-xs font-bold rounded-lg hover:bg-[#0766c6] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 6. Why Choose Our Doctors? Section */}
      <section className="py-12 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#08284B] tracking-tight mb-1.5">
              Why Choose Our Doctors?
            </h2>
            <ColorStripe width="w-20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-5 flex items-start gap-3.5 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0875E1] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-[13px] font-bold text-[#08284B] leading-tight mb-1">
                  Qualified & Experienced
                </h3>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Well-trained specialists across multiple departments.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-5 flex items-start gap-3.5 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#10B981] flex items-center justify-center shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-[13px] font-bold text-[#08284B] leading-tight mb-1">
                  Patient-Centric Approach
                </h3>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Personalized care and clear communication.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-5 flex items-start gap-3.5 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#F59E0B] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-[13px] font-bold text-[#08284B] leading-tight mb-1">
                  Compassionate Care
                </h3>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Respectful and supportive environment for every patient.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-5 flex items-start gap-3.5 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-[#EF3340] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-[13px] font-bold text-[#08284B] leading-tight mb-1">
                  Collaborative Team
                </h3>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Doctors working together for better outcomes.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Emergency Assistance Banner */}
      <EmergencyBanner language={language} />

      {/* 8. Frequently Asked Questions (FAQ) */}
      <section className="py-12 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#08284B] tracking-tight mb-1.5">
                Frequently Asked Questions
              </h2>
              <ColorStripe width="w-20" />
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-[#EAF5FF] hover:bg-[#d8edff] text-[#0875E1] text-xs font-bold transition-colors cursor-pointer"
            >
              <span>View All FAQs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 2-Column Accordion */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-3">
              {leftFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full flex items-center justify-between gap-3 p-4 text-left bg-white hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-xs sm:text-[13px] font-bold text-[#08284B] leading-snug">
                        {faq.question}
                      </span>
                      <span className="text-[#0875E1] shrink-0 font-bold">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-[#FBFDFE]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              {rightFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full flex items-center justify-between gap-3 p-4 text-left bg-white hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-xs sm:text-[13px] font-bold text-[#08284B] leading-snug">
                        {faq.question}
                      </span>
                      <span className="text-[#0875E1] shrink-0 font-bold">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-[#FBFDFE]">
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
    </div>
  );
};
