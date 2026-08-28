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

export const WorkersScreen: React.FC = () => {
  const { workers, addWorker } = useApp();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('عامل ري وتسميد');
  const [phone, setPhone] = useState('');
  const [salary, setSalary] = useState('');

  const handleAdd = () => {
    if (!name.trim()) {
      Alert.alert('تنبيه', 'يرجى إدخال اسم العامل');
      return;
    }
    addWorker({
      name,
      role,
      phone: phone || '0500000000',
      salary: parseFloat(salary) || 2500,
      status: 'active',
      assignedFarm: 'مزرعة الخير',
    });
    setModalVisible(false);
    setName('');
    setPhone('');
    setSalary('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>إدارة العمال والوظائف</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={18} color="#FFF" />
          <Text style={styles.addBtnText}>إضافة عامل</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {workers.map(w => (
          <View key={w.id} style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>{w.name}</Text>
              <Text style={styles.statusBadge}>نشط</Text>
            </View>

            <Text style={styles.item}>💼 المسمى الوظيفي: {w.role}</Text>
            <Text style={styles.item}>📞 الهاتف: {w.phone}</Text>
            <Text style={styles.item}>💰 الراتب الشهري: {w.salary} ريال</Text>

            <Text style={styles.item}>📍 المزرعة: {w.assignedFarm}</Text>
          </View>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>إضافة عامل جديد</Text>

          <Text style={styles.label}>اسم العامل الكامل</Text>
          <TextInput style={styles.input} placeholder="مثال: كومار سيلفام" value={name} onChangeText={setName} />

          <Text style={styles.label}>المسمى الوظيفي</Text>
          <TextInput style={styles.input} placeholder="سائق تراكتور / عامل ري" value={role} onChangeText={setRole} />

          <Text style={styles.label}>رقم الجوال</Text>
          <TextInput style={styles.input} placeholder="0501234567" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

          <Text style={styles.label}>الراتب الشهري (ريال)</Text>
          <TextInput style={styles.input} placeholder="2500" keyboardType="numeric" value={salary} onChangeText={setSalary} />

          <TouchableOpacity style={styles.saveBtn} onPress={handleAdd}>
            <Text style={styles.saveBtnText}>حفظ بيانات العامل</Text>
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
  addBtn: { backgroundColor: '#2F855A', flexDirection: 'row-reverse', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  addBtnText: { color: '#FFF', fontSize: 12, fontWeight: 'bold', marginRight: 4 },
  content: { padding: 16, paddingBottom: 80 },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  header: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 15, fontWeight: 'bold', color: '#2D3748' },
  statusBadge: { fontSize: 11, color: '#276749', backgroundColor: '#C6F6D5', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, fontWeight: 'bold' },
  item: { fontSize: 12, color: '#4A5568', textAlign: 'right', marginBottom: 4 },
  modalContainer: { flex: 1, backgroundColor: '#FFF', padding: 20, paddingTop: 60 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#2D3748', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#4A5568', marginBottom: 6, textAlign: 'right' },
  input: { borderWidth: 1, borderColor: '#CBD5E0', borderRadius: 10, paddingHorizontal: 12, height: 48, marginBottom: 16, textAlign: 'right' },
  saveBtn: { backgroundColor: '#2F855A', height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  saveBtnText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  closeBtn: { marginTop: 12, alignItems: 'center' },
  closeBtnText: { color: '#E53E3E', fontSize: 14 },
});
