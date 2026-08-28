import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', title: 'الرئيسية', icon: 'home-outline', activeIcon: 'home' },
    { id: 'crops', title: 'المحاصيل', icon: 'leaf-outline', activeIcon: 'leaf' },
    { id: 'ai_assistant', title: 'المساعد AI', icon: 'sparkles-outline', activeIcon: 'sparkles' },
    { id: 'market', title: 'السوق', icon: 'cart-outline', activeIcon: 'cart' },
    { id: 'profits', title: 'الأرباح', icon: 'stats-chart-outline', activeIcon: 'stats-chart' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItem}
            onPress={() => onTabChange(tab.id)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={(isActive ? tab.activeIcon : tab.icon) as any}
              size={22}
              color={isActive ? '#2F855A' : '#A0AEC0'}
            />
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabLabel: {
    fontSize: 10,
    color: '#718096',
    marginTop: 2,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#2F855A',
    fontWeight: 'bold',
  },
});
