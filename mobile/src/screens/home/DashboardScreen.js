import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StatusBar, BottomNav, Card, CardSm, Pill, Button, ProgressBar,
  Serif, Body, Small, Tiny, T, Row, RowSB, EmojiCircle,
} from '../../components';
import MoodChart from '../../components/MoodChart';
import { colors, gradients, radius, fonts } from '../../theme';
import { useAuth } from '../../context/AuthContext';

const WEEK = [
  { d: 'S', n: 18 }, { d: 'M', n: 19 }, { d: 'T', n: 20 },
  { d: 'W', n: 21, on: true }, { d: 'T', n: 22 }, { d: 'F', n: 23 }, { d: 'S', n: 24 },
];

export default function DashboardScreen({ navigation }) {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'there';
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient colors={gradients.hero} style={styles.hero}>
          <RowSB>
            <View>
              <Tiny style={{ marginBottom: 4 }}>Good morning ✨</Tiny>
              <Serif style={{ fontSize: 24 }}>Hi, {firstName}</Serif>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <EmojiCircle emoji="🌸" size={44} />
            </TouchableOpacity>
          </RowSB>
          <Row style={styles.wstrip}>
            {WEEK.map((w) => (
              <View key={w.n} style={[styles.wday, w.on && styles.wdayOn]}>
                <Text style={[styles.wdayD, w.on && { color: '#fff' }]}>{w.d}</Text>
                <Text style={[styles.wdayN, w.on && { color: '#fff' }]}>{w.n}</Text>
              </View>
            ))}
          </Row>
        </LinearGradient>

        {/* Daily check-in card */}
        <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
          <LinearGradient colors={gradients.light} style={[styles.checkinCard]}>
            <RowSB style={{ marginBottom: 8 }}>
              <T weight="600" size={14}>Daily Check-in</T>
              <Pill tone="sage">Pending</Pill>
            </RowSB>
            <Body style={{ marginBottom: 12.5 }}>
              A few moments of reflection can make a real difference today.
            </Body>
            <Row style={{ gap: 10 }}>
              <Button
                title="Today's check-in →"
                onPress={() => navigation.navigate('DailyCheckin')}
                style={{ flex: 1 }}
                textStyle={{ fontSize: 13 }}
              />
              <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.85} onPress={() => navigation.navigate('Rewards')}>
                <LinearGradient colors={gradients.brand} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.rewardsBtn}>
                  <Text style={styles.rewardsBtnText}>Rewards 🔥</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Row>
          </LinearGradient>
        </View>

        {/* This week's mood */}
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <Card>
            <RowSB style={{ marginBottom: 10 }}>
              <T weight="600">This week's mood</T>
              <TouchableOpacity onPress={() => navigation.navigate('Analytics')}>
                <Text style={styles.seeAll}>View all →</Text>
              </TouchableOpacity>
            </RowSB>
            <MoodChart />
            <Row style={{ gap: 14, marginTop: 8 }}>
              <View>
                <Tiny style={{ marginBottom: 4 }}>Average</Tiny>
                <T weight="600" color={colors.sage}>Good 😊</T>
              </View>
              <View>
                <Tiny style={{ marginBottom: 4 }}>Streak</Tiny>
                <T weight="600" color={colors.warm}>5 days 🔥</T>
              </View>
              <View>
                <Tiny style={{ marginBottom: 4 }}>Best day</Tiny>
                <T weight="600" color={colors.teal}>Friday 🌟</T>
              </View>
            </Row>
          </Card>
        </View>

        {/* Next appointment — Dr. Sarah Ahmed → Join → Call Session */}
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <Card>
            <Row style={{ gap: 12 }}>
              <View style={styles.calIcon}><Text style={{ fontSize: 21 }}>📅</Text></View>
              <View style={{ flex: 1 }}>
                <Tiny style={{ marginBottom: 4 }}>Next session</Tiny>
                <T weight="600" style={{ marginBottom: 4 }}>Dr. Sarah Ahmed</T>
                <Small style={{ color: colors.sage }}>Tomorrow · 4:00 PM · Video</Small>
              </View>
              <TouchableOpacity style={styles.joinBtn} onPress={() => navigation.navigate('CallSession')}>
                <Text style={styles.joinText}>Join</Text>
              </TouchableOpacity>
            </Row>
          </Card>
        </View>

        {/* Your programs */}
        <View style={styles.shRow}>
          <Text style={styles.shTitle}>Your programs</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        <View style={{ paddingHorizontal: 20, gap: 8 }}>
          <ProgramRow emoji="🌱" grad={['#D4EBD9', '#C8DED0']} tag="Anxiety Relief" title="Mindfulness Basics · 3/8" pct={37} />
          <ProgramRow emoji="💙" grad={['#E2D8EF', '#D8CCEB']} tag="Self Worth" title="Building Confidence · 2/7" pct={28} />
        </View>

        {/* Serenity AI CTA → AI Chat */}
        <View style={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 16 }}>
          <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('AIChat')}>
            <View style={styles.aiCta}>
              <View style={styles.aiIcon}><Text style={{ fontSize: 19 }}>🤖</Text></View>
              <View style={{ flex: 1 }}>
                <T weight="600" style={{ marginBottom: 4 }}>Serenity AI</T>
                <Small style={{ color: colors.t2 }}>Available 24/7 · Talk anytime</Small>
              </View>
              <Text style={{ color: colors.teal, fontSize: 18 }}>→</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNav active="Home" navigation={navigation} />
    </SafeAreaView>
  );
}

function ProgramRow({ emoji, grad, tag, title, pct }) {
  return (
    <CardSm>
      <Row style={{ gap: 12 }}>
        <LinearGradient colors={grad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.progIcon}>
          <Text style={{ fontSize: 20 }}>{emoji}</Text>
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <Tiny style={{ marginBottom: 4 }}>{tag}</Tiny>
          <T weight="600" size={12} style={{ marginBottom: 8 }}>{title}</T>
          <ProgressBar pct={pct} />
        </View>
      </Row>
    </CardSm>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  hero: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 18 },
  wstrip: { gap: 4, paddingTop: 12 },
  wday: { flex: 1, alignItems: 'center', gap: 4, paddingVertical: 7, borderRadius: 9 },
  wdayOn: { backgroundColor: colors.sage },
  wdayD: { fontFamily: fonts.sansMedium, fontSize: 9, color: colors.t3 },
  wdayN: { fontFamily: fonts.sansSemiBold, fontSize: 13, color: colors.t3 },
  checkinCard: {
    borderRadius: radius.r3,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(92,155,116,0.2)',
  },
  rewardsBtn: { paddingVertical: 12, borderRadius: radius.r2, alignItems: 'center', justifyContent: 'center' },
  rewardsBtnText: { fontFamily: fonts.sansMedium, fontSize: 13, color: '#fff' },
  seeAll: { fontFamily: fonts.sansMedium, fontSize: 12, color: colors.sage },
  calIcon: {
    width: 44, height: 44, borderRadius: 13, backgroundColor: colors.sageBg,
    alignItems: 'center', justifyContent: 'center',
  },
  joinBtn: { paddingVertical: 7, paddingHorizontal: 12, backgroundColor: colors.sage, borderRadius: 8 },
  joinText: { color: '#fff', fontFamily: fonts.sansSemiBold, fontSize: 11 },
  shRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 14, paddingBottom: 8,
  },
  shTitle: { fontFamily: fonts.sansSemiBold, fontSize: 14, color: colors.t1 },
  progIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  aiCta: {
    backgroundColor: colors.tealBg, borderRadius: radius.r3, padding: 15,
    borderWidth: 1, borderColor: 'rgba(74,140,158,0.18)',
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  aiIcon: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(74,140,158,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
});
