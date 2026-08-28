import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useApp } from '../context/AppContext';

interface AdBannerProps {
  type?: 'banner' | 'card' | 'sponsored';
}

export const AdBanner: React.FC<AdBannerProps> = ({ type = 'banner' }) => {
  const { user, togglePremium, setActiveTab } = useApp();

  if (user?.isPremium) {
    return null; // Premium users do not see ads
  }

  if (type === 'card') {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.adBadgeHeader}>
          <Text style={styles.adBadgeText}>إعلان مميز - AdMob</Text>
          <Ionicons name="information-circle-outline" size={16} color="#718096" />
        </View>

        <View style={styles.cardContent}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=300&q=80' }}
            style={styles.cardImage}
          />
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>شركة الروضة للحلول الزراعية والأسمدة</Text>
            <Text style={styles.cardDesc}>خصم 20% على طلبات الأسمدة المركبة والشبكات لهذا الشهر!</Text>
            <TouchableOpacity style={styles.cardBtn} onPress={() => Linking.openURL('https://google.com')}>
              <Text style={styles.cardBtnText}>تواصل الآن عبر واتساب</Text>
              <Ionicons name="call-outline" size={14} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.removeAdsBar} onPress={() => setActiveTab('subscription')}>
          <Ionicons name="star" size={14} color="#D69E2E" />
          <Text style={styles.removeAdsText}>ترقية للحساب المميز لإزالة الإعلانات</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.bannerContainer}>
      <View style={styles.adTagRow}>
        <Text style={styles.adTagText}>إعلان Google AdMob</Text>
        <TouchableOpacity onPress={() => setActiveTab('subscription')}>
          <Text style={styles.hideAdText}>إزالة الإعلانات ✨</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bannerContent}>
        <Ionicons name="leaf" size={24} color="#2F855A" style={{ marginLeft: 8 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>مبيدات وفطريات معتمدة بأسعار الجملة</Text>

          <Text style={styles.bannerSub}>توصيل لكافة المحافظات - شركة نماء الزراعية</Text>
        </View>
        <TouchableOpacity style={styles.bannerAction} onPress={() => Linking.openURL('https://google.com')}>
          <Text style={styles.bannerActionText}>تصفح</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
  },
  adTagRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  adTagText: {
    fontSize: 10,
    color: '#A0AEC0',
    fontWeight: 'bold',
  },
  hideAdText: {
    fontSize: 11,
    color: '#2B6CB0',
    fontWeight: '600',
  },
  bannerContent: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'right',
  },
  bannerSub: {
    fontSize: 11,
    color: '#718096',
    textAlign: 'right',
  },
  bannerAction: {
    backgroundColor: '#2F855A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  bannerActionText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  adBadgeHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  adBadgeText: {
    fontSize: 10,
    color: '#718096',
    fontWeight: 'bold',
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  cardContent: {
    flexDirection: 'row-reverse',
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginLeft: 10,
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'right',
  },
  cardDesc: {
    fontSize: 12,
    color: '#4A5568',
    textAlign: 'right',
    marginTop: 2,
  },
  cardBtn: {
    backgroundColor: '#276749',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 6,
  },
  cardBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  removeAdsBar: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EDF2F7',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeAdsText: {
    fontSize: 11,
    color: '#D69E2E',
    fontWeight: 'bold',
    marginRight: 4,
  },
});
