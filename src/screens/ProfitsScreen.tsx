import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useApp } from '../context/AppContext';

const screenWidth = Dimensions.get('window').width - 32;

export const ProfitsScreen: React.FC = () => {
  const { expenses, revenues } = useApp();
  const [timeframe, setTimeframe] = useState<'monthly' | 'yearly'>('monthly');

  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const totalRevenues = revenues.reduce((sum, item) => sum + item.totalAmount, 0);
  const netProfit = totalRevenues - totalExpenses;
  const margin = totalRevenues > 0 ? ((netProfit / totalRevenues) * 100).toFixed(1) : '0';

  // Monthly breakdown mock data for visual bar charts
  const monthlyData = [
    { month: 'أكتوبر', revenue: 25000, expense: 12000 },
    { month: 'نوفمبر', revenue: 38000, expense: 15000 },
    { month: 'ديسمبر', revenue: 42000, expense: 11000 },
    { month: 'يناير', revenue: 55000, expense: 18000 },
    { month: 'فبراير', revenue: totalRevenues, expense: totalExpenses },
  ];

  const yearlyData = [
    { month: '2022', revenue: 180000, expense: 95000 },
    { month: '2023', revenue: 240000, expense: 110000 },
    { month: '2024', revenue: 310000, expense: 135000 },
    { month: '2025 (متوقع)', revenue: 450000, expense: 180000 },
  ];

  const currentChartData = timeframe === 'monthly' ? monthlyData : yearlyData;
  const maxVal = Math.max(...currentChartData.map(d => Math.max(d.revenue, d.expense))) || 1;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <Text style={styles.topTitle}>الأرباح والتقارير المالية</Text>

      {/* Summary Stat Cards */}
      <View style={styles.summaryGrid}>
        <View style={styles.statCardGreen}>
          <Text style={styles.statLabel}>إجمالي الإيرادات</Text>
          <Text style={styles.statValueGreen}>+{totalRevenues.toLocaleString()} ريال</Text>
          <Ionicons name="arrow-up-circle" size={24} color="#276749" style={styles.statIcon} />
        </View>

        <View style={styles.statCardRed}>
          <Text style={styles.statLabel}>إجمالي المصروفات</Text>
          <Text style={styles.statValueRed}>-{totalExpenses.toLocaleString()} ريال</Text>
          <Ionicons name="arrow-down-circle" size={24} color="#C53030" style={styles.statIcon} />
        </View>
      </View>

      {/* Net Profit Banner */}
      <View style={[styles.netProfitCard, netProfit < 0 && styles.netProfitCardNegative]}>
        <View style={styles.netHeader}>
          <Text style={styles.netTitle}>صافي الربح الفعلي (الإيراد - المصروف)</Text>
          <Text style={styles.marginText}>هامش الربح: {margin}%</Text>
        </View>
        <Text style={[styles.netValue, netProfit < 0 && styles.netValueNegative]}>
          {netProfit >= 0 ? `+${netProfit.toLocaleString()}` : `${netProfit.toLocaleString()}`} ريال
        </Text>
        <Text style={styles.netSub}>حساب مباشر ودقيق لكافة المعاملات المسجلة</Text>
      </View>

      {/* Chart Switcher */}
      <View style={styles.chartHeader}>
        <Text style={styles.chartTitle}>الرسوم البيانية والمقارنة</Text>
        <View style={styles.toggleGroup}>
          <TouchableOpacity
            style={[styles.toggleBtn, timeframe === 'monthly' && styles.toggleBtnActive]}
            onPress={() => setTimeframe('monthly')}
          >
            <Text style={[styles.toggleText, timeframe === 'monthly' && styles.toggleTextActive]}>
              شهري
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, timeframe === 'yearly' && styles.toggleBtnActive]}
            onPress={() => setTimeframe('yearly')}
          >
            <Text style={[styles.toggleText, timeframe === 'yearly' && styles.toggleTextActive]}>
              سنوي
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Custom Bar Chart Component */}
      <View style={styles.chartCard}>
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#38A169' }]} />
            <Text style={styles.legendText}>الإيرادات</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#E53E3E' }]} />
            <Text style={styles.legendText}>المصروفات</Text>
          </View>
        </View>

        <View style={styles.chartBarsContainer}>
          {currentChartData.map((item, index) => {
            const revHeight = (item.revenue / maxVal) * 120;
            const expHeight = (item.expense / maxVal) * 120;

            return (
              <View key={index} style={styles.chartColumn}>
                <View style={styles.barsPairWrapper}>
                  {/* Revenue Bar */}
                  <View style={[styles.barFill, { height: revHeight, backgroundColor: '#38A169' }]} />
                  {/* Expense Bar */}
                  <View style={[styles.barFill, { height: expHeight, backgroundColor: '#E53E3E' }]} />
                </View>
                <Text style={styles.chartLabel}>{item.month}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Financial Health Analysis */}
      <View style={styles.analysisCard}>
        <View style={styles.analysisHeader}>
          <Ionicons name="analytics-outline" size={22} color="#2B6CB0" />
          <Text style={styles.analysisTitle}>تحليل الأداء المالي الذكي AI</Text>
        </View>
        <Text style={styles.analysisBody}>
          • أداؤك المالي ممتاز هذا الشهر بنسبة نمو أرباح +18% مقارنة بالشهر السابق.
          {'\n'}• البند الأكثر استهلاكاً للميزانية: أسمدة ومغذيات (35% من المصروفات).
          {'\n'}• يوصى بالتعاقد المباشر مع الموردين لتقليل تكلفة الشراء بنسبة 10%.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  content: { padding: 16, paddingTop: 50, paddingBottom: 80 },
  topTitle: { fontSize: 20, fontWeight: 'bold', color: '#2D3748', textAlign: 'right', marginBottom: 16 },
  summaryGrid: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 12 },
  statCardGreen: {
    width: '48%',
    backgroundColor: '#F0FFF4',
    borderWidth: 1,
    borderColor: '#9AE6B4',
    borderRadius: 14,
    padding: 14,
    position: 'relative',
  },
  statCardRed: {
    width: '48%',
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FEB2B2',
    borderRadius: 14,
    padding: 14,
    position: 'relative',
  },
  statLabel: { fontSize: 11, color: '#4A5568', fontWeight: '600', textAlign: 'right' },
  statValueGreen: { fontSize: 16, fontWeight: 'bold', color: '#276749', marginTop: 6, textAlign: 'right' },
  statValueRed: { fontSize: 16, fontWeight: 'bold', color: '#C53030', marginTop: 6, textAlign: 'right' },
  statIcon: { position: 'absolute', top: 12, left: 12 },
  netProfitCard: {
    backgroundColor: '#E6FFFA',
    borderWidth: 1.5,
    borderColor: '#319795',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
  },
  netProfitCardNegative: {
    backgroundColor: '#FFF5F5',
    borderColor: '#E53E3E',
  },
  netHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
  netTitle: { fontSize: 13, fontWeight: 'bold', color: '#234E52' },
  marginText: { fontSize: 11, fontWeight: 'bold', color: '#2B6CB0', backgroundColor: '#EBF8FF', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  netValue: { fontSize: 30, fontWeight: 'bold', color: '#234E52', marginVertical: 6, textAlign: 'right' },
  netValueNegative: { color: '#C53030' },
  netSub: { fontSize: 11, color: '#2C7A7B', textAlign: 'right' },
  chartHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  chartTitle: { fontSize: 15, fontWeight: 'bold', color: '#2D3748' },
  toggleGroup: { flexDirection: 'row-reverse', backgroundColor: '#EDF2F7', borderRadius: 8, padding: 2 },
  toggleBtn: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6 },
  toggleBtnActive: { backgroundColor: '#2F855A' },
  toggleText: { fontSize: 12, color: '#4A5568' },
  toggleTextActive: { color: '#FFF', fontWeight: 'bold' },
  chartCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  legendRow: { flexDirection: 'row-reverse', justifyContent: 'center', marginBottom: 16 },
  legendItem: { flexDirection: 'row-reverse', alignItems: 'center', marginHorizontal: 10 },
  legendDot: { width: 10, height: 10, borderRadius: 5, marginLeft: 6 },
  legendText: { fontSize: 11, color: '#4A5568' },
  chartBarsContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 150,
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E0',
    paddingBottom: 4,
  },
  chartColumn: { alignItems: 'center', flex: 1 },
  barsPairWrapper: { flexDirection: 'row-reverse', alignItems: 'flex-end' },
  barFill: { width: 14, borderRadius: 4, marginHorizontal: 2 },
  chartLabel: { fontSize: 10, color: '#718096', marginTop: 6 },
  analysisCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  analysisHeader: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 10 },
  analysisTitle: { fontSize: 14, fontWeight: 'bold', color: '#2B6CB0', marginRight: 6 },
  analysisBody: { fontSize: 12, color: '#4A5568', lineHeight: 22, textAlign: 'right' },
});
