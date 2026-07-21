import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StatusBar, ScreenHeader, Card, Pill, Button, Body, Small, Tiny, T, Row, RowSB,
} from '../../components';
import { colors, radius, fonts } from '../../theme';

const SLOTS = ['10:00 AM', '2:00 PM', '4:00 PM', '5:30 PM', '7:00 PM', '8:30 PM'];
const REVIEWS = [
  { name: 'Ayesha K.', text: 'Dr. Sarah made me feel completely at ease. She genuinely listens and offers thoughtful guidance.' },
  { name: 'Zara M.', text: 'Life-changing. I left with real tools to manage my anxiety day to day.' },
];

export default function TherapistDetailScreen({ navigation, route }) {
  const t = route.params?.therapist || { name: 'Dr. Sarah Ahmed', avatar: '👩‍⚕️', grad: ['#D4EBD9', '#C8DED0'] };
  const [slot, setSlot] = useState(1);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar />
      <ScreenHeader title="Therapist Profile" onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pad}>
          <Card style={{ alignItems: 'center', paddingVertical: 22 }}>
            <LinearGradient colors={t.grad || ['#D4EBD9', '#C8DED0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.avatar}>
              <Text style={{ fontSize: 34 }}>{t.avatar || '👩‍⚕️'}</Text>
            </LinearGradient>
            <Text style={styles.name}>{t.name}</Text>
            <Small style={{ marginBottom: 10 }}>Clinical Psychologist · 8 years exp.</Small>
            <Row style={{ justifyContent: 'center', gap: 6, marginBottom: 14 }}>
              <Pill tone="sage">Anxiety</Pill>
              <Pill tone="teal">Depression</Pill>
              <Pill tone="sage">CBT</Pill>
            </Row>
            <Row style={{ justifyContent: 'center', gap: 16 }}>
              <Stat n="4.9" l="Rating" c={colors.sage} />
              <View style={styles.vline} />
              <Stat n="128" l="Reviews" />
              <View style={styles.vline} />
              <Stat n="340" l="Sessions" />
            </Row>
          </Card>
        </View>

        <View style={styles.pad}>
          <Card>
            <T weight="600" style={{ marginBottom: 8 }}>About</T>
            <Body>
              Dr. Ahmed specialises in cognitive-behavioural therapy for anxiety and depression. She creates a warm,
              non-judgmental space where clients feel heard and understood.
            </Body>
          </Card>
        </View>

        <View style={styles.pad}>
          <Card>
            <T weight="600" style={{ marginBottom: 10 }}>Available today</T>
            <View style={styles.slotGrid}>
              {SLOTS.map((s, i) => {
                const dim = i === 5;
                const on = i === slot;
                return (
                  <TouchableOpacity
                    key={s}
                    disabled={dim}
                    onPress={() => setSlot(i)}
                    style={[styles.slot, on && styles.slotOn, dim && { opacity: 0.4 }]}
                  >
                    <Text style={[styles.slotText, on && { color: colors.sage }]}>{s}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Card>
        </View>

        <View style={styles.pad}>
          <Card>
            <RowSB style={{ marginBottom: 10 }}>
              <T weight="600">Reviews</T>
              <Text style={styles.seeAll}>See all</Text>
            </RowSB>
            {REVIEWS.map((r, i) => (
              <View key={r.name} style={[i === 0 && styles.reviewDivider]}>
                <RowSB style={{ marginBottom: 4 }}>
                  <T weight="600" size={11}>{r.name}</T>
                  <Text style={styles.stars}>★★★★★</Text>
                </RowSB>
                <Small style={{ lineHeight: 18 }}>"{r.text}"</Small>
              </View>
            ))}
          </Card>
        </View>

        <View style={[styles.pad, { paddingBottom: 25 }]}>
          <Button title="Book a session →" onPress={() => navigation.navigate('BookSession', { therapist: t })} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Stat = ({ n, l, c }) => (
  <View style={{ alignItems: 'center' }}>
    <T weight="600" size={15} color={c || colors.t1}>{n}</T>
    <Tiny>{l}</Tiny>
  </View>
);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  pad: { paddingHorizontal: 20, paddingBottom: 12 },
  avatar: {
    width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center',
    marginBottom: 12, borderWidth: 3, borderColor: 'rgba(92,155,116,0.2)',
  },
  name: { fontFamily: fonts.serif, fontSize: 19, marginBottom: 4, color: colors.t1 },
  vline: { width: 1, height: 28, backgroundColor: colors.border },
  slotGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  slot: {
    width: '31%', paddingVertical: 10, backgroundColor: colors.subtle, borderRadius: radius.r1,
    borderWidth: 1.5, borderColor: colors.border, alignItems: 'center',
  },
  slotOn: { backgroundColor: colors.sageBg, borderColor: colors.sage },
  slotText: { fontFamily: fonts.sansMedium, fontSize: 12, color: colors.t2 },
  seeAll: { fontFamily: fonts.sansMedium, fontSize: 12, color: colors.sage },
  stars: { color: colors.star, fontSize: 12, letterSpacing: 1 },
  reviewDivider: { paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: colors.border, marginBottom: 10 },
});
