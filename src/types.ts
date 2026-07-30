export interface HeroSlide {
  url: string;
  title: string;
  desc: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  duration: string;
  price: string;
  iconName: string; // Will map to Lucide icons
  category: 'Innen' | 'Außen' | 'Pakete' | 'Reparaturen';
}

export interface ReferenceProject {
  id: string;
  title: string;
  vehicle: string;
  beforeUrl: string;
  afterUrl: string;
  description: string;
  tags?: string[];
  instagramUrl?: string;
  beforeGallery: string[];
  afterGallery: string[];
}

export interface BookingState {
  name: string;
  email: string;
  phone: string;
  serviceId: string;
  carSize: 'Coupe/Sedan' | 'SUV/Combi' | 'Sport/Supercar';
  date: string;
  time: string;
  message?: string;
}
