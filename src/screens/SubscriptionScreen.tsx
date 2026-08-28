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
import { SUBSCRIPTION_PLANS } from '../data/mockData';

export const SubscriptionScreen: React.FC = () => {
  const { user, togglePremium } = useApp();

  const handleSubscribe = (planTitle: string) => {
    Alert.alert(
      'تأكيد الاشتراك',
      `هل ترغب بالاشتراك في (${planTitle})؟ سيتم تفعيل كل مميزات الحساب المميز فوراً.`,
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'تأكيد ودفع',
          onPress: () => {
            togglePremium();
            Alert.alert('تم التفعيل بنجاح! 🎉', 'أهلاً بك في العضوية الاحترافية لمزرعتي.');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.topTitle}>خطط الاشتراك والعضويات</Text>
      <Text style={styles.topSub}>ارتقِ بمزرعتك، تخلص من الإعلانات، واحصل على تقارير مالية واستشارات AI بلا حدود.</Text>

      {user?.isPremium && (
        <View style={styles.activePlanCard}>
          <Ionicons name="checkmark-circle" size={28} color="#38A169" />
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.activePlanTitle}>أنت مشترك حالياً في الحساب المميز VIP ✨</Text>
            <Text style={styles.activePlanSub}>تتمتع بجميع مميزات التطبيق بدون إعلانات وبتقارير متقدمة.</Text>
          </View>
        </View>
      )}

      {SUBSCRIPTION_PLANS.map(plan => (
        <View
          key={plan.id}
          style={[styles.planCard, plan.recommended && styles.planCardRecommended]}
        >
          {plan.recommended && (
            <View style={styles.recBadge}>
              <Text style={styles.recBadgeText}>الخيار الأكثر توفيراً ⭐</Text>
            </View>
          )}

          <Text style={styles.planTitle}>{plan.title}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.planPrice}>{plan.price} ريال</Text>
            <Text style={styles.planPeriod}> / {plan.period}</Text>
          </View>

          <View style={styles.featuresList}>
            {plan.features.map((feat, idx) => (
              <View key={idx} style={styles.featureItem}>
                <Ionicons name="checkmark" size={18} color="#38A169" style={{ marginLeft: 6 }} />
                <Text style={styles.featureText}>{feat}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.subBtn, plan.recommended && styles.subBtnRecommended]}
            onPress={() => handleSubscribe(plan.title)}
          >
            <Text style={styles.subBtnText}>
              {user?.isPremium ? 'تجديد الاشتراك' : 'اشترك الآن'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Corporate B2B Ads Link */}
      <View style={styles.b2bCard}>
        <Ionicons name="briefcase-outline" size={24} color="#2B6CB0" />
        <Text style={styles.b2bTitle}>خدمات الشركات والمؤسسات الزراعية</Text>

        <Text style={styles.b2bDesc}>
          هل ترغب بالإعلان عن منتجاتك الزراعية أو شراء تقارير واعدة؟ تواصل معنا للحلول المخصصة.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  content: { padding: 16, paddingTop: 50, paddingBottom: 80 },
  topTitle: { fontSize: 20, fontWeight: 'bold', color: '#2D3748', textAlign: 'right' },
  topSub: { fontSize: 13, color: '#718096', textAlign: 'right', marginTop: 4, marginBottom: 20, lineHeight: 20 },
  activePlanCard: { backgroundColor: '#F0FFF4', borderWidth: 1, borderColor: '#9AE6B4', borderRadius: 14, padding: 14, flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 16 },
  activePlanTitle: { fontSize: 14, fontWeight: 'bold', color: '#276749', textAlign: 'right' },
  activePlanSub: { fontSize: 11, color: '#2F855A', textAlign: 'right', marginTop: 2 },
  planCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0', position: 'relative' },
  planCardRecommended: { borderColor: '#2F855A', borderWidth: 2, backgroundColor: '#FAFCFE' },
  recBadge: { position: 'absolute', top: -12, right: 16, backgroundColor: '#2F855A', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  recBadgeText: { color: '#FFF', fontSize: 11, fontWeight: 'bold' },
  planTitle: { fontSize: 16, fontWeight: 'bold', color: '#2D3748', textAlign: 'right', marginTop: 6 },
  priceRow: { flexDirection: 'row-reverse', alignItems: 'baseline', marginVertical: 8 },
  planPrice: { fontSize: 26, fontWeight: 'bold', color: '#2F855A' },
  planPeriod: { fontSize: 13, color: '#718096' },
  featuresList: { marginVertical: 12 },
  featureItem: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 8 },
  featureText: { fontSize: 12, color: '#4A5568', textAlign: 'right', flex: 1 },
  subBtn: { backgroundColor: '#4A5568', height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  subBtnRecommended: { backgroundColor: '#2F855A' },
  subBtnText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  b2bCard: { backgroundColor: '#EBF8FF', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#BEE3F8', marginTop: 10 },
  b2bTitle: { fontSize: 14, fontWeight: 'bold', color: '#2B6CB0', marginTop: 6, textAlign: 'right' },
  b2bDesc: { fontSize: 12, color: '#4A5568', marginTop: 4, textAlign: 'right', lineHeight: 18 },
});
