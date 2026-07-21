import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar, Input, Pill, Tiny, Small, T, EmojiCircle } from '../../components';
import { colors, gradients, fonts } from '../../theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';

const FALLBACK = [
  "Thank you for sharing that with me. Can you tell me a little more about it? 💙",
  "I hear you. That sounds like a lot to carry — how has it been affecting you?",
  "That's really valuable to reflect on. What do you think might help right now?",
  "You're doing well just by talking this through. I'm here with you. 🌿",
];

// Simple keyword-based reply so every message gets a response
function botReply(text) {
  const t = text.toLowerCase();
  if (t.includes('anx') || t.includes('worry') || t.includes('nervous'))
    return "Anxiety can feel overwhelming. Try naming three things you can see around you — it gently brings you back to the present. 🌿";
  if (t.includes('breath'))
    return "Let's breathe together: inhale for 4… hold for 7… exhale for 8. I'm right here with you. 🫁";
  if (t.includes('sad') || t.includes('down') || t.includes('depress') || t.includes('low'))
    return "I'm sorry you're feeling low. Your feelings are valid, and you're not alone in this. 💙";
  if (t.includes('thank') || t.includes('helped') || t.includes('better'))
    return "I'm so glad that helped. 🙏 I'm always here whenever you need me.";
  if (t.includes('sleep') || t.includes('tired'))
    return "Rest matters. A short wind-down routine before bed can really help — want me to suggest one? 🌙";
  if (t.includes('exam') || t.includes('deadline') || t.includes('stress') || t.includes('study'))
    return "Deadlines can pile up fast. Let's break it into one small step you can take today. What feels most urgent? ✨";
  return FALLBACK[Math.floor(Math.random() * FALLBACK.length)];
}

export default function AIChatScreen({ navigation }) {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'there';
  const [messages, setMessages] = useState([
    { from: 'bot', text: `Hi ${firstName} 🌿 I'm Serenity, your mental wellness companion. How are you feeling today?` },
  ]);
  const [draft, setDraft] = useState('');
  const scrollRef = useRef(null);

  const send = (text) => {
    const t = (text ?? draft).trim();
    if (!t) return;
    setMessages((m) => [...m, { from: 'user', text: t }]);
    setDraft('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);
    // Serenity replies to every message
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', text: botReply(t) }]);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);
    }, 700);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar />
      {/* Header */}
      <View style={styles.hdr}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={18} color={colors.t2} />
        </TouchableOpacity>
        <EmojiCircle emoji="🤖" size={36} />
        <View style={{ flex: 1 }}>
          <T weight="600">Serenity AI</T>
          <Tiny style={{ color: colors.sage }}>● Online · Here for you</Tiny>
        </View>
        <Text style={{ color: colors.t3, fontSize: 18 }}>⋯</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.msgs}
          contentContainerStyle={{ paddingVertical: 14, gap: 8 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
        >
          <Tiny style={{ textAlign: 'center', marginBottom: 4.5 }}>Today · 09:41 AM</Tiny>
          {messages.map((m, i) =>
            m.from === 'bot' ? (
              <View key={i} style={[styles.bubble, styles.bBot]}>
                <Text style={styles.botText}>{m.text}</Text>
              </View>
            ) : (
              <LinearGradient
                key={i}
                colors={gradients.brand}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.bubble, styles.bUsr]}
              >
                <Text style={styles.usrText}>{m.text}</Text>
              </LinearGradient>
            )
          )}
          <View style={styles.chips}>
            <Pill tone="sage" onPress={() => send('That helped 🙏')}>That helped 🙏</Pill>
            <Pill tone="teal" onPress={() => send('Breathing exercise 🌬️')}>Breathing exercise 🌬️</Pill>
            <Pill tone="muted" onPress={() => send('Anxiety tips')}>Anxiety tips</Pill>
          </View>
        </ScrollView>

        {/* Input */}
        <View style={styles.inputBar}>
          <Input
            style={{ flex: 1, paddingVertical: 11 }}
            placeholder="Talk to me… I'm listening 💙"
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={() => send()}
            returnKeyType="send"
          />
          <TouchableOpacity onPress={() => send()}>
            <EmojiCircle emoji="↑" size={38} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.inputBg },
  hdr: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 20, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.surface,
  },
  back: {
    width: 34, height: 34, borderRadius: 17, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center',
  },
  msgs: { flex: 1, paddingHorizontal: 16 },
  bubble: { maxWidth: '78%', paddingVertical: 11, paddingHorizontal: 15, borderRadius: 18 },
  bBot: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderBottomLeftRadius: 4, alignSelf: 'flex-start',
  },
  bUsr: { borderBottomRightRadius: 4, alignSelf: 'flex-end' },
  botText: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.t1 },
  usrText: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: '#fff' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 },
  inputBar: {
    flexDirection: 'row', gap: 8, alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 10, paddingBottom: Platform.OS === 'ios' ? 24 : 14,
    backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border,
  },
});
