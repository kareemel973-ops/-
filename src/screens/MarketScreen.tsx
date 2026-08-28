import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useApp } from '../context/AppContext';
import { MarketItem } from '../types';

export const MarketScreen: React.FC = () => {
  const { marketItems, addMarketItem } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalItem, setDetailModalItem] = useState<MarketItem | null>(null);

  // Form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'crops' | 'fertilizers' | 'seeds' | 'equipment' | 'services'>('crops');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('كجم');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'sell' | 'buy'>('sell');

  const categories = [
    { key: 'all', label: 'الكل' },
    { key: 'crops', label: 'محاصيل وتمور' },
    { key: 'fertilizers', label: 'أسمدة ومبيدات' },
    { key: 'seeds', label: 'بذور ومشتل' },
    { key: 'equipment', label: 'معدات وآليات' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? marketItems
    : marketItems.filter(item => item.category === selectedCategory);

  const handleCreateAd = () => {
    if (!title.trim()) {
      Alert.alert('تنبيه', 'يرجى كتابة عنوان العرض');
      return;
    }
    if (!price || isNaN(Number(price))) {
      Alert.alert('تنبيه', 'يرجى تحديد السعر المطلوب');
      return;
    }

    addMarketItem({
      title,
      category,
      price: parseFloat(price),
      unit,
      sellerName: 'أحمد العتيبي',
      sellerPhone: '0501234567',
      sellerType: 'farmer',
      location: 'الرياض',
      description,
      image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80',
      type,
      date: 'اليوم',
      verifiedSeller: true,
    });

    setModalVisible(false);
    resetForm();
    Alert.alert('نجاح', 'تم نشر العرض بسوق مزرعتي بنجاح!');
  };

  const resetForm = () => {
    setTitle('');
    setPrice('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>السوق الزراعي الإلكتروني</Text>

        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle" size={18} color="#FFF" />
          <Text style={styles.addBtnText}>إضافة عرض / طلب</Text>
        </TouchableOpacity>
      </View>

      {/* Categories Filter Tabs */}
      <View style={styles.catTabsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(c => (
            <TouchableOpacity
              key={c.key}
              style={[
                styles.tabChip,
                selectedCategory === c.key && styles.tabChipSelected,
              ]}
              onPress={() => setSelectedCategory(c.key)}
            >
              <Text
                style={[
                  styles.tabChipText,
                  selectedCategory === c.key && styles.tabChipTextSelected,
                ]}
              >
                {c.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Marketplace Banner */}
        <View style={styles.promoBanner}>
          <Ionicons name="storefront" size={28} color="#276749" />
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.promoTitle}>تداول واشترِ بضمان وبدون عمولة خفية</Text>

            <Text style={styles.promoSub}>تواصل مباشر بين المزارعين والتجار والشركات الزراعية</Text>
          </View>
        </View>

        {/* Item Cards List */}
        {filteredItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemCard}
            onPress={() => setDetailModalItem(item)}
            activeOpacity={0.9}
          >
            <Image source={{ uri: item.image }} style={styles.itemImage} />

            <View style={styles.itemBody}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                <View
                  style={[
                    styles.typeBadge,
                    item.type === 'buy' ? styles.typeBadgeBuy : styles.typeBadgeSell,
                  ]}
                >
                  <Text style={styles.typeBadgeText}>
                    {item.type === 'buy' ? 'طلب شراء' : 'عرض للبيع'}
                  </Text>
                </View>
              </View>

              <Text style={styles.itemPrice}>
                {item.price.toLocaleString()} ريال / {item.unit}
              </Text>

              <View style={styles.itemSellerRow}>
                <Ionicons name="person-circle-outline" size={16} color="#718096" />
                <Text style={styles.sellerName}>{item.sellerName}</Text>
                {item.verifiedSeller && (
                  <Ionicons name="checkmark-circle" size={14} color="#3182CE" style={{ marginLeft: 2 }} />
                )}
              </View>

              <View style={styles.itemFooter}>
                <Text style={styles.itemLocation}>📍 {item.location}</Text>
                <TouchableOpacity
                  style={styles.contactBtn}
                  onPress={() => Linking.openURL(`tel:${item.sellerPhone}`)}
                >
                  <Ionicons name="call" size={14} color="#FFF" />
                  <Text style={styles.contactBtnText}>اتصال</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal - Add Listing */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="#2D3748" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>إضافة منتج أو طلب شراء</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView contentContainerStyle={styles.modalBody}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>نوع الإعلان *</Text>
              <View style={styles.typeToggleRow}>
                <TouchableOpacity
                  style={[styles.toggleTypeBtn, type === 'sell' && styles.toggleTypeSelected]}
                  onPress={() => setType('sell')}
                >
                  <Text style={[styles.toggleTypeText, type === 'sell' && styles.toggleTypeTextSelected]}>
                    عرض للبيع
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.toggleTypeBtn, type === 'buy' && styles.toggleTypeSelected]}
                  onPress={() => setType('buy')}
                >
                  <Text style={[styles.toggleTypeText, type === 'buy' && styles.toggleTypeTextSelected]}>
                    طلب شراء
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>عنوان المنتج أو الطلب *</Text>

              <TextInput
                style={styles.input}
                placeholder="مثال: تمر صقعي ممتاز، سماد مركب NPK..."
                value={title}
                onChangeText={setTitle}
              />
            </View>

            <View style={styles.rowTwoInputs}>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>السعر (ريال) *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="22"
                  keyboardType="numeric"
                  value={price}
                  onChangeText={setPrice}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>وحدة القياس</Text>

                <TextInput
                  style={styles.input}
                  placeholder="كجم / كيس / جهاز"
                  value={unit}
                  onChangeText={setUnit}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>الوصف والتفاصيل</Text>

              <TextInput
                style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                placeholder="تفاصيل التعبئة والتوصيل والجودة..."
                multiline
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleCreateAd}>
              <Text style={styles.saveBtnText}>نشر في السوق الزراعي</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Modal - Detail View */}
      {detailModalItem && (
        <Modal visible={!!detailModalItem} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setDetailModalItem(null)}>
                <Ionicons name="close" size={24} color="#2D3748" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>تفاصيل العرض</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.modalBody}>
              <Image source={{ uri: detailModalItem.image }} style={styles.detailImg} />

              <Text style={styles.detailTitle}>{detailModalItem.title}</Text>
              <Text style={styles.detailPrice}>{detailModalItem.price} ريال / {detailModalItem.unit}</Text>

              <View style={styles.sellerDetailCard}>
                <Text style={styles.sellerTitle}>بيانات البائع / التاجر:</Text>
                <Text style={styles.sellerInfoText}>👤 الاسم: {detailModalItem.sellerName}</Text>
                <Text style={styles.sellerInfoText}>📍 الموقع: {detailModalItem.location}</Text>
                <Text style={styles.sellerInfoText}>📞 الهاتف: {detailModalItem.sellerPhone}</Text>
              </View>

              <Text style={styles.descTitle}>الوصف التفصيلي:</Text>
              <Text style={styles.descBody}>{detailModalItem.description}</Text>

              <TouchableOpacity
                style={styles.callBigBtn}
                onPress={() => Linking.openURL(`tel:${detailModalItem.sellerPhone}`)}
              >
                <Ionicons name="call" size={20} color="#FFF" />
                <Text style={styles.callBigBtnText}>تواصل هاتفياً أو عبر واتساب</Text>
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
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addBtnText: { color: '#FFF', fontSize: 12, fontWeight: 'bold', marginRight: 4 },
  catTabsWrapper: { backgroundColor: '#FFF', paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tabChip: { backgroundColor: '#EDF2F7', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, marginLeft: 8 },
  tabChipSelected: { backgroundColor: '#2F855A' },
  tabChipText: { fontSize: 12, color: '#4A5568' },
  tabChipTextSelected: { color: '#FFF', fontWeight: 'bold' },
  scrollContent: { padding: 16, paddingBottom: 80 },
  promoBanner: {
    backgroundColor: '#F0FFF4',
    borderWidth: 1,
    borderColor: '#C6F6D5',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 16,
  },
  promoTitle: { fontSize: 13, fontWeight: 'bold', color: '#22543D', textAlign: 'right' },
  promoSub: { fontSize: 11, color: '#2F855A', textAlign: 'right', marginTop: 2 },
  itemCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row-reverse',
  },
  itemImage: { width: 110, height: 110 },
  itemBody: { flex: 1, padding: 10, justifyContent: 'space-between' },
  itemHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
  itemTitle: { fontSize: 13, fontWeight: 'bold', color: '#2D3748', flex: 1, textAlign: 'right' },
  typeBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 4 },
  typeBadgeSell: { backgroundColor: '#E6FFFA' },
  typeBadgeBuy: { backgroundColor: '#FEEBC8' },
  typeBadgeText: { fontSize: 9, fontWeight: 'bold', color: '#2C7A7B' },
  itemPrice: { fontSize: 14, fontWeight: 'bold', color: '#276749', textAlign: 'right' },
  itemSellerRow: { flexDirection: 'row-reverse', alignItems: 'center' },
  sellerName: { fontSize: 11, color: '#718096', marginRight: 4 },
  itemFooter: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  itemLocation: { fontSize: 11, color: '#718096' },
  contactBtn: { backgroundColor: '#2F855A', flexDirection: 'row-reverse', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  contactBtnText: { color: '#FFF', fontSize: 11, fontWeight: 'bold', marginRight: 4 },
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
  typeToggleRow: { flexDirection: 'row-reverse' },
  toggleTypeBtn: { flex: 1, borderWidth: 1, borderColor: '#CBD5E0', paddingVertical: 10, alignItems: 'center', borderRadius: 8, marginHorizontal: 4 },
  toggleTypeSelected: { borderColor: '#2F855A', backgroundColor: '#E6FFFA' },
  toggleTypeText: { fontSize: 13, color: '#4A5568' },
  toggleTypeTextSelected: { color: '#2F855A', fontWeight: 'bold' },
  saveBtn: { backgroundColor: '#2F855A', height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  saveBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  detailImg: { width: '100%', height: 200, borderRadius: 12, marginBottom: 12 },
  detailTitle: { fontSize: 18, fontWeight: 'bold', color: '#2D3748', textAlign: 'right' },
  detailPrice: { fontSize: 20, fontWeight: 'bold', color: '#276749', textAlign: 'right', marginTop: 4, marginBottom: 14 },
  sellerDetailCard: { backgroundColor: '#FFF', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 14 },
  sellerTitle: { fontSize: 13, fontWeight: 'bold', color: '#2D3748', textAlign: 'right', marginBottom: 6 },
  sellerInfoText: { fontSize: 12, color: '#4A5568', textAlign: 'right', marginBottom: 4 },
  descTitle: { fontSize: 13, fontWeight: 'bold', color: '#2D3748', textAlign: 'right', marginBottom: 4 },
  descBody: { fontSize: 13, color: '#718096', textAlign: 'right', lineHeight: 20, marginBottom: 20 },
  callBigBtn: { backgroundColor: '#276749', height: 50, borderRadius: 10, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center' },
  callBigBtnText: { color: '#FFF', fontSize: 15, fontWeight: 'bold', marginRight: 8 },
});
