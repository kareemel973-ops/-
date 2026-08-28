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

export const FertilizationScreen: React.FC = () => {
  const [programs, setPrograms] = useState([
    { id: 'f1', cropName: 'نخيل صقعي', fertilizer: 'NPK 20-20-20 متوازن', dosage: '500 جرام لكل نخلة', nextDate: '2025-03-01' },
    { id: 'f2', cropName: 'طماطم محمية', fertilizer: 'سولوفات البوتاسيوم + عناصر صغرى', dosage: '2 كجم / 1000 لتر ماء', nextDate: '2025-02-28' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [cropName, setCropName] = useState('');
  const [fertilizer, setFertilizer] = useState('');
  const [dosage, setDosage] = useState('');

  const handleAdd = () => {
    if (!cropName || !fertilizer) {
      Alert.alert('تنبيه', 'يرجى إكمال البيانات');
      return;
    }
    setPrograms([
      ...programs,
      { id: 'f_' + Date.now(), cropName, fertilizer, dosage: dosage || 'جرعة قياسية', nextDate: '2025-03-05' },
    ]);
    setModalVisible(false);
    setCropName('');
    setFertilizer('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>برنامج التسميد الزراعي</Text>

        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={18} color="#FFF" />
          <Text style={styles.addBtnText}>إضافة جرعة</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoBox}>
          <Ionicons name="flask-outline" size={24} color="#D69E2E" />
          <Text style={styles.infoText}>
            التسميد المتوازن يضمن أقصى إنتاجية للمحصول ويحمي التربة من التملح والإجهاد.
          </Text>
        </View>

        {programs.map(prog => (
          <View key={prog.id} style={styles.card}>
            <Text style={styles.cropTitle}>{prog.cropName}</Text>
            <Text style={styles.detailItem}>🧪 نوع السماد: {prog.fertilizer}</Text>
            <Text style={styles.detailItem}>⚖️ الجرعة: {prog.dosage}</Text>
            <Text style={styles.detailItem}>📅 الموعد القادم: {prog.nextDate}</Text>
          </View>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>إضافة برنامج تسميد جديد</Text>

          <Text style={styles.label}>اسم المحصول</Text>

          <TextInput style={styles.input} placeholder="طماطم / نخيل..." value={cropName} onChangeText={setCropName} />

          <Text style={styles.label}>نوع السماد المضاف</Text>
          <TextInput style={styles.input} placeholder="NPK / يوريا / عناصر..." value={fertilizer} onChangeText={setFertilizer} />

          <Text style={styles.label}>الجرعة الموصى بها</Text>

          <TextInput style={styles.input} placeholder="500 جرام لكل نخلة" value={dosage} onChangeText={setDosage} />

          <TouchableOpacity style={styles.saveBtn} onPress={handleAdd}>
            <Text style={styles.saveBtnText}>حفظ الجرعة</Text>
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
  addBtn: { backgroundColor: '#D69E2E', flexDirection: 'row-reverse', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  addBtnText: { color: '#FFF', fontSize: 12, fontWeight: 'bold', marginRight: 4 },
  content: { padding: 16, paddingBottom: 80 },
  infoBox: { backgroundColor: '#FEFCBF', borderRadius: 12, padding: 12, flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 16 },
  infoText: { fontSize: 12, color: '#744210', marginRight: 8, flex: 1, textAlign: 'right', lineHeight: 18 },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  cropTitle: { fontSize: 15, fontWeight: 'bold', color: '#2D3748', textAlign: 'right', marginBottom: 6 },
  detailItem: { fontSize: 12, color: '#4A5568', textAlign: 'right', marginBottom: 4 },
  modalContainer: { flex: 1, backgroundColor: '#FFF', padding: 20, paddingTop: 60 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#2D3748', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#4A5568', marginBottom: 6, textAlign: 'right' },
  input: { borderWidth: 1, borderColor: '#CBD5E0', borderRadius: 10, paddingHorizontal: 12, height: 48, marginBottom: 16, textAlign: 'right' },
  saveBtn: { backgroundColor: '#D69E2E', height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  saveBtnText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  closeBtn: { marginTop: 12, alignItems: 'center' },
  closeBtnText: { color: '#E53E3E', fontSize: 14 },
});
