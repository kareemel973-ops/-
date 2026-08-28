import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppProvider, useApp } from './src/context/AppContext';
import { SplashScreen } from './src/screens/SplashScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { CropsScreen } from './src/screens/CropsScreen';
import { ExpensesScreen } from './src/screens/ExpensesScreen';
import { RevenuesScreen } from './src/screens/RevenuesScreen';
import { ProfitsScreen } from './src/screens/ProfitsScreen';
import { AIAssistantScreen } from './src/screens/AIAssistantScreen';
import { MarketScreen } from './src/screens/MarketScreen';
import { IrrigationScreen } from './src/screens/IrrigationScreen';
import { FertilizationScreen } from './src/screens/FertilizationScreen';
import { LandsScreen } from './src/screens/LandsScreen';
import { WorkersScreen } from './src/screens/WorkersScreen';
import { SubscriptionScreen } from './src/screens/SubscriptionScreen';
import { SettingsProfileScreen } from './src/screens/SettingsProfileScreen';
import { BottomNav } from './src/components/BottomNav';

const MainAppContent: React.FC = () => {
  const { isAuthenticated, activeTab, setActiveTab } = useApp();

  // Navigation state for Auth Flow
  const [showSplash, setShowSplash] = useState(true);
  const [authView, setAuthView] = useState<'login' | 'register' | 'forgot'>('login');

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!isAuthenticated) {
    if (authView === 'register') {
      return <RegisterScreen onBackToLogin={() => setAuthView('login')} />;
    }
    if (authView === 'forgot') {
      return <ForgotPasswordScreen onBackToLogin={() => setAuthView('login')} />;
    }
    return (
      <LoginScreen
        onNavigateRegister={() => setAuthView('register')}
        onNavigateForgotPassword={() => setAuthView('forgot')}
      />
    );
  }

  // Render Screen depending on activeTab
  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'crops':
        return <CropsScreen />;
      case 'expenses':
        return <ExpensesScreen />;
      case 'revenues':
        return <RevenuesScreen />;
      case 'profits':
        return <ProfitsScreen />;
      case 'irrigation':
        return <IrrigationScreen />;
      case 'fertilizer':
        return <FertilizationScreen />;
      case 'diagnosis':
      case 'ai_assistant':
        return <AIAssistantScreen />;
      case 'market':
        return <MarketScreen />;
      case 'lands':
        return <LandsScreen />;
      case 'workers':
        return <WorkersScreen />;
      case 'subscription':
        return <SubscriptionScreen />;
      case 'settings':
      case 'profile':
        return <SettingsProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.appContainer}>
      <StatusBar style="dark" />
      <View style={{ flex: 1 }}>{renderScreen()}</View>

      {/* Bottom Navigation for logged in user */}
      <BottomNav activeTab={activeTab} onTabChange={tab => setActiveTab(tab)} />
    </View>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppProvider>
      <SafeAreaView style={styles.safeArea}>
        <MainAppContent />
      </SafeAreaView>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1C4532',
    paddingTop: RNStatusBar.currentHeight || 0,
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    position: 'relative',
  },
});
