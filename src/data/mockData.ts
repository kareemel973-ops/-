import React from 'react';
import { AppUser, Farm, Crop, Expense, Revenue, Land, Worker, Consultation, MarketItem, BannerAd, SubscriptionPlan } from './types';

export const INITIAL_USER: AppUser = {
  id: 'u_101',
  name: 'مهندس أحمد العتيبي',
  email: 'ahmed@mazraati.app',
  phone: '0501234567',
  province: 'الرياض',
  userType: 'farmer',
  isPremium: false,
  fcmToken: 'token_abc123',
};

export const INITIAL_FARMS: Farm[] = [
  {
    id: 'f_1',
    name: 'مزرعة الخير النخيل',
    location: 'الرياض - الخرج',
    sizeHectares: 12.5,
    irrigationType: 'drip',
    cropTypes: ['نخيل صقعي', 'طماطم محمية', 'نعناع'],
  },
  {
    id: 'f_2',
    name: 'حقل الزيتون الشمالي',
    location: 'الجوف - القريات',
    sizeHectares: 25.0,
    irrigationType: 'sprinkler',
    cropTypes: ['زيتون نبالي', 'قمح'],
  }
];

export const INITIAL_CROPS: Crop[] = [
  {
    id: 'c_1',
    farmId: 'f_1',
    name: 'نخيل صقعي',
    category: 'أشجار فواكه',
    plantingDate: '2023-03-15',
    expectedHarvestDate: '2025-08-20',
    areaSize: '5 هكتار',
    count: 350,
    status: 'harvesting',
    growthStage: 'مرحلة إكتمال نمو الثمار والنضج',
    growthProgress: 85,
    notes: 'تمت التغذية بالبوتاسيوم والأسمدة العضوية. الري بمعدل ساعتين يومياً.',
    images: ['https://images.unsplash.com/photo-1598170845058-12ef4a4575c1?auto=format&fit=crop&w=600&q=80'],
  },
  {
    id: 'c_2',
    farmId: 'f_1',
    name: 'طماطم صالة محمية',
    category: 'خضروات',
    plantingDate: '2024-01-10',
    expectedHarvestDate: '2024-05-30',
    areaSize: '1.5 هكتار',
    count: 12000,
    status: 'growing',
    growthStage: 'مرحلة التزهير وعقد الثمار',
    growthProgress: 60,
    notes: 'مراقبة الذبابة البيضاء بانتظام. رش وقائي بالفطريات.',
    images: ['https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80'],
  },
  {
    id: 'c_3',
    farmId: 'f_2',
    name: 'زيتون نبالي محسن',
    category: 'أشجار دائمة',
    plantingDate: '2022-11-01',
    expectedHarvestDate: '2025-10-15',
    areaSize: '15 هكتار',
    count: 800,
    status: 'growing',
    growthStage: 'مرحلة نمو الأغصان وتفتح الزهر',
    growthProgress: 45,
    notes: 'تقليم الربيع اكتمل. نسبة إزهار ممتازة هذا الموسم.',
    images: ['https://images.unsplash.com/photo-1541604193435-22287d32c2c2?auto=format&fit=crop&w=600&q=80'],
  }
];

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'e_1',
    title: 'أسمدة مرکبة NPK عالية البوتاسيوم',
    category: 'fertilizer',
    amount: 3200,
    date: '2025-02-10',
    notes: 'شراء 15 كيس NPK من المورد الروضة',
    farmName: 'مزرعة الخير النخيل',
  },
  {
    id: 'e_2',
    title: 'أجور عمال حصاد وتقليم',
    category: 'labor',
    amount: 1800,
    date: '2025-02-14',
    notes: 'أجر 4 عمال لمدة أسبوع',
    farmName: 'مزرعة الخير النخيل',
  },
  {
    id: 'e_3',
    title: 'وقود وسولار للمولدات والمعدات',
    category: 'fuel',
    amount: 950,
    date: '2025-02-18',
    notes: 'تعبئة الخزان الرئيسي لمضخات الري',
    farmName: 'حقل الزيتون الشمالي',
  },
  {
    id: 'e_4',
    title: 'مبيد فطري وقائي للبيوت المحمية',
    category: 'pesticide',
    amount: 650,
    date: '2025-02-20',
    notes: 'مبيد ريدوميل جولد 2 ليتر',
    farmName: 'مزرعة الخير النخيل',
  },
  {
    id: 'e_5',
    title: 'شحن ونقل محصول إلى سوق الجملة',
    category: 'transport',
    amount: 1100,
    date: '2025-02-22',
    notes: 'سيارة نقل دينا للرياض',
    farmName: 'مزرعة الخير النخيل',
  }
];

export const INITIAL_REVENUES: Revenue[] = [
  {
    id: 'r_1',
    cropName: 'نخيل صقعي ممتاز',
    buyerName: 'شركة الثمار الذهبية للتمور',
    quantity: '2500 كجم',
    unitPrice: 18,
    totalAmount: 45000,
    date: '2025-02-05',
    notes: 'تم التسليم بسوق العزيزية واستلام المبلغ كاش',
  },
  {
    id: 'r_2',
    cropName: 'طماطم صالات',
    buyerName: 'تاجر جملة - أبا الخيل',
    quantity: '180 صندوق',
    unitPrice: 45,
    totalAmount: 8100,
    date: '2025-02-12',
    notes: 'دفعة أولى من إنتاج الصالة رقم 2',
  },
  {
    id: 'r_3',
    cropName: 'زيتون عصر عصرة أولى',
    buyerName: 'معصرة البركة الشمالية',
    quantity: '800 ليتر',
    unitPrice: 35,
    totalAmount: 28000,
    date: '2025-02-19',
    notes: 'زيت زيتون بكر ممتاز درجة أولى',
  }
];

export const INITIAL_LANDS: Land[] = [
  {
    id: 'l_1',
    name: 'قطعة أرض 10 - القطاع الجنوبي',
    area: '4.5 هكتار',
    soilType: 'طينية رملية خفيفة',
    waterSource: 'بئر جوفي عمق 180م (ملوحة 800 PPM)',
    currentCrop: 'طماطم محمية',
    status: 'cultivated',
    pH: 7.2,
  },
  {
    id: 'l_2',
    name: 'قطعة أرض 12 - النخيل',
    area: '8.0 هكتار',
    soilType: 'رسوبية غنية',
    waterSource: 'مشروع الري المركز',
    currentCrop: 'نخيل صقعي',
    status: 'cultivated',
    pH: 7.5,
  },
  {
    id: 'l_3',
    name: 'قطعة أرض 05 - التجهيز',
    area: '3.0 هكتار',
    soilType: 'رملية',
    waterSource: 'بئر رقم 2',
    currentCrop: 'تجهيز لزراعة البطاطس',
    status: 'fallow',
    pH: 7.8,
  }
];

export const INITIAL_WORKERS: Worker[] = [
  {
    id: 'w_1',
    name: 'عبدالرحمن الإبراهيمي',
    role: 'مشرف ري وصيانة شبكات',
    phone: '0551122334',
    salary: 3500,
    status: 'active',
    assignedFarm: 'مزرعة الخير النخيل',
  },
  {
    id: 'w_2',
    name: 'كومار سيلفام',
    role: 'عامل تقليم وتسميد',
    phone: '0549876543',
    salary: 2200,
    status: 'active',
    assignedFarm: 'مزرعة الخير النخيل',
  },
  {
    id: 'w_3',
    name: 'طارق محمود',
    role: 'سائق تراكتور ومعدات',
    phone: '0563344556',
    salary: 2800,
    status: 'active',
    assignedFarm: 'حقل الزيتون الشمالي',
  }
];

export const INITIAL_MARKET_ITEMS: MarketItem[] = [
  {
    id: 'm_1',
    title: 'تمر صقعي فاخر ملكي - محلي',
    category: 'crops',
    price: 22,
    unit: 'كجم',
    sellerName: 'مزرعة الخير (أحمد العتيبي)',
    sellerPhone: '0501234567',
    sellerType: 'farmer',
    location: 'الرياض - الخرج',
    description: 'تمور صقعي درجة اولى جامبو خالية من الإصابات الحشرية، معبأة في كراتين 3 كجم.',
    image: 'https://images.unsplash.com/photo-1598170845058-12ef4a4575c1?auto=format&fit=crop&w=600&q=80',
    type: 'sell',
    date: '2025-02-22',
    verifiedSeller: true,
  },
  {
    id: 'm_2',
    title: 'سماد NPK متوازن 20-20-20 أسباني',
    category: 'fertilizers',
    price: 180,
    unit: 'كيس 25 كجم',
    sellerName: 'شركة النماء المستدام للحلول الزراعية',
    sellerPhone: '0599887766',
    sellerType: 'trader',
    location: 'القصيم - بريدة',
    description: 'سماد ذائب بالكامل في الماء ذو جودة عالية يحتوي على العناصر الكبرى والصغرى.',
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=600&q=80',
    type: 'sell',
    date: '2025-02-20',
    verifiedSeller: true,
    promoted: true,
  },
  {
    id: 'm_3',
    title: 'مطلوب كمية 10 طن بطاطس للبيع بالجملة',
    category: 'crops',
    price: 2.5,
    unit: 'كجم',
    sellerName: 'مؤسسة الغذاء الطازج للتوريد',
    sellerPhone: '0512349988',
    sellerType: 'trader',
    location: 'جدة - سوق الجملة',
    description: 'مطلوب بطاطس حقل طازجة حجم متوسط إلى كبير، التسليم في مخازن جدة.',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    type: 'buy',
    date: '2025-02-21',
    verifiedSeller: false,
  },
  {
    id: 'm_4',
    title: 'جرار زراعي جون دير موديل 2021 ممتازة',
    category: 'equipment',
    price: 85000,
    unit: 'جهاز',
    sellerName: 'معرض معدات الشمال',
    sellerPhone: '0533221100',
    sellerType: 'trader',
    location: 'حائل',
    description: 'جرار 75 حصان، صيانة دورية بالوكالة، عدد ساعات عمل 1200 ساعة فقط.',
    image: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=600&q=80',
    type: 'sell',
    date: '2025-02-18',
    verifiedSeller: true,
  },
  {
    id: 'm_5',
    title: 'بذور طماطم هجين مقاومة للفيروسات',
    category: 'seeds',
    price: 450,
    unit: 'علبة 5000 بذرة',
    sellerName: 'مؤسسة الأمل الزراعية',
    sellerPhone: '0541122334',
    sellerType: 'trader',
    location: 'الرياض',
    description: 'بذور طماطم عالية الإنتاجية وتحمل ممتازة للحرارة والأمراض الفيروسية.',
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80',
    type: 'sell',
    date: '2025-02-19',
    verifiedSeller: false,
  }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'sub_monthly',
    title: 'الاشتراك الشهري الاحترافي',
    price: 49,
    period: 'شهر',
    features: [
      'إزالة جميع الإعلانات بالكامل',
      'تشخيص أمراض النبات بالذكاء الاصطناعي بلا حدود',
      'برامج ري وتسميد ذكية ومخصصة لمزرعتك',
      'تقارير مالية وتحليلات أرباح تفصيلية (PDF/Excel)',
      'دعم فني واستشارات هندسية أولوية',
      'إدارة أراضٍ وعمال غير محدودة'
    ],
    recommended: false,
  },
  {
    id: 'sub_yearly',
    title: 'الاشتراك السنوي الشامل (توفير 30%)',
    price: 399,
    period: 'سنة',
    features: [
      'كل مميزات الاشتراك الشهري',
      'خصم 30% مقارنة بالدفع الشهري',
      'استشارة زراعية شهرية مجانية مع مهندس زراعي مختص',
      'أولية ظهور منتجاتك في السوق الزراعي مع شارة موثقة',
      'تنبيهات طقس مبكرة لحماية المحاصيل من الصقيع',
      'تصدير التقارير المالية للضرائب والمحاسبة'
    ],
    recommended: true,
  }
];

export const SAMPLE_CONSULTATIONS: Consultation[] = [
  {
    id: 'cons_1',
    expertName: 'د. خالد السالم',
    expertTitle: 'خبير أمراض وقاية النبات ومستشار زراعي',
    rating: 4.9,
    pricePerSession: 150,
    specialty: 'أمراض الخضروات والأشجار المثمرة',
    available: true,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'cons_2',
    expertName: 'م. سارة الحربي',
    expertTitle: 'استشارية أنظمة الري الحديث وتسميد الهيدروبونيك',
    rating: 4.8,
    pricePerSession: 120,
    specialty: 'شبكات الري بالتنقيط وتوازن التسميد',
    available: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  }
];
