import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useApp } from '../context/AppContext';
import { Crop } from '../types';

export const CropsScreen: React.FC = () => {
  const { crops, addCrop, updateCrop, deleteCrop, farms } = useApp();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);

  // Form State
  const [cropName, setCropName] = useState('');
  const [category, setCategory] = useState('أشجار فواكه');
  const [plantingDate, setPlantingDate] = useState('2025-01-01');
  const [harvestDate, setHarvestDate] = useState('2025-09-01');
  const [areaSize, setAreaSize] = useState('');
  const [count, setCount] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedImage, setSelectedImage] = useState('https://images.unsplash.com/photo-1598170845058-12ef4a4575c1?auto=format&fit=crop&w=600&q=80');

  const categories = ['أشجار فواكه', 'خضروات', 'حبوب', 'أعلاف', 'أعشاب ونباتات عطرية'];

  const sampleImages = [
    'https://images.unsplash.com/photo-1598170845058-12ef4a4575c1?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1541604193435-22287d32c2c2?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
  ];

  const handleCreateCrop = () => {
    if (!cropName.trim()) {
      Alert.alert('تنبيه', 'يرجى كتابة اسم المحصول');
      return;
    }

    addCrop({
      farmId: farms[0]?.id || 'f_1',
      name: cropName,
      category,
      plantingDate,
      expectedHarvestDate: harvestDate,
      areaSize: areaSize || '2 هكتار',
      count: parseInt(count, 10) || 100,
      status: 'growing',
      growthStage: 'مرحلة النمو الخضري الأولية',
      growthProgress: 25,
      notes: notes || 'تمت الزراعة بنجاح وفي حالة صحية جيدة.',
      images: [selectedImage],
    });

    setModalVisible(false);
    resetForm();
    Alert.alert('تم بنجاح', 'تمت إضافة المحصول بنجاح لمزرعتك');
  };

  const resetForm = () => {
    setCropName('');
    setAreaSize('');
    setCount('');
    setNotes('');
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>المحاصيل والزراعة</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={20} color="#FFF" />
          <Text style={styles.addBtnText}>إضافة محصول</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {crops.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="leaf-outline" size={60} color="#CBD5E0" />
            <Text style={styles.emptyTitle}>لا يوجد محاصيل مسجلة</Text>
            <Text style={styles.emptySub}>اضغط على "إضافة محصول" للبدء في تتبع النمو ومواعيد الحصاد.</Text>
          </View>
        ) : (
          crops.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.cropCard}
              onPress={() => setSelectedCrop(item)}
              activeOpacity={0.9}
            >
              <Image source={{ uri: item.images[0] || sampleImages[0] }} style={styles.cropImg} />

              <View style={styles.cropBody}>
                <View style={styles.cropHeaderRow}>
                  <Text style={styles.cropName}>{item.name}</Text>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>{item.category}</Text>
                  </View>
                </View>

                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>📅 الزراعة: {item.plantingDate}</Text>
                  <Text style={styles.metaText}>📏 المساحة: {item.areaSize}</Text>
                  <Text style={styles.metaText}>🔢 العدد: {item.count}</Text>
                </View>

                {/* Growth Stage Progress */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>مرحلة النمو: {item.growthStage}</Text>
                    <Text style={styles.progressVal}>{item.growthProgress}%</Text>
                  </View>
                  <View style={styles.progressBarTrack}>
                    <View
                      style={[
                        styles.progressBarFill,
                        { width: `${item.growthProgress}%` },
                      ]}
                    />
                  </View>
                </View>

                <View style={styles.cardFooterRow}>
                  <TouchableOpacity
                    style={styles.detailBtn}
                    onPress={() => setSelectedCrop(item)}
                  >
                    <Text style={styles.detailBtnText}>متابعة المراحل والتفاصيل</Text>
                    <Ionicons name="chevron-back" size={16} color="#2F855A" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert('تأكيد الحذف', 'هل أنت أصلًا متأكد من حذف هذا المحصول؟', [
                        { text: 'إلغاء' },
                        { text: 'حذف', style: 'destructive', onPress: () => deleteCrop(item.id) },
                      ]);
                    }}
                  >
                    <Ionicons name="trash-outline" size={18} color="#E53E3E" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Modal - Add Crop */}
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="#2D3748" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>إضافة محصول جديد</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView contentContainerStyle={styles.modalBody}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>اسم المحصول *</Text>
              <TextInput
                style={styles.input}
                placeholder="مثال: نخيل صقعي، طماطم محمية..."
                value={cropName}
                onChangeText={setCropName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>الفئة *</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map(cat => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.catChip, category === cat && styles.catChipSelected]}
                    onPress={() => setCategory(cat)}
                  >
                    <Text
                      style={[
                        styles.catChipText,
                        category === cat && styles.catChipTextSelected,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.rowTwoInputs}>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>المساحة المزروعة</Text>
                <TextInput
                  style={styles.input}
                  placeholder="مثال: 5 هكتار"
                  value={areaSize}
                  onChangeText={setAreaSize}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>عدد الأشجار/النباتات</Text>
                <TextInput
                  style={styles.input}
                  placeholder="مثال: 350"
                  keyboardType="numeric"
                  value={count}
                  onChangeText={setCount}
                />
              </View>
            </View>

            <View style={styles.rowTwoInputs}>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>تاريخ الزراعة</Text>
                <TextInput
                  style={styles.input}
                  placeholder="2025-01-15"
                  value={plantingDate}
                  onChangeText={setPlantingDate}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>تاريخ الحصاد المتوقع</Text>
                <TextInput
                  style={styles.input}
                  placeholder="2025-08-20"
                  value={harvestDate}
                  onChangeText={setHarvestDate}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>اختر صورة المحصول</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {sampleImages.map((imgUri, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setSelectedImage(imgUri)}
                    style={[
                      styles.imgOption,
                      selectedImage === imgUri && styles.imgOptionSelected,
                    ]}
                  >
                    <Image source={{ uri: imgUri }} style={styles.imgThumb} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>ملاحظات زراعية</Text>
              <TextInput
                style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                placeholder="نوع التربة، الأسمدة المضافة، إلخ..."
                multiline
                value={notes}
                onChangeText={setNotes}
              />
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleCreateCrop}>
              <Text style={styles.saveBtnText}>حفظ المحصول</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Modal - View Crop Details & Growth Stages */}
      {selectedCrop && (
        <Modal visible={!!selectedCrop} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedCrop(null)}>
                <Ionicons name="close" size={24} color="#2D3748" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selectedCrop.name}</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.modalBody}>
              <Image
                source={{ uri: selectedCrop.images[0] || sampleImages[0] }}
                style={styles.detailCover}
              />

              <View style={styles.detailCard}>
                <Text style={styles.detailSectionTitle}>معلومات المحصول</Text>
                <Text style={styles.detailText}>🌱 الفئة: {selectedCrop.category}</Text>
                <Text style={styles.detailText}>📅 تاريخ الزراعة: {selectedCrop.plantingDate}</Text>
                <Text style={styles.detailText}>🌾 الحصاد المتوقع: {selectedCrop.expectedHarvestDate}</Text>
                <Text style={styles.detailText}>📏 المساحة: {selectedCrop.areaSize}</Text>
                <Text style={styles.detailText}>🌳 العدد: {selectedCrop.count} شجرة / نبات</Text>
                <Text style={styles.detailText}>📝 ملاحظات: {selectedCrop.notes}</Text>
              </View>

              {/* Growth Timeline */}
              <View style={styles.detailCard}>
                <Text style={styles.detailSectionTitle}>مراحل النمو والمتابعة الدورية</Text>

                <View style={styles.timelineItem}>
                  <Ionicons name="checkmark-circle" size={22} color="#38A169" />
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitle}>1. مرحلة الإنبات والغرس</Text>
                    <Text style={styles.timelineDesc}>تم التجهيز والري الأولي وإضافة سماد التجذير بنجاح.</Text>
                  </View>
                </View>

                <View style={styles.timelineItem}>
                  <Ionicons name="checkmark-circle" size={22} color="#38A169" />
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitle}>2. مرحلة النمو الخضري (الحالية)</Text>

                    <Text style={styles.timelineDesc}>نمو أوراق سليم وتغذية بالنيتروجين والمواظبة على الري.</Text>
                  </View>
                </View>

                <View style={styles.timelineItem}>
                  <Ionicons name="ellipse-outline" size={22} color="#A0AEC0" />
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitle}>3. مرحلة التزهير وعقد الثمار</Text>
                    <Text style={styles.timelineDesc}>قادمة بعد شهر. يلزم التركيز على البوتاسيوم والفوسفور.</Text>
                  </View>
                </View>

                <View style={styles.timelineItem}>
                  <Ionicons name="ellipse-outline" size={22} color="#A0AEC0" />
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitle}>4. مرحلة الحصاد والتسويق</Text>
                    <Text style={styles.timelineDesc}>جمع المحصول وتجهيز العبوات للبيع في السوق الزراعي.</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.updateProgressBtn}
                onPress={() => {
                  const newProg = Math.min(selectedCrop.growthProgress + 10, 100);
                  updateCrop(selectedCrop.id, { growthProgress: newProg });
                  setSelectedCrop({ ...selectedCrop, growthProgress: newProg });
                  Alert.alert('تم التحديث', `تم رفع نسبة النمو إلى ${newProg}%`);
                }}
              >
                <Text style={styles.updateProgressText}>تحديث نسبة النمو (+10%)</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
      )}
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
    backgroundColor: '#2F855A',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addBtnText: { color: '#FFF', fontSize: 13, fontWeight: 'bold', marginRight: 4 },
  scrollContent: { padding: 16, paddingBottom: 80 },
  emptyBox: { alignItems: 'center', marginTop: 80, paddingHorizontal: 20 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#4A5568', marginTop: 12 },
  emptySub: { fontSize: 13, color: '#718096', textAlign: 'center', marginTop: 6, lineHeight: 20 },
  cropCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cropImg: { width: '100%', height: 140 },
  cropBody: { padding: 14 },
  cropHeaderRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cropName: { fontSize: 16, fontWeight: 'bold', color: '#2D3748' },
  categoryBadge: {
    backgroundColor: '#E6FFFA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryBadgeText: { fontSize: 11, color: '#234E52', fontWeight: 'bold' },
  metaRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  metaText: { fontSize: 12, color: '#4A5568', marginBottom: 4 },
  progressContainer: { marginTop: 4, marginBottom: 12 },
  progressHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: { fontSize: 12, color: '#2F855A', fontWeight: '600' },
  progressVal: { fontSize: 12, color: '#2F855A', fontWeight: 'bold' },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#EDF2F7',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: { height: '100%', backgroundColor: '#38A169', borderRadius: 4 },
  cardFooterRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EDF2F7',
  },
  detailBtn: { flexDirection: 'row-reverse', alignItems: 'center' },
  detailBtnText: { fontSize: 12, color: '#2F855A', fontWeight: 'bold', marginLeft: 4 },
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
  catChip: {
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  catChipSelected: { backgroundColor: '#2F855A' },
  catChipText: { fontSize: 12, color: '#4A5568' },
  catChipTextSelected: { color: '#FFF', fontWeight: 'bold' },
  imgOption: { borderRadius: 8, padding: 2, borderWidth: 2, borderColor: 'transparent', marginLeft: 8 },
  imgOptionSelected: { borderColor: '#2F855A' },
  imgThumb: { width: 60, height: 60, borderRadius: 6 },
  saveBtn: {
    backgroundColor: '#2F855A',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  saveBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  detailCover: { width: '100%', height: 180, borderRadius: 12, marginBottom: 16 },
  detailCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  detailSectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#2D3748', textAlign: 'right', marginBottom: 10 },
  detailText: { fontSize: 13, color: '#4A5568', textAlign: 'right', marginBottom: 6 },
  timelineItem: { flexDirection: 'row-reverse', alignItems: 'flex-start', marginBottom: 14 },
  timelineContent: { marginRight: 10, flex: 1 },
  timelineTitle: { fontSize: 13, fontWeight: 'bold', color: '#2D3748', textAlign: 'right' },
  timelineDesc: { fontSize: 11, color: '#718096', textAlign: 'right', marginTop: 2 },
  updateProgressBtn: {
    backgroundColor: '#2F855A',
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateProgressText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
});
