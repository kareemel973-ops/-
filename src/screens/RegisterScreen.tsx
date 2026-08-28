import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useApp } from '../context/AppContext';
import { UserType } from '../types';

interface RegisterScreenProps {
  onBackToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onBackToLogin }) => {
  const { registerUser } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [province, setProvince] = useState('الرياض');
  const [userType, setUserType] = useState<UserType>('farmer');
  const [loading, setLoading] = useState(false);

  const provinces = [
    'الرياض',
    'مكة المكرمة',
    'المدينة المنورة',
    'القصيم',
    'المنطقة الشرقية',
    'عسير',
    'تبوك',
    'حائل',
    'الحدود الشمالية',
    'جازان',
    'نجران',
    'الباحة',
    'الجوف',
  ];

  const handleRegister = async () => {
    if (!name.trim()) {
      Alert.alert('خطأ', 'يرجى إدخال الاسم الكامل');
      return;
    }
    if (!phone.trim()) {
      Alert.alert('خطأ', 'يرجى إدخال رقم الهاتف');
      return;
    }
    if (!email.trim()) {
      Alert.alert('خطأ', 'يرجى إدخال البريد الإلكتروني');
      return;
    }
    if (!password || password.length < 6) {
      Alert.alert('خطأ', 'كلمة المرور يجب أن لا تقل عن 6 أحرف');
      return;
    }

    setLoading(true);
    await registerUser({
      name,
      phone,
      email,
      province,
      userType,
    });
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#F7FAFC' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Top bar */}
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={onBackToLogin} style={styles.backButton}>
            <Ionicons name="arrow-forward" size={24} color="#2D3748" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>إنشاء حساب جديد</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.card}>
          <Text style={styles.subTitle}>انضم إلى أضخم مجتمع زراعي ذكي في المملكة والخليج</Text>

          {/* Name Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>الاسم الكامل *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#718096" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="مثال: مهندس أحمد العتيبي"
                placeholderTextColor="#A0AEC0"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          {/* Phone Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>رقم الهاتف *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={20} color="#718096" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="0501234567"
                placeholderTextColor="#A0AEC0"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          {/* Email Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>البريد الإلكتروني *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#718096" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="example@mail.com"
                placeholderTextColor="#A0AEC0"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Password Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>كلمة المرور *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#718096" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#A0AEC0"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          {/* Province Picker */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>المحافظة / المنطقة *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.provinceScroll}>
              {provinces.map(p => (
                <TouchableOpacity
                  key={p}
                  style={[styles.provinceChip, province === p && styles.provinceChipSelected]}
                  onPress={() => setProvince(p)}
                >
                  <Text
                    style={[
                      styles.provinceChipText,
                      province === p && styles.provinceChipTextSelected,
                    ]}
                  >
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* User Type Selector */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>نوع المستخدم *</Text>
            <View style={styles.typeRow}>
              <TouchableOpacity
                style={[styles.typeCard, userType === 'farmer' && styles.typeCardSelected]}
                onPress={() => setUserType('farmer')}
              >
                <Ionicons
                  name="leaf-outline"
                  size={24}
                  color={userType === 'farmer' ? '#2F855A' : '#718096'}
                />
                <Text style={[styles.typeText, userType === 'farmer' && styles.typeTextSelected]}>
                  مزارع
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.typeCard, userType === 'trader' && styles.typeCardSelected]}
                onPress={() => setUserType('trader')}
              >
                <Ionicons
                  name="cart-outline"
                  size={24}
                  color={userType === 'trader' ? '#2F855A' : '#718096'}
                />
                <Text style={[styles.typeText, userType === 'trader' && styles.typeTextSelected]}>
                  تاجر
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.typeCard, userType === 'agri_engineer' && styles.typeCardSelected]}
                onPress={() => setUserType('agri_engineer')}
              >
                <Ionicons
                  name="construct-outline"
                  size={24}
                  color={userType === 'agri_engineer' ? '#2F855A' : '#718096'}
                />
                <Text
                  style={[styles.typeText, userType === 'agri_engineer' && styles.typeTextSelected]}
                >
                  مهندس زراعي
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitBtn, loading && styles.btnDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.submitBtnText}>
              {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب الآن'}
            </Text>
          </TouchableOpacity>

          {/* Back to login */}
          <TouchableOpacity onPress={onBackToLogin} style={styles.loginBackLink}>
            <Text style={styles.loginBackText}>لديك حساب بالفعل؟ تسجيل الدخول</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 50,
  },
  topHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  subTitle: {
    fontSize: 13,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 6,
    textAlign: 'right',
  },
  inputWrapper: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    backgroundColor: '#FAFCFE',
    paddingHorizontal: 12,
    height: 48,
  },
  icon: {
    marginLeft: 8,
  },
  input: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    color: '#2D3748',
  },
  provinceScroll: {
    flexDirection: 'row-reverse',
  },
  provinceChip: {
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 8,
  },
  provinceChipSelected: {
    backgroundColor: '#2F855A',
  },
  provinceChipText: {
    fontSize: 13,
    color: '#4A5568',
  },
  provinceChipTextSelected: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  typeRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  typeCard: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#FFF',
  },
  typeCardSelected: {
    borderColor: '#2F855A',
    backgroundColor: '#F0FFF4',
  },
  typeText: {
    fontSize: 12,
    color: '#718096',
    marginTop: 6,
    fontWeight: '600',
  },
  typeTextSelected: {
    color: '#2F855A',
    fontWeight: 'bold',
  },
  submitBtn: {
    backgroundColor: '#2F855A',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  submitBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginBackLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginBackText: {
    color: '#3182CE',
    fontSize: 14,
    fontWeight: '600',
  },
});
