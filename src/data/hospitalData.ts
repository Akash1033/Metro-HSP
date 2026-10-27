import { Doctor, ServiceItem, FacilityItem } from '../types';

export const HOSPITAL_INFO = {
  name: 'Metro Multispeciality Hospital',
  tagline: 'We Cure With Care',
  punjabiName: 'ਮੈਟਰੋ ਮਲਟੀਸਪੈਸ਼ਲਿਟੀ ਹਸਪਤਾਲ',
  phone: '090565 79319',
  phoneFormatted: '090565 79319',
  phoneTel: '+919056579319',
  address: 'Pahwa Rd, near Neela Jhanda Gurudwara, New Shivaji Nagar, New Hargobind Nagar, Ludhiana, Punjab 141008',
  landmark: 'Near Neela Jhanda Gurudwara',
  operatingHours: 'Open 24 hours',
  aboutText:
    'Metro Multispeciality Hospital is dedicated to providing quality healthcare with modern infrastructure and a patient-first approach. We offer comprehensive medical services under one roof, supported by experienced doctors and caring staff.',
  emergencyTag: 'Need Immediate Assistance?',
  emergencySub: 'Open 24 Hours · Emergency Services Available',
  googleMapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3097.8513933604454!2d75.8734936!3d30.907992699999987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a837dfed186d1%3A0x1792c7ef22b32be7!2sMetro%20Multispeciality%20Hospital!5e1!3m2!1sen!2sin!4v1793034724972!5m2!1sen!2sin',
};

export const DEPARTMENTS = [
  'General Medicine',
  'General & Laparoscopic Surgeries',
  'Obstetrics & Gynecology',
  'Orthopedics',
  'Pediatrics',
  'Sonology & Imaging',
  'Anesthesia',
  'Plastic Surgery (On Call)',
  'Psychiatry (On Call)',
  'Emergency & Trauma Care'
];

export const TIME_SLOTS = [
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 01:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
  '05:00 PM - 06:00 PM',
  '06:00 PM - 07:00 PM'
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-gagandeep-singh',
    name: 'Dr. Gagandeep Singh',
    specialty: 'General & Laparoscopic Surgeon',
    department: 'General & Laparoscopic Surgeries',
    qualification: 'MBBS, MS (Surgery)',
    pmcNumber: 'PMC : 38836',
    image: '/images/doctor_gagandeep.jpg',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    timing: '10:00 AM - 02:00 PM & 05:00 PM - 07:00 PM',
    experience: '14+ Years Experience in Advanced Laparoscopy & Minimal Invasive Surgery'
  },
  {
    id: 'dr-sukrant-yadav',
    name: 'Dr. Sukrant Yadav',
    specialty: 'Orthopedic Surgeon',
    department: 'Orthopedics',
    qualification: 'MBBS, MS (Ortho)',
    pmcNumber: 'PMC : 39558',
    image: '/images/doctor_2.jpg',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    timing: '09:30 AM - 01:30 PM & 04:30 PM - 06:30 PM',
    experience: '12+ Years Experience in Joint Replacement, Arthroscopy & Complex Trauma'
  },
  {
    id: 'dr-vikas-loomba',
    name: 'Dr. Vikas Loomba',
    specialty: 'Consultant Physician',
    department: 'General Medicine',
    qualification: 'MBBS, MD (Medicine)',
    pmcNumber: 'PMC : 35247',
    image: '/images/doctor_vikas.jpg',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    timing: '10:00 AM - 02:00 PM & 05:00 PM - 07:30 PM',
    experience: '15+ Years in Critical Care, Diabetes, Hypertension & Internal Medicine'
  },
  {
    id: 'dr-amandeep-kaur',
    name: 'Dr. Amandeep Kaur',
    specialty: 'Gynecologist & Obstetrician',
    department: 'Obstetrics & Gynecology',
    qualification: 'MBBS, MD (OBS & GYNAE)',
    pmcNumber: 'PMC : 39810',
    image: '/images/doctor_amandeep.jpg',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    timing: '10:00 AM - 02:00 PM & 04:00 PM - 06:00 PM',
    experience: '11+ Years in High-Risk Pregnancy, Laparoscopic Gynae Surgeries & Infertility'
  },
  {
    id: 'dr-gaurav-sethee',
    name: 'Dr. Gaurav Sethee',
    specialty: 'Pediatrician & Neonatologist',
    department: 'Pediatrics',
    qualification: 'MBBS, MD (Pediatrics)',
    pmcNumber: 'PMC : 40826',
    image: '/images/doctor_5.jpg',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    timing: '10:00 AM - 01:00 PM & 05:00 PM - 07:00 PM',
    experience: '10+ Years in Neonatal Intensive Care, Child Growth & Vaccinations'
  },
  {
    id: 'dr-priyanka-yadav',
    name: 'Dr. Priyanka Yadav',
    specialty: 'Sonologist',
    department: 'Radiology / Ultrasound',
    qualification: 'MBBS, Sonologist (EX DMC)',
    pmcNumber: 'PMC : 50017',
    image: '/images/doctor_6.jpg',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    timing: '09:00 AM - 03:00 PM',
    experience: 'Expert in Color Doppler, 3D/4D Obstetric Scans & Abdominal Sonography'
  }
];

export const DOCTORS_PAGE_DEPARTMENTS = [
  'All Doctors',
  'General Medicine',
  'General & Laparoscopic Surgeries',
  'Obstetrics & Gynecology',
  'Orthopedics',
  'Pediatrics',
  'Anesthesia',
  'Plastic Surgery (On Call)',
  'Psychiatry (On Call)',
  'Radiology (X-Ray)',
  'Ultrasound',
  'Laboratory'
];

export const DOCTORS_FAQS = [
  {
    id: 'faq-1',
    question: 'How can I book an appointment with a doctor?',
    answer: 'You can easily book an appointment online using the "Book Appointment" button on our website, or by calling our hospital helpline at 090565 79319. Walk-in appointments are also welcome at the main reception desk.'
  },
  {
    id: 'faq-2',
    question: 'Can I choose a specific doctor?',
    answer: 'Yes, you can choose any preferred consultant while scheduling an appointment through our online booking interface, over the phone, or directly at the hospital reception.'
  },
  {
    id: 'faq-3',
    question: 'Do I need a referral to consult a specialist?',
    answer: 'No referral is required. You can directly consult any of our specialist or super-specialist consultants during their daily OPD hours.'
  },
  {
    id: 'faq-4',
    question: 'What should I bring for my first consultation?',
    answer: 'Please bring your previous medical records, ongoing prescription medications, diagnostic test summaries, imaging reports (if any), and a government-issued photo ID for patient registration.'
  },
  {
    id: 'faq-5',
    question: 'Are all doctors available every day?',
    answer: 'Most senior consultants are available Monday through Saturday during their designated OPD consultation hours. Emergency trauma care, critical care, and casualty medical officers are on duty 24/7.'
  },
  {
    id: 'faq-6',
    question: 'Do you offer online consultation?',
    answer: 'Yes, tele-consultation is available for select specialties and routine follow-up reviews. Please call our reception helpline at 090565 79319 to schedule a video or audio consultation.'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'general-medicine',
    title: 'General Medicine',
    description: 'Comprehensive diagnosis, management, and treatment of chronic illnesses, diabetes, infections, and lifestyle diseases.',
    iconName: 'Stethoscope',
    themeColor: '#0875E1',
    bgTint: '#EEF6FF',
    borderTint: '#DBEAFE',
    departmentKey: 'General Medicine',
    features: ['Outpatient consultation', 'Chronic disease management', 'Preventive health checkups', 'Fever & infection care']
  },
  {
    id: 'laparoscopic-surgeries',
    title: 'General & Laparoscopic Surgeries',
    description: 'Advanced minimally invasive surgical procedures ensuring quicker recovery, smaller incisions, and minimal pain.',
    iconName: 'Activity',
    themeColor: '#0D9488',
    bgTint: '#E6FFFA',
    borderTint: '#CCFBF1',
    departmentKey: 'General & Laparoscopic Surgeries',
    features: ['Gallbladder stones (Cholecystectomy)', 'Hernia repair', 'Appendectomy', 'Minimally invasive GI surgery']
  },
  {
    id: 'obstetrics-gynecology',
    title: 'Obstetrics & Gynecology',
    description: 'Holistic care for women at all stages of life, from maternity and high-risk pregnancy to gynecological wellness.',
    iconName: 'HeartHandshake',
    themeColor: '#EF4444',
    bgTint: '#FEE2E2',
    borderTint: '#FECACA',
    departmentKey: 'Obstetrics & Gynecology',
    features: ['Antenatal & postnatal care', 'Normal & Cesarean delivery', 'Laparoscopic hysterectomy', 'Infertility workup']
  },
  {
    id: 'orthopedics',
    title: 'Orthopedics',
    description: 'Specialized bone, joint, and spine care including trauma management, fracture fixation, and arthritis treatment.',
    iconName: 'Bone',
    themeColor: '#0284C7',
    bgTint: '#E0F2FE',
    borderTint: '#BAE6FD',
    departmentKey: 'Orthopedics',
    features: ['Joint pain & arthritis care', 'Fracture & trauma surgery', 'Arthroscopy procedures', 'Spine & back care']
  },
  {
    id: 'pediatrics',
    title: 'Pediatrics',
    description: 'Dedicated healthcare for newborns, infants, children, and adolescents with compassionate medical attention.',
    iconName: 'Smile',
    themeColor: '#F59E0B',
    bgTint: '#FEF3C7',
    borderTint: '#FDE68A',
    departmentKey: 'Pediatrics',
    features: ['Complete immunization', 'Growth & developmental tracking', 'Pediatric emergency care', 'Child nutrition advice']
  },
  {
    id: 'anesthesia',
    title: 'Anesthesia',
    description: 'Safe and state-of-the-art anesthetic management for elective and emergency surgical procedures.',
    iconName: 'Syringe',
    themeColor: '#2563EB',
    bgTint: '#EFF6FF',
    borderTint: '#DBEAFE',
    departmentKey: 'Anesthesia',
    features: ['General & regional anesthesia', 'Postoperative pain relief', 'Pre-anesthetic evaluation', 'Critical monitoring']
  },
  {
    id: 'plastic-surgery',
    title: 'Plastic Surgery (On Call)',
    description: 'Reconstructive and cosmetic surgical care on call for trauma reconstruction, burns, and aesthetic consultations.',
    iconName: 'UserCheck',
    themeColor: '#F43F5E',
    bgTint: '#FFE4E6',
    borderTint: '#FECDD3',
    departmentKey: 'Plastic Surgery (On Call)',
    features: ['Trauma wound reconstruction', 'Burn management', 'Scar revision', 'Cosmetic consultation']
  },
  {
    id: 'psychiatry',
    title: 'Psychiatry (On Call)',
    description: 'Confidential and compassionate mental health support, psychiatric assessments, and counseling services.',
    iconName: 'Brain',
    themeColor: '#3B82F6',
    bgTint: '#EFF6FF',
    borderTint: '#DBEAFE',
    departmentKey: 'Psychiatry (On Call)',
    features: ['Stress & anxiety management', 'Depression treatment', 'Sleep disorders', 'De-addiction counseling']
  },
  {
    id: 'x-ray',
    title: 'X-Ray',
    description: 'Digital high-resolution radiography with immediate reporting for accurate diagnostic evaluation.',
    iconName: 'ScanLine',
    themeColor: '#6366F1',
    bgTint: '#EEF2FF',
    borderTint: '#E0E7FF',
    departmentKey: 'Emergency & Trauma Care',
    features: ['Chest & abdomen X-ray', 'Bone & spine imaging', 'Low-dose digital sensors', 'Immediate reporting']
  },
  {
    id: 'ultrasound',
    title: 'Ultrasound',
    description: 'High-precision diagnostic sonography and Doppler scans conducted by experienced sonologists.',
    iconName: 'Monitor',
    themeColor: '#10B981',
    bgTint: '#ECFDF5',
    borderTint: '#A7F3D0',
    departmentKey: 'Sonology & Imaging',
    features: ['Whole abdomen ultrasound', 'Color Doppler scans', 'Obstetric anomaly scans', 'Pelvic imaging']
  },
  {
    id: 'laboratory',
    title: 'Laboratory',
    description: 'Fully automated diagnostic lab operating 24/7 with quality-controlled biochemistry, hematology, and pathology testing.',
    iconName: 'FlaskConical',
    themeColor: '#8B5CF6',
    bgTint: '#F5F3FF',
    borderTint: '#DDD6FE',
    departmentKey: 'General Medicine',
    features: ['Complete blood count (CBC)', 'Biochemistry & lipid panel', 'Liver & kidney function tests', 'Hormone assays']
  }
];

export const FACILITIES: FacilityItem[] = [
  {
    id: 'emergency-24h',
    title: '24-Hour Emergency Services',
    iconName: 'Ambulance',
    themeColor: '#EF4444',
    bgTint: '#FEE2E2',
    description: 'Round-the-clock emergency care for critical situations with trained staff and essential facilities.',
    image: '/images/facilities/facility_emergency.jpg',
    detailedDescription: 'Our 24-Hour Emergency Department is equipped to handle all acute medical, surgical, and trauma crises with immediate resuscitation facilities, dedicated casualty medical officers, emergency nursing staff, and on-call specialist surgeons.',
    keyFeatures: [
      'Round-the-clock triage & rapid resuscitation',
      'Dedicated casualty medical officer on duty 24/7',
      'Advanced trauma resuscitation bay & multi-parameter cardiac monitors',
      'Immediate access to digital X-ray, in-house lab, and emergency OT'
    ],
    hours: '24 Hours / 7 Days a Week'
  },
  {
    id: 'trauma-care',
    title: 'Trauma Care',
    iconName: 'Bed',
    themeColor: '#0284C7',
    bgTint: '#E0F2FE',
    description: 'Advanced trauma management for accident and critical cases.',
    image: '/images/facilities/facility_trauma.jpg',
    detailedDescription: 'Specialized trauma resuscitation bay equipped for motor accident injuries, acute fractures, industrial trauma, and critical surgical emergencies. Supported by on-call orthopedic and general surgeons.',
    keyFeatures: [
      'Immediate stabilization for poly-trauma and accident victims',
      'Equipped with ventilator support, defibrillators, and monitors',
      'Direct protocol coordination with surgical operation theatres',
      '24/7 orthopedic trauma fixation & casualty support'
    ],
    hours: '24 Hours / 7 Days a Week'
  },
  {
    id: 'ecg',
    title: 'ECG',
    iconName: 'HeartPulse',
    themeColor: '#10B981',
    bgTint: '#ECFDF5',
    description: 'Accurate ECG services for heart health assessment.',
    image: '/images/facilities/facility_ecg.jpg',
    detailedDescription: 'High-precision digital 12-lead electrocardiography (ECG) providing rapid assessment of cardiac rhythms, detection of myocardial infarction, ischemic changes, arrhythmias, and routine pre-operative screening.',
    keyFeatures: [
      'Digital 12-lead electrocardiogram with high waveform fidelity',
      'Instant computerized diagnosis with physician validation',
      'Critical alert protocols for acute coronary syndrome',
      'Routine pre-operative and wellness cardiac screening'
    ],
    hours: '24/7 in Emergency, 9:00 AM – 8:00 PM for OPD'
  },
  {
    id: 'clinical-lab',
    title: 'Clinical Laboratory',
    iconName: 'FlaskConical',
    themeColor: '#8B5CF6',
    bgTint: '#F3E8FF',
    description: 'Accurate and reliable diagnostic tests with advanced laboratory support.',
    image: '/images/facilities/facility_lab.jpg',
    detailedDescription: 'Fully automated diagnostic pathology and clinical biochemistry laboratory. Utilizing modern analyzers for rapid turnaround times, enabling doctors to make prompt, well-informed clinical decisions.',
    keyFeatures: [
      'Automated hematology (Complete Blood Count, differentials)',
      'Clinical biochemistry, lipid profiles, liver & renal function tests',
      'Infectious disease serology, dengue, typhoid, and fever panels',
      'Strict daily multi-point internal quality controls'
    ],
    hours: '24 Hours / 7 Days a Week'
  },
  {
    id: 'x-ray-facility',
    title: 'X-Ray',
    iconName: 'ScanLine',
    themeColor: '#0284C7',
    bgTint: '#E0F2FE',
    description: 'Digital X-ray for quick and clear imaging with accurate results.',
    image: '/images/facilities/facility_xray.jpg',
    detailedDescription: 'State-of-the-art high-frequency digital radiography equipment that produces razor-sharp diagnostic images of the chest, musculoskeletal system, spine, and abdomen with minimized patient radiation exposure.',
    keyFeatures: [
      'High-resolution digital flat-panel detector radiography',
      'Significantly lower radiation dose compared to conventional films',
      'Instant digital preview for trauma & fracture assessments',
      'Comprehensive bone, chest, abdominal, and spine views'
    ],
    hours: '24 Hours Emergency & 9:00 AM – 8:00 PM Routine'
  },
  {
    id: 'ultrasound-facility',
    title: 'Ultrasound',
    iconName: 'Monitor',
    themeColor: '#F43F5E',
    bgTint: '#FFE4E6',
    description: 'Advanced ultrasound imaging services for accurate diagnosis.',
    image: '/images/facilities/facility_ultrasound.jpg',
    detailedDescription: 'Advanced ultrasound and color Doppler imaging suite with dedicated transducers for abdominal, obstetric, gynecological, musculoskeletal, and vascular examinations performed by experienced radiologists.',
    keyFeatures: [
      'High-resolution sonography with multi-frequency probes',
      'Color Doppler studies for arterial and venous blood flow',
      'Obstetric scans for antenatal fetal growth & anomaly checks',
      'Abdominal, renal, thyroid, and soft tissue ultrasound'
    ],
    hours: '10:00 AM – 6:00 PM (Monday to Saturday)'
  }
];

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export const HOSPITAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-reception',
    title: 'Reception Area',
    category: 'Welcome & Registration',
    image: '/images/facilities/gallery_reception.jpg',
    description: 'Modern, well-lit reception desk with courteous front-office staff for seamless patient registration and admissions.'
  },
  {
    id: 'gal-ward',
    title: 'Patient Ward',
    category: 'Inpatient Care',
    image: '/images/facilities/gallery_ward.jpg',
    description: 'Hygienic and air-conditioned patient ward featuring multi-position hospital beds, privacy partitions, and continuous vital monitoring.'
  },
  {
    id: 'gal-ot',
    title: 'Operation Theatre',
    category: 'Surgical Suites',
    image: '/images/facilities/gallery_ot.jpg',
    description: 'State-of-the-art modular operation theatre equipped with sterile HEPA filtration, advanced surgical lighting, and laparoscopic towers.'
  },
  {
    id: 'gal-diagnostic',
    title: 'Diagnostic Facilities',
    category: 'Imaging & Diagnostics',
    image: '/images/facilities/gallery_diagnostic.jpg',
    description: 'Dedicated diagnostic imaging bay featuring modern digital scanning equipment with instant digital reporting.'
  }
];

export interface ServicePageCard {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  iconName: string;
  badge?: string;
  circleBg: string;
  iconColor: string;
  serviceId: string;
  departmentKey: string;
}

export const SERVICES_PAGE_CARDS: ServicePageCard[] = [
  {
    id: 'spc-1',
    title: 'General Medicine',
    description: 'Complete healthcare for all age groups.',
    iconName: 'Stethoscope',
    circleBg: '#EBF5FF',
    iconColor: '#0875E1',
    serviceId: 'general-medicine',
    departmentKey: 'General Medicine',
  },
  {
    id: 'spc-2',
    title: 'General & Laparoscopic Surgeries',
    description: 'Advanced and minimally invasive surgical care.',
    iconName: 'Activity',
    circleBg: '#E6F8F0',
    iconColor: '#10B981',
    serviceId: 'laparoscopic-surgeries',
    departmentKey: 'General & Laparoscopic Surgeries',
  },
  {
    id: 'spc-3',
    title: 'Obstetrics & Gynecology',
    description: "Women's health and maternity care.",
    iconName: 'HeartHandshake',
    circleBg: '#FEE8E8',
    iconColor: '#EF4444',
    serviceId: 'obstetrics-gynecology',
    departmentKey: 'Obstetrics & Gynecology',
  },
  {
    id: 'spc-4',
    title: 'Orthopedics',
    description: 'Bone, joint and sports injury care.',
    iconName: 'Bone',
    circleBg: '#E0F2FE',
    iconColor: '#0284C7',
    serviceId: 'orthopedics',
    departmentKey: 'Orthopedics',
  },
  {
    id: 'spc-5',
    title: 'Pediatrics',
    description: 'Specialized care for children.',
    iconName: 'Smile',
    circleBg: '#FEF3C7',
    iconColor: '#F59E0B',
    serviceId: 'pediatrics',
    departmentKey: 'Pediatrics',
  },
  {
    id: 'spc-6',
    title: 'Anesthesia',
    description: 'Safe and expert anesthesia services.',
    iconName: 'Syringe',
    circleBg: '#EDE9FE',
    iconColor: '#6366F1',
    serviceId: 'anesthesia',
    departmentKey: 'Anesthesia',
  },
  {
    id: 'spc-7',
    title: 'Plastic Surgery',
    subtitle: '(On Call)',
    description: 'Reconstructive and aesthetic care.',
    iconName: 'Sparkles',
    circleBg: '#FFE4E6',
    iconColor: '#F43F5E',
    serviceId: 'plastic-surgery',
    departmentKey: 'Plastic Surgery (On Call)',
  },
  {
    id: 'spc-8',
    title: 'Psychiatry',
    subtitle: '(On Call)',
    description: 'Mental health and counseling.',
    iconName: 'Brain',
    circleBg: '#E6FFFA',
    iconColor: '#0D9488',
    serviceId: 'psychiatry',
    departmentKey: 'Psychiatry (On Call)',
  },
  {
    id: 'spc-9',
    title: 'X-Ray',
    description: 'Digital X-ray services for accurate diagnosis.',
    iconName: 'ScanLine',
    circleBg: '#EBF5FF',
    iconColor: '#0875E1',
    serviceId: 'x-ray',
    departmentKey: 'Emergency & Trauma Care',
  },
  {
    id: 'spc-10',
    title: 'Ultrasound',
    description: 'Advanced ultrasound imaging.',
    iconName: 'Monitor',
    circleBg: '#E6F8F0',
    iconColor: '#10B981',
    serviceId: 'ultrasound',
    departmentKey: 'Sonology & Imaging',
  },
  {
    id: 'spc-11',
    title: 'Laboratory',
    description: 'Accurate and reliable diagnostic tests.',
    iconName: 'FlaskConical',
    circleBg: '#F3E8FF',
    iconColor: '#8B5CF6',
    serviceId: 'laboratory',
    departmentKey: 'General Medicine',
  },
];

export const SERVICES_PAGE_FAQS = [
  {
    id: 's-faq-1',
    question: 'Do I need an appointment for OPD?',
    answer:
      'While walk-in patients are always welcomed during OPD hours, we strongly recommend booking an appointment in advance. Prior appointment ensures minimal waiting times, preferred consultant availability, and prompt clinical consultation.',
  },
  {
    id: 's-faq-2',
    question: 'Which medical services are available at Metro Hospital?',
    answer:
      'Metro Multispeciality Hospital provides comprehensive clinical and diagnostic services including General Medicine, General & Laparoscopic Surgeries, Obstetrics & Gynecology, Orthopedics, Pediatrics, Anesthesia, Plastic Surgery (On Call), Psychiatry (On Call), Digital X-Ray, Color Doppler Ultrasound, and 24/7 Clinical Laboratory testing.',
  },
  {
    id: 's-faq-3',
    question: 'Are emergency services available 24/7?',
    answer:
      'Yes, our Emergency and Trauma Care Centre operates round-the-clock 24/7 with immediate resuscitation, on-site Casualty Medical Officers (CMO), on-call surgeons, emergency blood testing, digital imaging, and rapid ambulance support. Call 090565 79319 for immediate help.',
  },
  {
    id: 's-faq-4',
    question: 'Can I consult more than one department?',
    answer:
      'Absolutely. Metro Multispeciality Hospital operates as an integrated multi-speciality healthcare facility where our doctors collaborate closely. If your condition requires cross-speciality evaluation (such as Medicine, Orthopedics, or Surgery), your consultations and diagnostic evaluations are seamlessly coordinated under one roof.',
  },
  {
    id: 's-faq-5',
    question: 'Do you have cashless insurance facility?',
    answer:
      'Yes, we provide cashless hospitalization and claim assistance in association with major TPAs and health insurance providers. Our dedicated insurance helpdesk assists you with documentation, pre-authorization, and claims processing.',
  },
  {
    id: 's-faq-6',
    question: 'How can I book an appointment?',
    answer:
      'Booking is quick and straightforward: click the "Book an Appointment" button anywhere on our website to choose your preferred department, doctor, date, and time slot. Alternatively, you can call our reception desk directly at 090565 79319 for immediate phone confirmation.',
  },
];

export const COMMON_CONDITIONS = [
  {
    id: 'cond-1',
    name: 'Fever & Infections',
    iconName: 'Thermometer',
    bgColor: '#EBF5FF',
    iconColor: '#0875E1',
  },
  {
    id: 'cond-2',
    name: 'Diabetes',
    iconName: 'Droplet',
    bgColor: '#FEE2E2',
    iconColor: '#EF4444',
  },
  {
    id: 'cond-3',
    name: 'Hypertension',
    iconName: 'Heart',
    bgColor: '#FFE4E6',
    iconColor: '#F43F5E',
  },
  {
    id: 'cond-4',
    name: 'Respiratory Problems',
    iconName: 'Wind',
    bgColor: '#E0F2FE',
    iconColor: '#0284C7',
  },
  {
    id: 'cond-5',
    name: 'Digestive Disorders',
    iconName: 'Utensils',
    bgColor: '#FFEDD5',
    iconColor: '#EA580C',
  },
  {
    id: 'cond-6',
    name: 'General Health Checkups',
    iconName: 'ShieldCheck',
    bgColor: '#ECFDF5',
    iconColor: '#10B981',
  },
];
