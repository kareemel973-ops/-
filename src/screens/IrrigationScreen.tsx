import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
  Modal,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useApp } from '../context/AppContext';

export const IrrigationScreen: React.FC = () => {
  const [schedules, setSchedules] = useState([
    { id: 'i1', cropName: 'نخيل صقعي', duration: '60 دقيقة', frequency: 'يومياً', time: '06:00 صباحاً', active: true },
    { id: 'i2', cropName: 'طماطم محمية', duration: '35 دقيقة', frequency: 'مرتان يومياً', time: '07:00 ص / 05:00 م', active: true },
    { id: 'i3', cropName: 'زيتون نبالي', duration: '90 دقيقة', frequency: 'كل يومين', time: '05:30 صباحاً', active: false },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [cropName, setCropName] = useState('');
  const [duration, setDuration] = useState('45 دقيقة');

  const toggleSchedule = (id: string) => {
    setSchedules(prev =>
      prev.map(item => (item.id === id ? { ...item, active: !item.active } : item))
    );
  };

  const handleAddSchedule = () => {
    if (!cropName.trim()) {
      Alert.alert('تنبيه', 'يرجى إدخال اسم المحصول');
      return;
    }
    setSchedules([
      ...schedules,
      {
        id: 'i_' + Date.now(),
        cropName,
        duration,
        frequency: 'يومياً',
        time: '06:30 صباحاً',
        active: true,
      },
    ]);
    setModalVisible(false);
    setCropName('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>جدول الري الذكي</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={18} color="#FFF" />
          <Text style={styles.addBtnText}>إضافة موعد</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoBox}>
          <Ionicons name="water-outline" size={24} color="#3182CE" />
          <Text style={styles.infoText}>
            يتم تحديد كمية ومواعيد الري آلياً بناءً على درجات الحرارة ونوع التربة لحماية الجذور وتوفير 30% من استهلاك المياه.
          </Text>
        </View>

        {schedules.map(sch => (
          <View key={sch.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cropTitle}>{sch.cropName}</Text>
              <Switch
                value={sch.active}
                onValueChange={() => toggleSchedule(sch.id)}
                trackColor={{ false: '#CBD5E0', true: '#9AE6B4' }}
                thumbColor={sch.active ? '#2F855A' : '#718096'}
              />
            </View>

            <View style={styles.detailsRow}>
              <Text style={styles.detailItem}>⏱️ المدة: {sch.duration}</Text>
              <Text style={styles.detailItem}>🔄 التكرار: {sch.frequency}</Text>
              <Text style={styles.detailItem}>⏰ الموعد: {sch.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>إضافة موعد ري جديد</Text>

          <Text style={styles.label}>اسم المحصول</Text>
          <TextInput
            style={styles.input}
            placeholder="مثال: قمح، نعناع..."
            value={cropName}
            onChangeText={setCropName}
          />

          <Text style={styles.label}>مدة الري المقترحة</Text>
          <TextInput
            style={styles.input}
            placeholder="مثال: 45 دقيقة"
            value={duration}
            onChangeText={setDuration}
          />

          <TouchableOpacity style={styles.saveBtn} onPress={handleAddSchedule}>
            <Text style={styles.saveBtnText}>حفظ في الجدول</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeBtnText}>إلغاء</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  topBar: { backgroundColor: '#FFF', paddingTop: 50, paddingBottom: 14, paddingHorizontal: 16, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  topTitle: { fontSize: 18, fontWeight: 'bold', color: '#2D3748' },
  addBtn: { backgroundColor: '#3182CE', flexDirection: 'row-reverse', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  addBtnText: { color: '#FFF', fontSize: 12, fontWeight: 'bold', marginRight: 4 },
  content: { padding: 16, paddingBottom: 80 },
  infoBox: { backgroundColor: '#EBF8FF', borderRadius: 12, padding: 12, flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 16 },
  infoText: { fontSize: 12, color: '#2B6CB0', marginRight: 8, flex: 1, textAlign: 'right', lineHeight: 18 },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  cardHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
  cropTitle: { fontSize: 15, fontWeight: 'bold', color: '#2D3748' },
  detailsRow: { marginTop: 8 },
  detailItem: { fontSize: 12, color: '#4A5568', textAlign: 'right', marginBottom: 4 },
  modalContainer: { flex: 1, backgroundColor: '#FFF', padding: 20, paddingTop: 60 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#2D3748', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#4A5568', marginBottom: 6, textAlign: 'right' },
  input: { borderWidth: 1, borderColor: '#CBD5E0', borderRadius: 10, paddingHorizontal: 12, height: 48, marginBottom: 16, textAlign: 'right' },
  saveBtn: { backgroundColor: '#3182CE', height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  saveBtnText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  closeBtn: { marginTop: 12, alignItems: 'center' },
  closeBtnText: { color: '#E53E3E', fontSize: 14 },
});
