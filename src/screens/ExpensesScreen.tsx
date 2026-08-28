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

export const ExpensesScreen: React.FC = () => {
  const { expenses, addExpense, farms } = useApp();
  const [modalVisible, setModalVisible] = useState(false);

  // Form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'fertilizer' | 'pesticide' | 'labor' | 'fuel' | 'transport' | 'other'>('fertilizer');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('2025-02-23');
  const [notes, setNotes] = useState('');

  const categories = [
    { key: 'fertilizer', label: 'أسمدة ومغذيات', icon: 'flask-outline' },
    { key: 'pesticide', label: 'مبيدات حشرية', icon: 'bug-outline' },
    { key: 'labor', label: 'عمالة وأجور', icon: 'people-outline' },
    { key: 'fuel', label: 'وقود وسولار', icon: 'speedometer-outline' },
    { key: 'transport', label: 'نقل وشحن', icon: 'bus-outline' },
    { key: 'other', label: 'مصروفات أخرى', icon: 'options-outline' },
  ];

  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('تنبيه', 'يرجى كتابة عنوان المصروف');
      return;
    }
    if (!amount || isNaN(Number(amount))) {
      Alert.alert('تنبيه', 'يرجى إدخال مبلغ صحيح');
      return;
    }

    addExpense({
      title,
      category,
      amount: parseFloat(amount),
      date,
      notes,
      farmName: farms[0]?.name || 'المزرعة الرئيسية',
    });

    setModalVisible(false);
    setTitle('');
    setAmount('');
    setNotes('');
    Alert.alert('نجاح', 'تم تسجيل المصروف بنجاح');
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>إدارة المصروفات</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={20} color="#FFF" />
          <Text style={styles.addBtnText}>تسجيل مصروف</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Total Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>إجمالي المصروفات المسجلة</Text>
          <Text style={styles.summaryValue}>{totalExpense.toLocaleString()} ريال</Text>
          <Text style={styles.summarySub}>يشمل الأسمدة، المبيدات، العمالة، الوقود والنقل</Text>
        </View>

        <Text style={styles.sectionHeader}>سجل المصروفات الأخير</Text>

        {expenses.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="receipt-outline" size={50} color="#A0AEC0" />
            <Text style={styles.emptyText}>لم يتم تسجيل أي مصروف بعد</Text>
          </View>
        ) : (
          expenses.map(exp => (
            <View key={exp.id} style={styles.expenseCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.expTitle}>{exp.title}</Text>

                <Text style={styles.expAmount}>-{exp.amount.toLocaleString()} ريال</Text>
              </View>

              <View style={styles.cardSubRow}>
                <Text style={styles.expDate}>📅 {exp.date}</Text>
                <Text style={styles.expFarm}>📍 {exp.farmName}</Text>
              </View>

              {exp.notes ? <Text style={styles.expNotes}>📝 {exp.notes}</Text> : null}
            </View>
          ))
        )}
      </ScrollView>

      {/* Modal - Add Expense */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="#2D3748" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>تسجيل مصروف جديد</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView contentContainerStyle={styles.modalBody}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>اسم المصروف / البند *</Text>
              <TextInput
                style={styles.input}
                placeholder="مثال: شراء سماد NPK، أجور عمال الحصاد..."
                value={title}
                onChangeText={setTitle}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>المبلغ (بالريال) *</Text>

              <TextInput
                style={styles.input}
                placeholder="0.00"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>نوع المصروف *</Text>

              <View style={styles.catGrid}>
                {categories.map(c => (
                  <TouchableOpacity
                    key={c.key}
                    style={[
                      styles.catCard,
                      category === c.key && styles.catCardSelected,
                    ]}
                    onPress={() => setCategory(c.key as any)}
                  >
                    <Ionicons
                      name={c.icon as any}
                      size={20}
                      color={category === c.key ? '#C53030' : '#4A5568'}
                    />
                    <Text
                      style={[
                        styles.catCardText,
                        category === c.key && styles.catCardTextSelected,
                      ]}
                    >
                      {c.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>التاريخ</Text>

              <TextInput
                style={styles.input}
                placeholder="2025-02-23"
                value={date}
                onChangeText={setDate}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>ملاحظات أو تفاصيل المورد</Text>
              <TextInput
                style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                placeholder="اكتب أي ملاحظات إضافية هنا..."
                multiline
                value={notes}
                onChangeText={setNotes}
              />
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>حفظ المصروف</Text>
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
    backgroundColor: '#C53030',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addBtnText: { color: '#FFF', fontSize: 13, fontWeight: 'bold', marginRight: 4 },
  scrollContent: { padding: 16, paddingBottom: 80 },
  summaryCard: {
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FEB2B2',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryLabel: { fontSize: 13, color: '#9B2C2C', fontWeight: 'bold' },
  summaryValue: { fontSize: 28, fontWeight: 'bold', color: '#9B2C2C', marginVertical: 6 },
  summarySub: { fontSize: 11, color: '#C53030', textAlign: 'center' },
  sectionHeader: { fontSize: 15, fontWeight: 'bold', color: '#2D3748', textAlign: 'right', marginBottom: 12 },
  emptyBox: { alignItems: 'center', marginTop: 40 },
  emptyText: { color: '#718096', marginTop: 8 },
  expenseCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
  expTitle: { fontSize: 14, fontWeight: 'bold', color: '#2D3748' },
  expAmount: { fontSize: 15, fontWeight: 'bold', color: '#E53E3E' },
  cardSubRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginTop: 6 },
  expDate: { fontSize: 11, color: '#718096' },
  expFarm: { fontSize: 11, color: '#718096' },
  expNotes: { fontSize: 12, color: '#4A5568', marginTop: 6, textAlign: 'right' },
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
  catGrid: { flexDirection: 'row-reverse', flexWrap: 'wrap', justifyContent: 'space-between' },
  catCard: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#FFF',
  },
  catCardSelected: { borderColor: '#C53030', backgroundColor: '#FFF5F5' },
  catCardText: { fontSize: 12, color: '#4A5568', marginRight: 6 },
  catCardTextSelected: { color: '#C53030', fontWeight: 'bold' },
  saveBtn: {
    backgroundColor: '#C53030',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  saveBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
