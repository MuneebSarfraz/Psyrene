import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Defs, LinearGradient as SvgGrad, Stop, Text as SvgText } from 'react-native-svg';
import {
  StatusBar, ScreenHeader, BottomNav, Card, Label, Body, Small, Tiny, T,
  Row, RowSB, ProgressBar,
} from '../../components';
import { colors, radius } from '../../theme';

const PERIOD_DATA = {
  Week: {
    moodTitle: 'Mood this week',
    range: '16–22 May 2026',
    chartArea: 'M12,68 C46,56 62,36 94,24 S132,8 164,14 S216,28 270,6 L270,84 L12,84Z',
    chartLine: 'M12,68 C46,56 62,36 94,24 S132,8 164,14 S216,28 270,6',
    dotX: 270, dotY: 6,
    axis: [{ x: 8, l: 'Mon' }, { x: 91, l: 'Wed' }, { x: 174, l: 'Fri' }, { x: 242, l: 'Today', hl: true }],
    emotions: [
      { c: '#5C9B74', l: 'Peaceful', p: '40%' },
      { c: '#4A8C9E', l: 'Grateful', p: '25%' },
      { c: '#C07848', l: 'Anxious', p: '18%' },
      { c: '#EDE7DE', l: 'Other', p: '17%', border: true },
    ],
    insights: [
      { l: 'Sleep quality', v: 'Good · 7.2h', vc: colors.sage, pct: 72, grad: ['#5C9B74', '#4A8C9E'] },
      { l: 'Exercise', v: 'Fair · 3 sessions', vc: colors.warm, pct: 45, grad: ['#C07848', '#E09B6A'] },
      { l: 'Social connection', v: 'Great', vc: colors.teal, pct: 80, grad: ['#4A8C9E', '#6AAFC0'] },
      { l: 'Mindfulness', v: 'Needs work', vc: colors.t2, pct: 24, grad: ['#8B72A8', '#B09CC0'] },
    ],
    insight: "Your mood improves significantly on days you complete your morning check-in — you're 62% more likely to feel good or better.",
  },
  Month: {
    moodTitle: 'Mood this month',
    range: 'May 2026',
    chartArea: 'M12,58 C50,62 70,44 100,48 S150,22 180,30 S232,12 270,20 L270,84 L12,84Z',
    chartLine: 'M12,58 C50,62 70,44 100,48 S150,22 180,30 S232,12 270,20',
    dotX: 270, dotY: 20,
    axis: [{ x: 6, l: 'W1' }, { x: 90, l: 'W2' }, { x: 174, l: 'W3' }, { x: 250, l: 'W4', hl: true }],
    emotions: [
      { c: '#5C9B74', l: 'Peaceful', p: '34%' },
      { c: '#4A8C9E', l: 'Grateful', p: '31%' },
      { c: '#C07848', l: 'Anxious', p: '22%' },
      { c: '#EDE7DE', l: 'Other', p: '13%', border: true },
    ],
    insights: [
      { l: 'Sleep quality', v: 'Great · 7.6h', vc: colors.sage, pct: 84, grad: ['#5C9B74', '#4A8C9E'] },
      { l: 'Exercise', v: 'Good · 14 sessions', vc: colors.warm, pct: 62, grad: ['#C07848', '#E09B6A'] },
      { l: 'Social connection', v: 'Good', vc: colors.teal, pct: 68, grad: ['#4A8C9E', '#6AAFC0'] },
      { l: 'Mindfulness', v: 'Improving', vc: colors.t2, pct: 47, grad: ['#8B72A8', '#B09CC0'] },
    ],
    insight: "Across May your steadiest weeks followed regular check-ins — you logged 21 of 31 days and your average mood rose each week. 🌱",
  },
};

export default function AnalyticsScreen({ navigation }) {
  const [period, setPeriod] = useState('Week');
  const data = PERIOD_DATA[period];
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar />
      <ScreenHeader title="Your Progress" onBack={() => navigation.goBack()} />
      <View style={styles.tabs}>
        {['Week', 'Month'].map((p) => (
          <TouchableOpacity key={p} style={[styles.tab, period === p && styles.tabOn]} onPress={() => setPeriod(p)}>
            <Text style={[styles.tabText, period === p && { color: '#fff' }]}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pad}>
          <Card>
            <T weight="600" style={{ marginBottom: 4 }}>{data.moodTitle}</T>
            <Tiny style={{ marginBottom: 12 }}>{data.range}</Tiny>
            <Svg width="100%" height={84} viewBox="0 0 310 84" preserveAspectRatio="none">
              <Defs>
                <SvgGrad id="ag" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor="#5C9B74" stopOpacity="0.22" />
                  <Stop offset="100%" stopColor="#5C9B74" stopOpacity="0" />
                </SvgGrad>
              </Defs>
              <Path d={data.chartArea} fill="url(#ag)" />
              <Path d={data.chartLine} fill="none" stroke="#5C9B74" strokeWidth={2.2} strokeLinecap="round" />
              <Circle cx={data.dotX} cy={data.dotY} r={10} fill="#5C9B74" opacity={0.15} />
              <Circle cx={data.dotX} cy={data.dotY} r={5} fill="#5C9B74" />
              {data.axis.map((a) => (
                <SvgText
                  key={a.l}
                  x={a.x}
                  y={80}
                  fontSize={8}
                  fill={a.hl ? '#5C9B74' : '#A0AEBB'}
                  fontWeight={a.hl ? '600' : undefined}
                >
                  {a.l}
                </SvgText>
              ))}
            </Svg>
          </Card>
        </View>

        <View style={styles.pad}>
          <Card>
            <T weight="600" style={{ marginBottom: 12 }}>Emotions this {period.toLowerCase()}</T>
            <View style={{ gap: 8 }}>
              {data.emotions.map((e) => (
                <Row key={e.l} style={{ gap: 8 }}>
                  <View style={[styles.dot, { backgroundColor: e.c }, e.border && { borderWidth: 1, borderColor: colors.border }]} />
                  <Small style={{ flex: 1 }}>{e.l}</Small>
                  <Small>{e.p}</Small>
                </Row>
              ))}
            </View>
          </Card>
        </View>

        <View style={styles.pad}>
          <Card>
            <T weight="600" style={{ marginBottom: 12 }}>Recovery insights</T>
            <View style={{ gap: 12 }}>
              {data.insights.map((it) => (
                <View key={it.l}>
                  <RowSB style={{ marginBottom: 5 }}>
                    <Small>{it.l}</Small>
                    <Small style={{ color: it.vc }}>{it.v}</Small>
                  </RowSB>
                  <ProgressBar pct={it.pct} gradient={it.grad} />
                </View>
              ))}
            </View>
          </Card>
        </View>

        <View style={[styles.pad, { paddingBottom: 20 }]}>
          <View style={styles.insight}>
            <Label style={{ color: colors.sage, marginBottom: 8 }}>✨ AI Insight</Label>
            <Body>{data.insight}</Body>
          </View>
        </View>
      </ScrollView>
      <BottomNav active="Progress" navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  pad: { paddingHorizontal: 20, paddingBottom: 10 },
  tabs: { flexDirection: 'row', gap: 5, paddingHorizontal: 20, paddingBottom: 12 },
  tab: {
    flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: radius.r1,
    backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.border,
  },
  tabOn: { backgroundColor: colors.sage, borderColor: colors.sage },
  tabText: { fontFamily: 'DMSans-Medium', fontSize: 12, color: colors.t2 },
  dot: { width: 9, height: 9, borderRadius: 5 },
  insight: {
    backgroundColor: colors.tealBg, borderRadius: radius.r3, padding: 16,
    borderWidth: 1, borderColor: 'rgba(74,140,158,0.2)',
  },
});
