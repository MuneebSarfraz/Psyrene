import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Line, Circle, Defs, LinearGradient as SvgGrad, Stop, G, Text as SvgText } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import {
  StatusBar, Card, Pill, Button, Input, Serif, Body, Tiny, Small, T, Toast, DismissKeyboard,
} from '../../components';
import { colors, radius, fonts } from '../../theme';

const MOODS = [
  { e: '😢', l: 'Very low' },
  { e: '😟', l: 'Low' },
  { e: '😐', l: 'Neutral' },
  { e: '🙂', l: 'Good' },
  { e: '😁', l: 'Wonderful' },
];
const ENERGY = ['🌿 Calm', '⚡ Energized', '😴 Tired', '🌀 Anxious', '💤 Low energy', '🎯 Focused'];

export default function DailyCheckinScreen({ navigation }) {
  const [mood, setMood] = useState(2);
  const [energy, setEnergy] = useState(new Set([0]));
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  const toggleEnergy = (i) => {
    setEnergy((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const save = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      navigation.navigate('Dashboard');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar />
      <View style={styles.hdr}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={18} color={colors.t2} />
        </TouchableOpacity>
        <T weight="600" style={{ flex: 1 }}>Daily Check-in</T>
        <Tiny>1 of 3</Tiny>
      </View>
      <View style={styles.progressRow}>
        <View style={[styles.seg, { backgroundColor: colors.sage }]} />
        <View style={styles.seg} />
        <View style={styles.seg} />
      </View>

      <DismissKeyboard>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={{ paddingHorizontal: 20, paddingBottom: 8 }}>
          <Tiny style={{ marginBottom: 6 }}>Wednesday, May 21</Tiny>
          <Serif style={{ fontSize: 21, marginBottom: 6, lineHeight: 27 }}>
            How would you describe your mood right now?
          </Serif>
          <Body>Take a quiet moment and listen to yourself.</Body>
        </View>

        {/* Gauge */}
        <View style={{ alignItems: 'center', paddingVertical: 8 }}>
          <Svg width={220} height={126} viewBox="0 0 220 126">
            <Defs>
              <SvgGrad id="gg" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0%" stopColor="#E05040" />
                <Stop offset="25%" stopColor="#E8A030" />
                <Stop offset="50%" stopColor="#E8D020" />
                <Stop offset="75%" stopColor="#5C9B74" />
                <Stop offset="100%" stopColor="#4A8C9E" />
              </SvgGrad>
            </Defs>
            <Path d="M20 110 A90 90 0 0 1 200 110" fill="none" stroke="#EDE7DE" strokeWidth={16} strokeLinecap="round" />
            <Path d="M20 110 A90 90 0 0 1 200 110" fill="none" stroke="url(#gg)" strokeWidth={16} strokeLinecap="round" />
            <G rotation={-90 + mood * 45} origin="110, 110">
              <Line x1={110} y1={110} x2={110} y2={30} stroke="#1E2530" strokeWidth={2.2} strokeLinecap="round" opacity={0.55} />
              <Circle cx={110} cy={110} r={8} fill="white" stroke="#EDE7DE" strokeWidth={2} />
            </G>
            <SvgText x={110} y={122} textAnchor="middle" fontSize={11} fill="#5E6E7A">
              I feel {MOODS[mood].l}
            </SvgText>
          </Svg>
        </View>

        {/* Emoji picker */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 12 }}>
          <Card>
            <Tiny style={{ textAlign: 'center', marginBottom: 12 }}>Tap to select your mood</Tiny>
            <View style={styles.mojiRow}>
              {MOODS.map((m, i) => (
                <TouchableOpacity key={i} style={styles.mojiItem} onPress={() => setMood(i)}>
                  <View style={[styles.mojiBubble, i === mood && styles.mojiBubbleOn]}>
                    <Text style={{ fontSize: 21 }}>{m.e}</Text>
                  </View>
                  <Text style={styles.mojiLbl}>{m.l}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>
        </View>

        {/* Energy */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 11 }}>
          <Card>
            <T weight="600" style={{ marginBottom: 10 }}>How's your energy?</T>
            <View style={styles.tagWrap}>
              {ENERGY.map((tag, i) => (
                <Pill key={i} tone={energy.has(i) ? 'sage' : 'muted'} onPress={() => toggleEnergy(i)}>
                  {tag}
                </Pill>
              ))}
            </View>
          </Card>
        </View>

        {/* Note */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 12 }}>
          <Card>
            <T weight="600" style={{ marginBottom: 8 }}>
              Anything on your mind? <Text style={{ color: colors.t3, fontFamily: fonts.sans }}>(optional)</Text>
            </T>
            <Input multiline placeholder="Write freely… this is your safe space." value={note} onChangeText={setNote} />
          </Card>
        </View>

        <View style={{ paddingHorizontal: 20, paddingBottom: 24 }}>
          <Button title="Save check-in ✓" onPress={save} />
        </View>
      </ScrollView>
      </DismissKeyboard>
      <Toast visible={saved} message="Check-in saved" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  hdr: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 20, paddingTop: 14, paddingBottom: 10,
  },
  back: {
    width: 34, height: 34, borderRadius: 17, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center',
  },
  progressRow: { flexDirection: 'row', gap: 5, paddingHorizontal: 20, paddingBottom: 12 },
  seg: { height: 3, flex: 1, backgroundColor: colors.subtle, borderRadius: 2 },
  mojiRow: { flexDirection: 'row', justifyContent: 'space-between' },
  mojiItem: { flex: 1, alignItems: 'center', gap: 5 },
  mojiBubble: {
    width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.subtle, borderWidth: 2, borderColor: 'transparent',
  },
  mojiBubbleOn: { backgroundColor: colors.sageBg, borderColor: colors.sage },
  mojiLbl: { fontFamily: fonts.sansMedium, fontSize: 9, color: colors.t3 },
  tagWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
});
