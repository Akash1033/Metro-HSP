export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  qualification: string;
  pmcNumber: string;
  image: string;
  availableDays?: string[];
  timing?: string;
  experience?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  themeColor: string;
  bgTint: string;
  borderTint: string;
  departmentKey: string;
  features?: string[];
}

export interface FacilityItem {
  id: string;
  title: string;
  iconName: string;
  themeColor: string;
  bgTint: string;
  description?: string;
  image?: string;
  detailedDescription?: string;
  keyFeatures?: string[];
  hours?: string;
}

export interface BookingFormData {
  department: string;
  doctor: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  notes?: string;
}

export interface BookingConfirmationDetails extends BookingFormData {
  appointmentId: string;
  doctorName: string;
  departmentName: string;
  bookingTimestamp: string;
  status?: string;
}

export interface AppointmentRecord {
  id: string;
  fullName: string;
  phoneNumber: string;
  department: string;
  preferredDoctor: string;
  preferredDate: string;
  preferredTime: string;
  status: string;
  createdAt: string;
  notes?: string;
}
