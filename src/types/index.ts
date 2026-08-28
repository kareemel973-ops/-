export type UserType = 'farmer' | 'trader' | 'agri_engineer';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  province: string;
  userType: UserType;
  isPremium: boolean;
  avatarUrl?: string;
  fcmToken?: string;
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  sizeHectares: number;
  irrigationType: 'drip' | 'sprinkler' | 'flood' | 'hydroponic';
  cropTypes: string[];
}

export interface Crop {
  id: string;
  farmId: string;
  name: string;
  category: string;
  plantingDate: string;
  expectedHarvestDate: string;
  areaSize: string;
  count: number;
  status: 'planted' | 'growing' | 'flowering' | 'harvesting' | 'archived';
  growthStage: string;
  growthProgress: number; // 0-100
  notes: string;
  images: string[];
}

export interface Expense {
  id: string;
  title: string;
  category: 'fertilizer' | 'pesticide' | 'labor' | 'fuel' | 'transport' | 'other';
  amount: number;
  date: string;
  notes?: string;
  farmName?: string;
}

export interface Revenue {
  id: string;
  cropName: string;
  buyerName: string;
  quantity: string;
  unitPrice: number;
  totalAmount: number;
  date: string;
  notes?: string;
}

export interface Land {
  id: string;
  name: string;
  area: string;
  soilType: string;
  waterSource: string;
  currentCrop: string;
  status: 'cultivated' | 'fallow' | 'preparing';
  pH?: number;
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  phone: string;
  salary: number;
  status: 'active' | 'on_leave';
  assignedFarm: string;
}

export interface IrrigationSchedule {
  id: string;
  cropName: string;
  durationMinutes: number;
  frequency: string; // e.g. "يومياً", "كل يومين"
  timeOfDay: string; // e.g. "06:00 صباحاً"
  waterVolumeLiters: number;
  active: boolean;
}

export interface FertilizationProgram {
  id: string;
  cropName: string;
  fertilizerName: string;
  dosage: string;
  repeatDays: number;
  nextDate: string;
  notes: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
  imageUri?: string;
  diagnosisResult?: {
    diseaseName: string;
    diseaseNameAr: string;
    confidence: number;
    severity: 'low' | 'medium' | 'high';
    treatment: string[];
    prevention: string[];
  };
}

export interface MarketItem {
  id: string;
  title: string;
  category: 'crops' | 'fertilizers' | 'seeds' | 'equipment' | 'services';
  price: number;
  unit: string;
  sellerName: string;
  sellerPhone: string;
  sellerType: UserType;
  location: string;
  description: string;
  image: string;
  type: 'sell' | 'buy'; // عرض للبيع أم طلب شراء
  date: string;
  verifiedSeller?: boolean;
  promoted?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  title: string;
  price: number;
  period: 'شهر' | 'سنة';
  features: string[];
  recommended?: boolean;
}

export interface Consultation {
  id: string;
  expertName: string;
  expertTitle: string;
  rating: number;
  pricePerSession: number;
  specialty: string;
  available: boolean;
  avatar: string;
}

export interface BannerAd {
  id: string;
  title: string;
  companyName: string;
  imageUrl: string;
  linkUrl: string;
}
