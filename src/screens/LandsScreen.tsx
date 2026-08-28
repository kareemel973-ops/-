import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useApp } from '../context/AppContext';

export const LandsScreen: React.FC = () => {
  const { lands, addLand } = useApp();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [soilType, setSoilType] = useState('طينية رملية');

  const handleAdd = () => {
    if (!name.trim()) {
      Alert.alert('تنبيه', 'يرجى كتابة اسم أو رقم القطعة');
      return;
    }
    addLand({
      name,
      area: area || '2 هكتار',
      soilType,
      waterSource: 'بئر اروازي عميق',
      currentCrop: 'تجهيز موسم الربيع',
      status: 'cultivated',
    });
    setModalVisible(false);
    setName('');
    setArea('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>إدارة الأراضي والمزارع</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={18} color="#FFF" />
          <Text style={styles.addBtnText}>إضافة قطعة أرض</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {lands.map(land => (
          <View key={land.id} style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>{land.name}</Text>
              <Ionicons name="map-outline" size={20} color="#2C7A7B" />
            </View>

            <Text style={styles.item}>📏 المساحة: {land.area}</Text>

            <Text style={styles.item}>⛰️ نوع التربة: {land.soilType}</Text>
            <Text style={styles.item}>💧 مصدر المياه: {land.waterSource}</Text>
            <Text style={styles.item}>🌾 المحصول الحالي: {land.currentCrop}</Text>
          </View>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>إضافة قطعة أرض جديدة</Text>

          <Text style={styles.label}>اسم/رقم قطعة الأرض</Text>

          <TextInput style={styles.input} placeholder="مثال: القطعة رقم 4" value={name} onChangeText={setName} />

          <Text style={styles.label}>المساحة</Text>
          <TextInput style={styles.input} placeholder="مثال: 5 هكتار" value={area} onChangeText={setArea} />

          <Text style={styles.label}>نوع التربة</Text>
          <TextInput style={styles.input} placeholder="طينية / رملية / رسوبية" value={soilType} onChangeText={setSoilType} />

          <TouchableOpacity style={styles.saveBtn} onPress={handleAdd}>
            <Text style={styles.saveBtnText}>حفظ الأرض</Text>
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
  addBtn: { backgroundColor: '#2C7A7B', flexDirection: 'row-reverse', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  addBtnText: { color: '#FFF', fontSize: 12, fontWeight: 'bold', marginRight: 4 },
  content: { padding: 16, paddingBottom: 80 },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  header: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 15, fontWeight: 'bold', color: '#2D3748' },
  item: { fontSize: 12, color: '#4A5568', textAlign: 'right', marginBottom: 4 },
  modalContainer: { flex: 1, backgroundColor: '#FFF', padding: 20, paddingTop: 60 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#2D3748', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#4A5568', marginBottom: 6, textAlign: 'right' },
  input: { borderWidth: 1, borderColor: '#CBD5E0', borderRadius: 10, paddingHorizontal: 12, height: 48, marginBottom: 16, textAlign: 'right' },
  saveBtn: { backgroundColor: '#2C7A7B', height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  saveBtnText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  closeBtn: { marginTop: 12, alignItems: 'center' },
  closeBtnText: { color: '#E53E3E', fontSize: 14 },
});
