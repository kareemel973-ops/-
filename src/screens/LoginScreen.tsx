import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useApp } from '../context/AppContext';

interface LoginScreenProps {
  onNavigateRegister: () => void;
  onNavigateForgotPassword: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigateRegister,
  onNavigateForgotPassword,
}) => {
  const { login, guestLogin } = useApp();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!emailOrPhone.trim()) {
      Alert.alert('تنبيه', 'يرجى إدخال البريد الإلكتروني أو رقم الهاتف');
      return;
    }
    if (!password) {
      Alert.alert('تنبيه', 'يرجى إدخال كلمة المرور');
      return;
    }

    setLoading(true);
    await login(emailOrPhone, password);
    setLoading(false);
  };

  const handleGoogleLogin = () => {
    Alert.alert(
      'تسجيل الدخول مع Google',
      'سيتم توجيهك إلى حساب Google لتسجيل الدخول الفوري بنجاح.',
      [
        {
          text: 'موافق',
          onPress: () => login('google_user@gmail.com', 'google_pass'),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#F7FAFC' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Top Header Card */}
        <View style={styles.headerBox}>
          <View style={styles.logoCircle}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=300&q=80' }}
              style={styles.logoImg}
            />
          </View>
          <Text style={styles.brandTitle}>مزرعتي</Text>
          <Text style={styles.brandSub}>أهلاً بك مجدداً في منصة الذكاء الزراعي</Text>
        </View>

        {/* Form Container */}
        <View style={styles.formCard}>
          <Text style={styles.loginTitle}>تسجيل الدخول</Text>

          {/* Email/Phone Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>البريد الإلكتروني أو رقم الهاتف</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#718096" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="مثال: 0501234567 أو name@email.com"
                placeholderTextColor="#A0AEC0"
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>كلمة المرور</Text>
            <View style={styles.inputWrapper}>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#718096"
                />
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#A0AEC0"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <Ionicons name="lock-closed-outline" size={20} color="#718096" style={styles.inputIcon} />
            </View>
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity style={styles.forgotBtn} onPress={onNavigateForgotPassword}>
            <Text style={styles.forgotText}>نسيت كلمة المرور؟</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.primaryBtn, loading && styles.btnDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.primaryBtnText}>
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" style={{ marginRight: 8 }} />
          </TouchableOpacity>

          {/* Guest Access Button */}
          <TouchableOpacity style={styles.guestBtn} onPress={guestLogin}>
            <Ionicons name="person-outline" size={18} color="#2F855A" />
            <Text style={styles.guestBtnText}>الدخول كضيف (بدون حساب)</Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>أو</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Login Button */}
          <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleLogin}>
            <Ionicons name="logo-google" size={18} color="#DB4437" />
            <Text style={styles.googleBtnText}>تسجيل الدخول بحساب Google</Text>
          </TouchableOpacity>

          {/* Register Callout */}
          <View style={styles.registerFooter}>
            <Text style={styles.noAccountText}>ليس لديك حساب بعد؟ </Text>
            <TouchableOpacity onPress={onNavigateRegister}>
              <Text style={styles.registerLink}>إنشاء حساب جديد</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
  headerBox: {
    backgroundColor: '#276749',
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    marginBottom: 10,
  },
  logoImg: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  brandSub: {
    fontSize: 14,
    color: '#C6F6D5',
    marginTop: 4,
  },
  formCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
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
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 10,
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginLeft: 8,
  },
  eyeIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    color: '#2D3748',
  },
  forgotBtn: {
    alignSelf: 'flex-start',
    marginBottom: 18,
  },
  forgotText: {
    color: '#3182CE',
    fontSize: 13,
    fontWeight: '600',
  },
  primaryBtn: {
    backgroundColor: '#2F855A',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  primaryBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  guestBtn: {
    backgroundColor: '#E6FFFA',
    borderWidth: 1,
    borderColor: '#319795',
    height: 48,
    borderRadius: 10,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  guestBtnText: {
    color: '#234E52',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 6,
  },
  dividerRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginVertical: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#A0AEC0',
    fontSize: 12,
  },
  googleBtn: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFF',
    height: 48,
    borderRadius: 10,
    marginBottom: 20,
  },
  googleBtnText: {
    color: '#2D3748',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  registerFooter: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccountText: {
    fontSize: 14,
    color: '#718096',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2F855A',
  },
});
