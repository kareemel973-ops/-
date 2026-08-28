import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface ForgotPasswordScreenProps {
  onBackToLogin: () => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ onBackToLogin }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [sent, setSent] = useState(false);

  const handleReset = () => {
    if (!emailOrPhone.trim()) {
      Alert.alert('تنبيه', 'يرجى إدخال البريد الإلكتروني أو رقم الهاتف');
      return;
    }
    setSent(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableOpacity onPress={onBackToLogin} style={styles.backBtn}>
        <Ionicons name="arrow-forward" size={24} color="#2D3748" />
      </TouchableOpacity>

      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Ionicons name="key-outline" size={36} color="#2F855A" />
        </View>

        <Text style={styles.title}>إعادة ضبط كلمة المرور</Text>

        {!sent ? (
          <>
            <Text style={styles.subText}>
              أدخل البريد الإلكتروني أو رقم الهاتف المرتبط بحسابك، وسنرسل لك رمز التأكيد لإعادة تعيين كلمة المرور.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>البريد الإلكتروني أو رقم الهاتف</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color="#718096" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="0501234567 أو name@email.com"
                  placeholderTextColor="#A0AEC0"
                  value={emailOrPhone}
                  onChangeText={setEmailOrPhone}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.sendBtn} onPress={handleReset}>
              <Text style={styles.sendBtnText}>إرسال رمز التعيين</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.successBox}>
            <Ionicons name="checkmark-circle" size={48} color="#38A169" />
            <Text style={styles.successTitle}>تم إرسال التعليمات!</Text>
            <Text style={styles.successSub}>
              تم إرسال رمز إعادة التعيين إلى ({emailOrPhone}). يرجى مراجعة بريدك أو رسائلك النصية.
            </Text>

            <TouchableOpacity style={styles.sendBtn} onPress={onBackToLogin}>
              <Text style={styles.sendBtnText}>العودة لتسجيل الدخول</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    padding: 20,
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 8,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    alignItems: 'center',
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E6FFFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  subText: {
    fontSize: 13,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
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
  sendBtn: {
    backgroundColor: '#2F855A',
    width: '100%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successBox: {
    alignItems: 'center',
    marginVertical: 10,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#276749',
    marginTop: 12,
    marginBottom: 6,
  },
  successSub: {
    fontSize: 13,
    color: '#4A5568',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
});
