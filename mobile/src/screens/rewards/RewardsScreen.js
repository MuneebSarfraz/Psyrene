import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StatusBar, ScreenHeader, SectionHeader, CardSm, Button, Label, Tiny, Small, T, Row, RowSB,
} from '../../components';
import { colors, gradients, radius, fonts } from '../../theme';

const BADGES = [
  { icon: '🔥', title: '5-Day Streak', earned: true },
  { icon: '🌱', title: 'First Check-in', earned: true },
  { icon: '🧘', title: 'Zen Master', earned: true },
  { icon: '💎', title: '30-Day Streak', earned: false },
  { icon: '🏆', title: 'Top Patient', earned: false },
  { icon: '⭐', title: 'Star Reviewer', earned: false },
];

export default function RewardsScreen({ navigation }) {
  const EARN = [
    { icon: '😊', title: 'Complete daily check-in', pts: '+10 pts · Today', go: () => navigation.navigate('DailyCheckin') },
    { icon: '🌿', title: 'Finish a breathing exercise', pts: '+15 pts', go: () => navigation.navigate('Exercises') },
    { icon: '💬', title: 'Chat with Serenity AI', pts: '+5 pts', go: () => navigation.navigate('AIChat') },
  ];

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar />
      <ScreenHeader title="Rewards" onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pad}>
          <LinearGradient colors={gradients.brand} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.pointsCard}>
            <Label style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>Wellness Points</Label>
            <Text style={styles.points}>1,240</Text>
            <Text style={styles.pointsSub}>+80 pts this week 🌟</Text>
            <View style={styles.nextBox}>
              <RowSB style={{ marginBottom: 6 }}>
                <Text style={styles.nextText}>Next: Free session</Text>
                <Text style={styles.nextText}>1,500 pts</Text>
              </RowSB>
              <View style={styles.track}><View style={[styles.trackFill, { width: '83%' }]} /></View>
            </View>
          </LinearGradient>
        </View>

        <SectionHeader title="Your badges" />
        <View style={styles.badgeGrid}>
          {BADGES.map((b) => (
            <View key={b.title} style={[styles.badge, !b.earned && styles.badgeDim]}>
              <Text style={{ fontSize: 28 }}>{b.icon}</Text>
              <T weight="600" size={11} style={{ textAlign: 'center' }}>{b.title}</T>
              <Tiny style={{ color: b.earned ? colors.sage : colors.t3 }}>{b.earned ? 'Earned!' : 'Locked'}</Tiny>
            </View>
          ))}
        </View>

        <SectionHeader title="Earn more points" />
        <View style={{ paddingHorizontal: 20, gap: 8, paddingBottom: 20 }}>
          {EARN.map((e) => (
            <CardSm key={e.title}>
              <Row style={{ gap: 12 }}>
                <Text style={{ fontSize: 22 }}>{e.icon}</Text>
                <View style={{ flex: 1 }}>
                  <T weight="600" size={11}>{e.title}</T>
                  <Tiny style={{ color: colors.sage, marginTop: 4 }}>{e.pts}</Tiny>
                </View>
                <Button title="Go" onPress={e.go} style={{ width: 'auto' }} textStyle={{ fontSize: 11 }} />
              </Row>
            </CardSm>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  pad: { paddingHorizontal: 20, paddingBottom: 12 },
  pointsCard: { borderRadius: radius.r3, padding: 22, alignItems: 'center' },
  points: { fontFamily: fonts.serif, fontSize: 46, color: '#fff', lineHeight: 48 },
  pointsSub: { fontFamily: fonts.sans, fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 6 },
  nextBox: { width: '100%', backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: radius.r1, padding: 12, marginTop: 14 },
  nextText: { fontFamily: fonts.sans, fontSize: 12, color: '#fff' },
  track: { height: 6, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 3 },
  trackFill: { height: '100%', backgroundColor: '#fff', borderRadius: 3 },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 20, paddingBottom: 12 },
  badge: {
    width: '31%', alignItems: 'center', gap: 5, paddingVertical: 12, paddingHorizontal: 8,
    backgroundColor: colors.surface, borderRadius: radius.r2, borderWidth: 1.5, borderColor: colors.border,
  },
  badgeDim: { opacity: 0.42 },
});
