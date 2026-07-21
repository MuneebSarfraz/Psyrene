import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StatusBar, ScreenHeader, SectionHeader, CardSm, Button, Pill, Serif, Body, Small, Tiny, T, Row,
} from '../../components';
import { colors, gradients, radius, fonts } from '../../theme';

const STEPS = [
  { n: 1, title: 'Submit your application', text: 'Fill in a short form about your situation. All information is kept strictly private.' },
  { n: 2, title: 'NGO review', text: 'A partnered NGO reviews your application within 2–3 business days.' },
  { n: 3, title: 'Get matched to a therapist', text: "You'll be matched with a qualified therapist within your approved budget range." },
];
const NGOS = [
  { icon: '🏛️', bg: colors.sageBg, name: 'Umang Foundation', meta: 'Mental health support · Lahore' },
  { icon: '🤝', bg: colors.tealBg, name: 'Rozan Trust', meta: 'Psychosocial support · Nationwide' },
];

export default function FinancialAidScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar />
      <ScreenHeader title="Financial Aid" onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pad}>
          <LinearGradient colors={gradients.light} style={styles.hero}>
            <Text style={{ fontSize: 38, marginBottom: 10 }}>💚</Text>
            <Serif style={{ fontSize: 18, marginBottom: 8, textAlign: 'center', lineHeight: 24 }}>
              Therapy shouldn't be a privilege
            </Serif>
            <Body style={{ textAlign: 'center' }}>
              We partner with NGOs to offer subsidised or fully covered therapy sessions to those who need it most.
            </Body>
          </LinearGradient>
        </View>

        <SectionHeader title="How it works" />
        <View style={{ paddingHorizontal: 20, gap: 8, paddingBottom: 13 }}>
          {STEPS.map((s) => (
            <View key={s.n} style={styles.step}>
              <View style={styles.stepDot}><Text style={styles.stepNum}>{s.n}</Text></View>
              <View style={{ flex: 1 }}>
                <T weight="600" size={11} style={{ marginBottom: 4 }}>{s.title}</T>
                <Small style={{ lineHeight: 18 }}>{s.text}</Small>
              </View>
            </View>
          ))}
        </View>

        <SectionHeader title="Partnered NGOs" />
        <View style={{ paddingHorizontal: 20, gap: 8, paddingBottom: 12 }}>
          {NGOS.map((n) => (
            <CardSm key={n.name}>
              <Row style={{ gap: 12 }}>
                <View style={[styles.ngoIcon, { backgroundColor: n.bg }]}><Text style={{ fontSize: 20 }}>{n.icon}</Text></View>
                <View style={{ flex: 1 }}>
                  <T weight="600" size={11}>{n.name}</T>
                  <Tiny style={{ marginTop: 4 }}>{n.meta}</Tiny>
                </View>
                <Pill tone="sage" textStyle={{ fontSize: 10 }}>Active</Pill>
              </Row>
            </CardSm>
          ))}
        </View>

        {/* Requested change: single button "Browse subscribed therapists" → Therapists */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 24 }}>
          <Button title="Browse subscribed therapists →" onPress={() => navigation.navigate('Therapists')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  pad: { paddingHorizontal: 20, paddingBottom: 12 },
  hero: {
    borderRadius: radius.r3, padding: 22, alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(92,155,116,0.18)',
  },
  step: {
    flexDirection: 'row', gap: 12, alignItems: 'flex-start', padding: 14,
    backgroundColor: colors.surface, borderRadius: radius.r2, borderWidth: 1, borderColor: colors.border,
  },
  stepDot: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: colors.sageBg,
    alignItems: 'center', justifyContent: 'center',
  },
  stepNum: { fontFamily: fonts.sansSemiBold, fontSize: 12, color: colors.sage },
  ngoIcon: { width: 40, height: 40, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
});
