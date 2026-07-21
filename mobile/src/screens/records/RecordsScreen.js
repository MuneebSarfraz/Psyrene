import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StatusBar, ScreenHeader, BottomNav, CardSm, Pill, Small, Tiny, T, Row, RowSB,
} from '../../components';
import { colors, radius, fonts } from '../../theme';

const STATS = [
  { n: '12', l: 'Sessions', c: colors.sage },
  { n: '8', l: 'Notes', c: colors.teal },
  { n: '3', l: 'Reports', c: colors.warm },
];
const TABS = ['Session notes', 'Prescriptions', 'Reports'];
const NOTES = [
  { name: 'Dr. Sarah Ahmed', meta: 'May 15, 2026 · 45 mins', text: 'Discussed coping strategies for exam anxiety. Introduced cognitive restructuring. Homework: 3 gratitude entries daily.' },
  { name: 'Dr. Sarah Ahmed', meta: 'May 8, 2026 · 50 mins', text: 'Explored root causes of anxiety. Practised breathing. Mood improved from 4/10 to 7/10 during session.' },
  { name: 'Dr. Sarah Ahmed', meta: 'May 1, 2026 · 45 mins', text: 'Initial assessment completed. Key stressors identified. Started Mindfulness Basics program.' },
];

export default function RecordsScreen({ navigation }) {
  const [tab, setTab] = useState('Session notes');
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar />
      <ScreenHeader title="My Records" onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Row style={{ paddingHorizontal: 20, paddingBottom: 12, gap: 8 }}>
          {STATS.map((s) => (
            <View key={s.l} style={styles.stat}>
              <Text style={[styles.statN, { color: s.c }]}>{s.n}</Text>
              <Tiny>{s.l}</Tiny>
            </View>
          ))}
        </Row>

        <Row style={{ paddingHorizontal: 20, paddingBottom: 12, gap: 6 }}>
          {TABS.map((t) => (
            <Pill key={t} tone={tab === t ? 'sage' : 'muted'} onPress={() => setTab(t)} style={{ paddingHorizontal: 13, paddingVertical: 5 }}>
              {t}
            </Pill>
          ))}
        </Row>

        <View style={{ paddingHorizontal: 20, gap: 8, paddingBottom: 20 }}>
          {NOTES.map((n, i) => (
            <View key={i} style={styles.rec}>
              <RowSB style={{ marginBottom: 8, alignItems: 'flex-start' }}>
                <View>
                  <T weight="600" size={11}>{n.name}</T>
                  <Tiny style={{ marginTop: 4 }}>{n.meta}</Tiny>
                </View>
                <Pill tone="sage" style={{ paddingHorizontal: 8, paddingVertical: 3 }} textStyle={{ fontSize: 10 }}>AI summary</Pill>
              </RowSB>
              <Small style={{ lineHeight: 18 }}>{n.text}</Small>
            </View>
          ))}
          <CardSm>
            <Row style={{ gap: 12 }}>
              <Text style={{ fontSize: 26 }}>📄</Text>
              <View style={{ flex: 1 }}>
                <T weight="600" size={11}>Monthly Progress Report</T>
                <Tiny style={{ marginTop: 4 }}>May 2026 · AI Generated</Tiny>
              </View>
              <Text style={{ color: colors.t2, fontSize: 15 }}>↓</Text>
            </Row>
          </CardSm>
        </View>
      </ScrollView>
      <BottomNav active="Records" navigation={navigation} tabs={['Home', 'Progress', 'Chat', 'Records', 'Profile']} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  stat: {
    flex: 1, paddingVertical: 13, backgroundColor: colors.surface, borderRadius: radius.r2,
    alignItems: 'center', borderWidth: 1, borderColor: colors.border,
  },
  statN: { fontFamily: fonts.sansSemiBold, fontSize: 21 },
  rec: { backgroundColor: colors.surface, borderRadius: radius.r2, padding: 15, borderWidth: 1, borderColor: colors.border },
});
