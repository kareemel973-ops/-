import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useApp } from '../context/AppContext';

export const SettingsProfileScreen: React.FC = () => {
  const { user, logout, setActiveTab, farms, togglePremium } = useApp();

  const handleLogout = () => {
    Alert.alert(
      'تسجيل الخروج',
      'هل أنت متأكد من الخروج من حسابك؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'تسجيل الخروج', style: 'destructive', onPress: logout },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* User Header Profile */}
      <View style={styles.profileHeaderCard}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarTextLarge}>{user?.name?.charAt(0) || 'م'}</Text>
        </View>

        <Text style={styles.userName}>{user?.name || 'مستخدم مزرعتي'}</Text>

        <Text style={styles.userEmail}>{user?.email || 'user@mazraati.app'}</Text>

        <View style={styles.badgeRow}>
          <View style={styles.chipBadge}>
            <Text style={styles.chipBadgeText}>📍 {user?.province || 'الرياض'}</Text>
          </View>
          <View style={styles.chipBadge}>
            <Text style={styles.chipBadgeText}>
              👤 {user?.userType === 'farmer' ? 'مزارع' : user?.userType === 'trader' ? 'تاجر' : 'مهندس زراعي'}
            </Text>
          </View>
        </View>
      </View>

      {/* Registered Farms List */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>المزارع المسجلة ({farms.length})</Text>

          <TouchableOpacity onPress={() => setActiveTab('lands')}>
            <Text style={styles.linkText}>إدارة الأراضي</Text>
          </TouchableOpacity>
        </View>

        {farms.map(f => (
          <View key={f.id} style={styles.farmItem}>
            <Ionicons name="leaf" size={20} color="#2F855A" style={{ marginLeft: 8 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.farmName}>{f.name}</Text>
              <Text style={styles.farmLoc}>{f.location} • {f.sizeHectares} هكتار</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Subscription Card Status */}
      <TouchableOpacity style={styles.subStatusCard} onPress={() => setActiveTab('subscription')}>
        <View style={styles.subStatusHeader}>
          <Ionicons name="star" size={22} color="#D69E2E" />
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.subStatusTitle}>حالة الاشتراك والترقية</Text>
            <Text style={styles.subStatusSub}>
              {user?.isPremium ? 'اشتراك ممتاز VIP فعال' : 'النسخة المجانية (مع إعلانات)'}
            </Text>
          </View>
          <Ionicons name="chevron-back" size={20} color="#718096" />
        </View>
      </TouchableOpacity>

      {/* Settings Options Group */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>إعدادات التطبيق</Text>

        <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('اللغة', 'التطبيق يعمل باللغة العربية')}>
          <Ionicons name="language-outline" size={20} color="#4A5568" />
          <Text style={styles.settingText}>اللغة والتفضيلات (العربية)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => togglePremium()}>
          <Ionicons name="gift-outline" size={20} color="#4A5568" />
          <Text style={styles.settingText}>تبديل وضع العضوية (للتجربة)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('الدعم الفني', 'تواصل مع الدعم الفني عبر واتساب 0501234567')}>
          <Ionicons name="help-circle-outline" size={20} color="#4A5568" />
          <Text style={styles.settingText}>الدعم الفني والمساعدة</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('عن منصة مزرعتي', 'منصة الذكاء الزراعي المتكاملة الإصدار 1.0.0')}>
          <Ionicons name="information-circle-outline" size={20} color="#4A5568" />
          <Text style={styles.settingText}>حول تطبيق مزرعتي</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Action Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#E53E3E" />
        <Text style={styles.logoutBtnText}>تسجيل الخروج</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  content: { padding: 16, paddingTop: 50, paddingBottom: 80 },
  profileHeaderCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  avatarLarge: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#2F855A', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  avatarTextLarge: { color: '#FFF', fontSize: 32, fontWeight: 'bold' },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#2D3748' },
  userEmail: { fontSize: 12, color: '#718096', marginTop: 2 },
  badgeRow: { flexDirection: 'row-reverse', marginTop: 12 },
  chipBadge: { backgroundColor: '#EDF2F7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginHorizontal: 4 },
  chipBadgeText: { fontSize: 11, color: '#4A5568', fontWeight: 'bold' },
  sectionCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  sectionHeaderRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#2D3748', textAlign: 'right' },
  linkText: { fontSize: 12, color: '#3182CE', fontWeight: 'bold' },
  farmItem: { flexDirection: 'row-reverse', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#EDF2F7' },
  farmName: { fontSize: 13, fontWeight: 'bold', color: '#2D3748', textAlign: 'right' },
  farmLoc: { fontSize: 11, color: '#718096', textAlign: 'right' },
  subStatusCard: { backgroundColor: '#FEFCBF', borderRadius: 14, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: '#D69E2E' },
  subStatusHeader: { flexDirection: 'row-reverse', alignItems: 'center' },
  subStatusTitle: { fontSize: 13, fontWeight: 'bold', color: '#744210', textAlign: 'right' },
  subStatusSub: { fontSize: 11, color: '#975A16', textAlign: 'right', marginTop: 2 },
  settingItem: { flexDirection: 'row-reverse', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#EDF2F7' },
  settingText: { fontSize: 13, color: '#2D3748', marginRight: 10, flex: 1, textAlign: 'right' },
  logoutBtn: { backgroundColor: '#FFF5F5', borderWidth: 1, borderColor: '#FEB2B2', height: 48, borderRadius: 12, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  logoutBtnText: { color: '#E53E3E', fontSize: 15, fontWeight: 'bold', marginRight: 6 },
});
