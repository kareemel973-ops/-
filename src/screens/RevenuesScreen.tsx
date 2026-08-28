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

export const RevenuesScreen: React.FC = () => {
  const { revenues, addRevenue } = useApp();
  const [modalVisible, setModalVisible] = useState(false);

  // Form
  const [cropName, setCropName] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [date, setDate] = useState('2025-02-23');
  const [notes, setNotes] = useState('');

  // Auto calculate total
  const calculatedTotal = (parseFloat(quantity) || 0) * (parseFloat(unitPrice) || 0);

  const totalRevenue = revenues.reduce((sum, item) => sum + item.totalAmount, 0);

  const handleSave = () => {
    if (!cropName.trim()) {
      Alert.alert('تنبيه', 'يرجى كتابة اسم المحصول المبيع');
      return;
    }
    if (!buyerName.trim()) {
      Alert.alert('تنبيه', 'يرجى كتابة اسم المشتري');
      return;
    }
    if (!unitPrice || isNaN(Number(unitPrice))) {
      Alert.alert('تنبيه', 'يرجى إدخال سعر بيع صحيح');
      return;
    }

    const price = parseFloat(unitPrice);
    const qtyNum = parseFloat(quantity) || 1;
    const computed = calculatedTotal > 0 ? calculatedTotal : price;

    addRevenue({
      cropName,
      buyerName,
      quantity: quantity ? `${quantity} وحدة` : 'دفعة كاملة',
      unitPrice: price,
      totalAmount: computed,
      date,
      notes,
    });

    setModalVisible(false);
    resetForm();
    Alert.alert('تم بنجاح', 'تم تسجيل الإيراد وتحديث حساب الأرباح');
  };

  const resetForm = () => {
    setCropName('');
    setBuyerName('');
    setQuantity('');
    setUnitPrice('');
    setNotes('');
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>إدارة الإيرادات والمبيعات</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={20} color="#FFF" />
          <Text style={styles.addBtnText}>تسجيل مبيعات</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Total Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>إجمالي الإيرادات والمبيعات</Text>

          <Text style={styles.summaryValue}>{totalRevenue.toLocaleString()} ريال</Text>
          <Text style={styles.summarySub}>تم الحساب تلقائيًا بناءً على الكمية المباعة وسعر البيع</Text>
        </View>

        <Text style={styles.sectionHeader}>عمليات البيع الأخيرة</Text>

        {revenues.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="cash-outline" size={50} color="#A0AEC0" />
            <Text style={styles.emptyText}>لم يتم تسجيل أي مبيعات بعد</Text>
          </View>
        ) : (
          revenues.map(rev => (
            <View key={rev.id} style={styles.revCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.revCrop}>{rev.cropName}</Text>
                <Text style={styles.revAmount}>+{rev.totalAmount.toLocaleString()} ريال</Text>
              </View>

              <View style={styles.cardSubRow}>
                <Text style={styles.revBuyer}>👤 المشتري: {rev.buyerName}</Text>
                <Text style={styles.revQty}>📦 الكمية: {rev.quantity}</Text>
              </View>

              <View style={styles.cardMetaRow}>
                <Text style={styles.revPrice}>سعر الوحدة: {rev.unitPrice} ريال</Text>
                <Text style={styles.revDate}>📅 {rev.date}</Text>
              </View>

              {rev.notes ? <Text style={styles.revNotes}>📝 {rev.notes}</Text> : null}
            </View>
          ))
        )}
      </ScrollView>

      {/* Modal - Add Revenue */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="#2D3748" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>تسجيل عملية بيع جديدة</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView contentContainerStyle={styles.modalBody}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>اسم المحصول المباع *</Text>

              <TextInput
                style={styles.input}
                placeholder="مثال: تمر صقعي، طماطم، زيتون..."
                value={cropName}
                onChangeText={setCropName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>اسم المشتري / الشركة *</Text>
              <TextInput
                style={styles.input}
                placeholder="مثال: شركة الثمار، تاجر سوق الجملة..."
                value={buyerName}
                onChangeText={setBuyerName}
              />
            </View>

            <View style={styles.rowTwoInputs}>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>الكمية المباعة</Text>

                <TextInput
                  style={styles.input}
                  placeholder="مثال: 100"
                  keyboardType="numeric"
                  value={quantity}
                  onChangeText={setQuantity}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>سعر البيع للوحدة (ريال) *</Text>

                <TextInput
                  style={styles.input}
                  placeholder="مثال: 45"
                  keyboardType="numeric"
                  value={unitPrice}
                  onChangeText={setUnitPrice}
                />
              </View>
            </View>

            {/* Calculated Preview */}
            <View style={styles.calcBox}>
              <Text style={styles.calcLabel}>الإيراد الإجمالي الحساب التلقائي:</Text>

              <Text style={styles.calcVal}>{calculatedTotal.toLocaleString()} ريال</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>تاريخ العملية</Text>
              <TextInput
                style={styles.input}
                placeholder="2025-02-23"
                value={date}
                onChangeText={setDate}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>ملاحظات أو رقم الفاتورة</Text>
              <TextInput
                style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                placeholder="طريقة الدفع (كاش/تحويل)، مكان التسليم..."
                multiline
                value={notes}
                onChangeText={setNotes}
              />
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>حفظ عملية البيع</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  topBar: {
    backgroundColor: '#FFF',
    paddingTop: 50,
    paddingBottom: 14,
    paddingHorizontal: 16,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  topTitle: { fontSize: 18, fontWeight: 'bold', color: '#2D3748' },
  addBtn: {
    backgroundColor: '#276749',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addBtnText: { color: '#FFF', fontSize: 13, fontWeight: 'bold', marginRight: 4 },
  scrollContent: { padding: 16, paddingBottom: 80 },
  summaryCard: {
    backgroundColor: '#F0FFF4',
    borderWidth: 1,
    borderColor: '#9AE6B4',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryLabel: { fontSize: 13, color: '#22543D', fontWeight: 'bold' },
  summaryValue: { fontSize: 28, fontWeight: 'bold', color: '#276749', marginVertical: 6 },
  summarySub: { fontSize: 11, color: '#2F855A', textAlign: 'center' },
  sectionHeader: { fontSize: 15, fontWeight: 'bold', color: '#2D3748', textAlign: 'right', marginBottom: 12 },
  emptyBox: { alignItems: 'center', marginTop: 40 },
  emptyText: { color: '#718096', marginTop: 8 },
  revCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
  revCrop: { fontSize: 15, fontWeight: 'bold', color: '#2D3748' },
  revAmount: { fontSize: 16, fontWeight: 'bold', color: '#276749' },
  cardSubRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginTop: 6 },
  revBuyer: { fontSize: 12, color: '#4A5568' },
  revQty: { fontSize: 12, color: '#4A5568' },
  cardMetaRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginTop: 4 },
  revPrice: { fontSize: 11, color: '#718096' },
  revDate: { fontSize: 11, color: '#718096' },
  revNotes: { fontSize: 12, color: '#4A5568', marginTop: 6, textAlign: 'right' },
  modalContainer: { flex: 1, backgroundColor: '#F7FAFC', paddingTop: 40 },
  modalHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFF',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#2D3748' },
  modalBody: { padding: 16, paddingBottom: 60 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: '#4A5568', marginBottom: 6, textAlign: 'right' },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#FFF',
    textAlign: 'right',
    fontSize: 14,
    color: '#2D3748',
  },
  rowTwoInputs: { flexDirection: 'row-reverse' },
  calcBox: {
    backgroundColor: '#E6FFFA',
    borderWidth: 1,
    borderColor: '#81E6D9',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  calcLabel: { fontSize: 12, color: '#234E52' },
  calcVal: { fontSize: 20, fontWeight: 'bold', color: '#234E52', marginTop: 2 },
  saveBtn: {
    backgroundColor: '#276749',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  saveBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
