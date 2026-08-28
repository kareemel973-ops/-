import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useApp } from '../context/AppContext';
import { ChatMessage } from '../types';

export const AIAssistantScreen: React.FC = () => {
  const { user } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm_1',
      sender: 'ai',
      text: `أهلاً بك يا ${user?.name || 'مزارعنا العزيز'} في المساعد الزراعي الذكي! 🌿\nأنا جاهز للإجابة على كافة أسئلتك الزراعية، اقتراح برامج الري والتسميد المخصصة، أو تحليل صور المحاصيل.`,
      timestamp: 'الآن',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeMode, setActiveTextMode] = useState<'chat' | 'diagnosis' | 'irrigation'>('chat');

  const suggestedQuestions = [
    'كيف أعالج اصفرار أوراق الطماطم؟',
    'ما هو التوقيت الأمثل لتسميد النخيل؟',
    'اقترح برنامج ري بالتنقيط لمساحة 5 هكتار',
    'ما أفضل مبيد وقائي لفطريات الزيتون؟',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: 'm_' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: 'الآن',
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setLoading(true);

    // AI Simulation Response Logic
    setTimeout(() => {
      let aiResponseText = '';

      if (query.includes('اصفرار') || query.includes('أوراق') || query.includes('أمراض')) {
        aiResponseText =
          'بناءً على الأعراض المذكورة (اصفرار الأوراق):\n1. قد يكون السبب نقص عنصر النيتروجين أو الحديد (ينصح بإضافة شيلات الحديد 50 جرام/شجرة).\n2. تأكد من عدم زيادة الري لتجنب أعفان الجذور.\n3. قم برش سماد ورقي مغذي يحتوي على عناصر صغرى مجففة.';
      } else if (query.includes('ري') || query.includes('برنامج')) {
        aiResponseText =
          'برنامج الري المقترح:\n• الموسم الحالي (الربيع): الري يومياً بمعدل 45 دقيقة صباحاً (الساعة 6:00).\n• كمية المياه: حوالي 35-40 لتر للشجرة يومياً.\n• ينصح بالفحص الدوري لضغط الشبكة لتجنب انسداد النقاطات.';
      } else if (query.includes('تسميد') || query.includes('نخيل')) {
        aiResponseText =
          'توصية التسميد للنخيل:\n• السماد المركب NPK 20-20-20 بمعدل 500 جرام لكل نخلة أسبوعياً.\n• إضافة نترات البوتاسيوم لزيادة حجم الثمار وحلاوتها قبل الحصاد بـ 60 يوماً.';
      } else {
        aiResponseText =
          'بناءً على بيانات التربة والمناخ بالمملكة والخليج:\nتوصيتي لك هي متابعة مستويات رطوبة التربة بانتظام واستخدام أسمدة ذائبة ناتجة عن شركات معتمدة. يمكنك الاستعانة بخبرائنا أو طلب تشخيص الصورة الفوري.';
      }

      const aiMsg: ChatMessage = {
        id: 'm_' + (Date.now() + 1),
        sender: 'ai',
        text: aiResponseText,
        timestamp: 'الآن',
      };

      setMessages(prev => [...prev, aiMsg]);
      setLoading(false);
    }, 1200);
  };

  const handleImageDiagnosisSim = () => {
    Alert.alert(
      'تحليل الصورة بالذكاء الاصطناعي',
      'قم باختيار صورة النبات المصاب لتحديد المرض والحلول فورياً:',
      [
        {
          text: 'صورة ورقة طماطم مصابة',
          onPress: () => simulateImageDiagnosis('طماطم', 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80'),
        },
        {
          text: 'صورة سعف نخيل',
          onPress: () => simulateImageDiagnosis('نخيل', 'https://images.unsplash.com/photo-1598170845058-12ef4a4575c1?auto=format&fit=crop&w=600&q=80'),
        },
        { text: 'إلغاء', style: 'cancel' },
      ]
    );
  };

  const simulateImageDiagnosis = (cropName: string, imgUri: string) => {
    setLoading(true);

    const userMsg: ChatMessage = {
      id: 'm_' + Date.now(),
      sender: 'user',
      text: `فحص صورة محصول ${cropName}`,
      imageUri: imgUri,
      timestamp: 'الآن',
    };

    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const isTomato = cropName === 'طماطم';
      const aiMsg: ChatMessage = {
        id: 'm_' + (Date.now() + 1),
        sender: 'ai',
        text: isTomato
          ? 'تم تحليل الصورة بنجاح بواسطة AI! 🔍\n\nنتيجة التشخيص: مرض البياض الدقيقي (Powdery Mildew)\nنسبة الدقة: 96%'
          : 'تم تحليل الصورة بنجاح بواسطة AI! 🔍\n\nنتيجة التشخيص: بداية إصابة بحلم الغبار (أكاروس النخيل)\nنسبة الدقة: 94%',
        timestamp: 'الآن',
        diagnosisResult: {
          diseaseName: isTomato ? 'Powdery Mildew' : 'Date Palm Mite',
          diseaseNameAr: isTomato ? 'البياض الدقيقي على الخضار' : 'غبار النخيل (حلم الغبار)',
          confidence: isTomato ? 96 : 94,
          severity: isTomato ? 'medium' : 'low',
          treatment: isTomato
            ? ['رش مبيد فطري حوي "توبسين ام" أو "ريدوميل"', 'تقليل نسبة الرطوبة داخل البيوت المحمية', 'تحسين التهوية والتشميس']
            : ['رش الكبريت الميكروني بمعدل 3 جرام/ليتر', 'غسيل العذوق بالماء بضغط قوي قبل الرش'],
          prevention: ['الالتزام بمواعيد الرش الوقائي الدوري', 'تطهير الأدوات المستعملة في التقليم'],
        },
      };

      setMessages(prev => [...prev, aiMsg]);
      setLoading(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <View style={styles.headerInfo}>
          <View style={styles.aiBadgeIcon}>
            <Ionicons name="sparkles" size={18} color="#FFF" />
          </View>
          <View>
            <Text style={styles.topTitle}>المساعد الزراعي الذكي AI</Text>
            <Text style={styles.topSub}>الرد الفوري على الاستشارات وتشخيص النباتات</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.scanBtnHeader} onPress={handleImageDiagnosisSim}>
          <Ionicons name="camera-outline" size={18} color="#FFF" />
          <Text style={styles.scanBtnText}>فحص صورة</Text>
        </TouchableOpacity>
      </View>

      {/* Suggested Quick Question Chips */}
      <View style={styles.chipsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {suggestedQuestions.map((q, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.chipBtn}
              onPress={() => handleSendMessage(q)}
            >
              <Text style={styles.chipText}>{q}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Chat Messages Scroll */}
      <ScrollView contentContainerStyle={styles.chatScroll}>
        {messages.map(msg => (
          <View
            key={msg.id}
            style={[
              styles.msgWrapper,
              msg.sender === 'user' ? styles.msgWrapperUser : styles.msgWrapperAI,
            ]}
          >
            {msg.sender === 'ai' && (
              <View style={styles.aiAvatar}>
                <Ionicons name="leaf" size={16} color="#FFF" />
              </View>
            )}

            <View
              style={[
                styles.msgBubble,
                msg.sender === 'user' ? styles.msgBubbleUser : styles.msgBubbleAI,
              ]}
            >
              {msg.imageUri && (
                <Image source={{ uri: msg.imageUri }} style={styles.msgImage} />
              )}

              <Text
                style={[
                  styles.msgText,
                  msg.sender === 'user' ? styles.msgTextUser : styles.msgTextAI,
                ]}
              >
                {msg.text}
              </Text>

              {/* Diagnosis Details Card */}
              {msg.diagnosisResult && (
                <View style={styles.diagnosisCard}>
                  <View style={styles.diagHeader}>
                    <Text style={styles.diagName}>{msg.diagnosisResult.diseaseNameAr}</Text>

                    <View style={styles.diagSeverityBadge}>
                      <Text style={styles.diagSeverityText}>
                        خطورة: {msg.diagnosisResult.severity === 'high' ? 'عالية' : 'متوسطة'}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.diagSectionTitle}>💊 بروتوكول العلاج الموصى به:</Text>

                  {msg.diagnosisResult.treatment.map((t, i) => (
                    <Text key={i} style={styles.diagItemText}>
                      • {t}
                    </Text>
                  ))}

                  <Text style={[styles.diagSectionTitle, { marginTop: 8 }]}>
                    🛡️ طرق الوقاية المستقبلية:
                  </Text>
                  {msg.diagnosisResult.prevention.map((p, i) => (
                    <Text key={i} style={styles.diagItemText}>
                      • {p}
                    </Text>
                  ))}
                </View>
              )}

              <Text style={styles.msgTime}>{msg.timestamp}</Text>
            </View>
          </View>
        ))}

        {loading && (
          <View style={styles.loadingBubble}>
            <ActivityIndicator size="small" color="#2F855A" />
            <Text style={styles.loadingText}>جاري التحليل الذكي للبيانات...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.cameraIconBtn} onPress={handleImageDiagnosisSim}>
          <Ionicons name="camera" size={22} color="#2F855A" />
        </TouchableOpacity>

        <TextInput
          style={styles.chatInput}
          placeholder="اسأل عن الري، التسميد، الأمراض..."
          placeholderTextColor="#A0AEC0"
          value={inputText}
          onChangeText={setInputText}
          multiline
        />

        <TouchableOpacity style={styles.sendIconBtn} onPress={() => handleSendMessage()}>
          <Ionicons name="send" size={20} color="#FFF" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  topBar: {
    backgroundColor: '#1C4532',
    paddingTop: 50,
    paddingBottom: 14,
    paddingHorizontal: 16,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerInfo: { flexDirection: 'row-reverse', alignItems: 'center' },
  aiBadgeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#38A169',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  topTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFF' },
  topSub: { fontSize: 11, color: '#C6F6D5' },
  scanBtnHeader: {
    backgroundColor: '#2F855A',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  scanBtnText: { color: '#FFF', fontSize: 12, fontWeight: 'bold', marginRight: 4 },
  chipsContainer: { backgroundColor: '#FFF', paddingVertical: 8, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  chipBtn: { backgroundColor: '#EDF2F7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginLeft: 8 },
  chipText: { fontSize: 12, color: '#2D3748' },
  chatScroll: { padding: 16, paddingBottom: 90 },
  msgWrapper: { flexDirection: 'row-reverse', marginBottom: 14, alignItems: 'flex-start' },
  msgWrapperUser: { justifyContent: 'flex-start' },
  msgWrapperAI: { justifyContent: 'flex-end' },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2F855A',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  msgBubble: { maxWidth: '82%', borderRadius: 16, padding: 12 },
  msgBubbleUser: { backgroundColor: '#2F855A', borderBottomRightRadius: 2 },
  msgBubbleAI: { backgroundColor: '#FFF', borderBottomLeftRadius: 2, borderWidth: 1, borderColor: '#E2E8F0' },
  msgImage: { width: 180, height: 120, borderRadius: 10, marginBottom: 8 },
  msgText: { fontSize: 13, lineHeight: 20, textAlign: 'right' },
  msgTextUser: { color: '#FFF' },
  msgTextAI: { color: '#2D3748' },
  msgTime: { fontSize: 10, color: '#A0AEC0', marginTop: 4, textAlign: 'left' },
  loadingBubble: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#FFF', padding: 10, borderRadius: 12, alignSelf: 'center', marginVertical: 10 },
  loadingText: { fontSize: 12, color: '#718096', marginRight: 8 },
  diagnosisCard: {
    backgroundColor: '#FEFCBF',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#D69E2E',
  },
  diagHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  diagName: { fontSize: 13, fontWeight: 'bold', color: '#744210' },
  diagSeverityBadge: { backgroundColor: '#DD6B20', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  diagSeverityText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  diagSectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#744210', marginTop: 4, marginBottom: 2, textAlign: 'right' },
  diagItemText: { fontSize: 11, color: '#54380B', textAlign: 'right', lineHeight: 16 },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  cameraIconBtn: { padding: 8 },
  chatInput: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    maxHeight: 80,
    textAlign: 'right',
    fontSize: 13,
    color: '#2D3748',
    marginHorizontal: 8,
  },
  sendIconBtn: {
    backgroundColor: '#2F855A',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
