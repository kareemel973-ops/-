import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      {/* Background Graphic Patterns */}
      <View style={styles.circleBg1} />
      <View style={styles.circleBg2} />

      <View style={styles.content}>
        <View style={styles.logoBadge}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=300&q=80' }}
            style={styles.logoImage}
          />
        </View>

        <Text style={styles.appName}>مزرعتي</Text>
        <Text style={styles.tagline}>الذكاء الزراعي بين يديك</Text>

        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#48BB78" />
          <Text style={styles.loadingText}>جاري تجهيز المزرعة الرقمية...</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>إدارة المزارع • الذكاء الاصطناعي • السوق الزراعي</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C4532', // Deep agricultural green
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  circleBg1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(72, 187, 120, 0.15)',
  },
  circleBg2: {
    position: 'absolute',
    bottom: -120,
    left: -120,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(56, 161, 105, 0.12)',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoBadge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 104,
    height: 104,
    borderRadius: 52,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 20,
    color: '#9AE6B4',
    fontWeight: '600',
    marginBottom: 40,
    textAlign: 'center',
  },
  loaderContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    color: '#E2E8F0',
    fontSize: 13,
    marginTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
  },
  footerText: {
    color: '#A0AEC0',
    fontSize: 12,
    textAlign: 'center',
  },
});
