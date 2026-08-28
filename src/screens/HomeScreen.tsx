import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useApp } from '../context/AppContext';
import { AdBanner } from '../components/AdBanner';

export const HomeScreen: React.FC = () => {
  const { user, setActiveTab, crops, expenses, revenues } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  // Weather simulation based on user province
  const weatherData = {
    temp: '28°م',
    condition: 'مشمس ومناسب للري',
    humidity: '32%',
    wind: '12 كم/س',
    location: user?.province || 'الرياض',
  };

  // Main grid navigation sections with big icons
  const gridSections = [
    {
      id: 'crops',
      title: 'المحاصيل',
      subtitle: `${crops.length} محاصيل مسجلة`,
      icon: 'leaf-outline',
      bgColor: '#E6FFFA',
      iconColor: '#234E52',
      badge: `${crops.length}`,
    },
    {
      id: 'expenses',
      title: 'المصروفات',
      subtitle: 'تسجيل السماد والعمالة والوقود',
      icon: 'card-outline',
      bgColor: '#FFF5F5',
      iconColor: '#C53030',
    },
    {
      id: 'revenues',
      title: 'الإيرادات',
      subtitle: 'مبيعات المحاصيل والعملاء',
      icon: 'cash-outline',
      bgColor: '#F0FFF4',
      iconColor: '#276749',
    },
    {
      id: 'profits',
      title: 'الأرباح والتقارير',
      subtitle: 'صافي الربح ورسوم بيانية',
      icon: 'stats-chart-outline',
      bgColor: '#EBF8FF',
      iconColor: '#2B6CB0',
    },
    {
      id: 'irrigation',
      title: 'جدول الري الذكي',
      subtitle: 'مواعيد وكميات المياه',
      icon: 'water-outline',
      bgColor: '#EBF8FF',
      iconColor: '#3182CE',
    },
    {
      id: 'fertilizer',
      title: 'برنامج التسميد',
      subtitle: 'جرعات وتوقيت الأسمدة',
      icon: 'flask-outline',
      bgColor: '#FEFCBF',
      iconColor: '#744210',
    },
    {
      id: 'diagnosis',
      title: 'تشخيص الأمراض AI',
      subtitle: 'تصوير وتحديد الآفات فوريًا',
      icon: 'scan-outline',
      bgColor: '#FEEBC8',
      iconColor: '#9C4221',
      badge: 'ذكي',
    },
    {
      id: 'ai_assistant',
      title: 'المساعد الزراعي AI',
      subtitle: 'مستشار زراعي فورى 24/7',
      icon: 'chatbubbles-outline',
      bgColor: '#E9D8FD',
      iconColor: '#553C9A',
      badge: 'AI',
    },
    {
      id: 'market',
      title: 'السوق الزراعي',
      subtitle: 'شراء وبيع المعدات والمحاصيل',
      icon: 'cart-outline',
      bgColor: '#EDF2F7',
      iconColor: '#2D3748',
    },
    {
      id: 'lands',
      title: 'إدارة الأراضي والمزارع',
      subtitle: 'متابعة التربة والآبار',
      icon: 'map-outline',
      bgColor: '#E6FFFA',
      iconColor: '#2C7A7B',
    },
    {
      id: 'workers',
      title: 'إدارة العمال',
      subtitle: 'سجلات العمال والرواتب',
      icon: 'people-outline',
      bgColor: '#FEFCBF',
      iconColor: '#975A16',
    },
    {
      id: 'settings',
      title: 'الإعدادات والملف',
      subtitle: 'بيانات الحساب والاشتراك',
      icon: 'settings-outline',
      bgColor: '#EDF2F7',
      iconColor: '#4A5568',
    },
  ];

  const filteredSections = gridSections.filter(s =>
    s.title.includes(searchQuery) || s.subtitle.includes(searchQuery)
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* User Greeting & Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={() => setActiveTab('profile')}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'م'}</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.welcomeText}>أهلاً بك 👋</Text>
            <Text style={styles.userNameText}>{user?.name || 'مزارع مزرعتي'}</Text>
            {user?.isPremium && (
              <View style={styles.premiumBadge}>
                <Ionicons name="star" size={10} color="#D69E2E" />
                <Text style={styles.premiumText}>عضوية ممتازة VIP</Text>
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity onPress={() => setActiveTab('subscription')} style={styles.upgradeHeaderBtn}>
          <Ionicons name="sparkles" size={16} color="#FFF" />
          <Text style={styles.upgradeHeaderText}>ترقية الحساب</Text>
        </TouchableOpacity>
      </View>

      {/* Weather Card Widget */}
      <View style={styles.weatherCard}>
        <View style={styles.weatherHeader}>
          <View style={styles.weatherLocation}>
            <Ionicons name="location-sharp" size={16} color="#2F855A" />
            <Text style={styles.weatherLocationText}>{weatherData.location}</Text>
          </View>
          <Text style={styles.weatherTitle}>حالة الطقس الزراعي اليوم</Text>
        </View>

        <View style={styles.weatherMain}>
          <View style={styles.weatherTempBox}>
            <Ionicons name="sunny-outline" size={36} color="#DD6B20" />
            <Text style={styles.weatherTemp}>{weatherData.temp}</Text>
          </View>
          <View style={styles.weatherDescBox}>
            <Text style={styles.weatherCond}>{weatherData.condition}</Text>
            <Text style={styles.weatherSubText}>رطوبة: {weatherData.humidity} • رياح: {weatherData.wind}</Text>
          </View>
        </View>

        <View style={styles.weatherAdviceBar}>
          <Ionicons name="bulb-outline" size={16} color="#D69E2E" />
          <Text style={styles.weatherAdviceText}>
            نصيحة اليوم: يفضل تشغيل الري بالتنقيط في الصباح الباكر لتقليل التبخر.
          </Text>
        </View>
      </View>

      {/* Important Alerts Section */}
      <View style={styles.alertsContainer}>
        <View style={styles.alertsHeader}>
          <Text style={styles.alertsTitle}>أهم التنبيهات والمهام اليومية</Text>
          <Ionicons name="notifications-outline" size={18} color="#C53030" />
        </View>

        <View style={styles.alertItemAlert}>
          <Ionicons name="warning-outline" size={20} color="#C53030" style={{ marginLeft: 8 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.alertItemTitle}>موعد رش مبيد وقائي للنخيل</Text>
            <Text style={styles.alertItemDesc}>يتبقى يومان على موعد الرش الوقائي الدوري لحماية الثمار.</Text>
          </View>
        </View>

        <View style={styles.alertItemInfo}>
          <Ionicons name="water-outline" size={20} color="#2B6CB0" style={{ marginLeft: 8 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.alertItemTitle}>برنامج ري طماطم الصالات</Text>
            <Text style={styles.alertItemDesc}>الموعد القادم: اليوم الساعة 05:00 مساءً (45 دقيقة).</Text>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <Ionicons name="search-outline" size={20} color="#718096" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="ابحث عن أقسام، أسمدة، ري، محاصيل..."
          placeholderTextColor="#A0AEC0"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* AdBanner for Free Users */}
      <AdBanner type="banner" />

      {/* Section Title */}
      <Text style={styles.sectionHeading}>الأقسام والخدمات الرئيسية</Text>

      {/* Main Grid Options */}
      <View style={styles.gridContainer}>
        {filteredSections.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[styles.gridCard, { backgroundColor: item.bgColor }]}
            onPress={() => setActiveTab(item.id)}
            activeOpacity={0.8}
          >
            {item.badge && (
              <View style={styles.cardBadge}>
                <Text style={styles.cardBadgeText}>{item.badge}</Text>
              </View>
            )}
            <View style={[styles.iconWrapper, { backgroundColor: '#FFF' }]}>
              <Ionicons name={item.icon as any} size={28} color={item.iconColor} />
            </View>
            <Text style={styles.gridCardTitle}>{item.title}</Text>
            <Text style={styles.gridCardSub} numberOfLines={2}>
              {item.subtitle}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Ad Banner Card */}
      <AdBanner type="card" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  content: {
    padding: 16,
    paddingTop: 50,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#2F855A',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  avatarText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 12,
    color: '#718096',
    textAlign: 'right',
  },
  userNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'right',
  },
  premiumBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#FEFCBF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
  },
  premiumText: {
    fontSize: 10,
    color: '#744210',
    fontWeight: 'bold',
    marginRight: 2,
  },
  upgradeHeaderBtn: {
    backgroundColor: '#2F855A',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  upgradeHeaderText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
    marginRight: 4,
  },
  weatherCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  weatherHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  weatherTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  weatherLocation: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  weatherLocationText: {
    fontSize: 12,
    color: '#2F855A',
    fontWeight: '600',
    marginRight: 2,
  },
  weatherMain: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  weatherTempBox: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  weatherTemp: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2D3748',
    marginRight: 8,
  },
  weatherDescBox: {
    alignItems: 'flex-end',
  },
  weatherCond: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#276749',
  },
  weatherSubText: {
    fontSize: 11,
    color: '#718096',
    marginTop: 2,
  },
  weatherAdviceBar: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#FEFCBF',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  weatherAdviceText: {
    fontSize: 11,
    color: '#744210',
    marginRight: 6,
    flex: 1,
    textAlign: 'right',
  },
  alertsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  alertsHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  alertsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  alertItemAlert: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    borderRightWidth: 4,
    borderRightColor: '#E53E3E',
  },
  alertItemInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#EBF8FF',
    padding: 10,
    borderRadius: 10,
    borderRightWidth: 4,
    borderRightColor: '#3182CE',
  },
  alertItemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'right',
  },
  alertItemDesc: {
    fontSize: 11,
    color: '#4A5568',
    textAlign: 'right',
    marginTop: 2,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: '#CBD5E0',
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    textAlign: 'right',
    fontSize: 13,
    color: '#2D3748',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'right',
    marginVertical: 12,
  },
  gridContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: '48%',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  cardBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#E53E3E',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  cardBadgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  gridCardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 2,
  },
  gridCardSub: {
    fontSize: 10,
    color: '#718096',
    textAlign: 'center',
  },
});
