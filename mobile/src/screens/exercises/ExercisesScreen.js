import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StatusBar, ScreenHeader, SectionHeader, Card, Button, ButtonOutline,
  Label, Body, Small, Tiny, T, Row,
} from '../../components';
import { colors, gradients, radius, fonts } from '../../theme';
import { LinearGradient } from 'expo-linear-gradient';

const PHASES = [
  { label: 'Inhale', count: 4, hint: 'Breathe in slowly…' },
  { label: 'Hold', count: 7, hint: 'Hold gently…' },
  { label: 'Exhale', count: 8, hint: 'Release slowly…' },
];
const EXERCISES = [
  { icon: '🧘', bg: colors.tealBg, title: 'Body Scan Meditation', meta: '10 mins · Relaxation' },
  { icon: '📓', bg: colors.warmBg, title: 'Gratitude Journaling', meta: '5 mins · Mood boost' },
  { icon: '🌿', bg: colors.sageBg, title: '5-4-3-2-1 Grounding', meta: '7 mins · Anxiety relief' },
  { icon: '🌙', bg: colors.lavBg, title: 'Sleep Wind-down', meta: '15 mins · Better sleep' },
  { icon: '🎨', bg: colors.tealBg, title: 'Expressive Art Therapy', meta: '20 mins · Self-expression' },
];

export default function ExercisesScreen({ navigation }) {
  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [count, setCount] = useState(4);
  const scale = useRef(new Animated.Value(1)).current;
  const timer = useRef(null);

  useEffect(() => {
    if (!running) return;
    timer.current = setInterval(() => {
      setCount((c) => {
        if (c > 1) return c - 1;
        // current phase just finished
        if (phaseIdx === PHASES.length - 1) {
          // last phase (Exhale) done → one full 4-7-8 round complete, stop
          setRunning(false);
          setPhaseIdx(0);
          scale.setValue(1);
          return PHASES[0].count;
        }
        const next = phaseIdx + 1;
        setPhaseIdx(next);
        return PHASES[next].count;
      });
    }, 1000);
    return () => clearInterval(timer.current);
  }, [running, phaseIdx]);

  useEffect(() => {
    Animated.timing(scale, {
      toValue: PHASES[phaseIdx].label === 'Inhale' ? 1.15 : PHASES[phaseIdx].label === 'Exhale' ? 0.9 : 1.05,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, [phaseIdx]);

  const stop = () => {
    setRunning(false);
    setPhaseIdx(0);
    setCount(4);
    scale.setValue(1);
  };

  const phase = PHASES[phaseIdx];

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar />
      <ScreenHeader title="Guided Exercises" onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pad}>
          <LinearGradient colors={gradients.light} style={styles.featured}>
            <Label style={{ color: colors.sage, marginBottom: 6 }}>✨ Recommended for you</Label>
            <Text style={styles.featTitle}>4-7-8 Breathing</Text>
            <Body style={{ marginBottom: 14 }}>A calming technique to reduce anxiety in minutes.</Body>
            <View style={{ alignItems: 'center', marginBottom: 14 }}>
              <Animated.View style={[styles.breathCircle, { transform: [{ scale }] }]}>
                <Text style={styles.breathLabel}>{phase.label}</Text>
              </Animated.View>
              <Text style={styles.breathCount}>{count}</Text>
              <Tiny style={{ marginTop: 4 }}>{phase.hint}</Tiny>
            </View>
            <Row style={{ gap: 8 }}>
              <Button
                title={running ? '⏸ Pause' : '▶ Start exercise'}
                onPress={() => setRunning((r) => !r)}
                style={{ flex: 1 }}
                textStyle={{ fontSize: 12 }}
              />
              <ButtonOutline title="■" onPress={stop} style={{ width: 'auto', paddingHorizontal: 16, paddingVertical: 10 }} />
            </Row>
          </LinearGradient>
        </View>

        <SectionHeader title="All exercises" />
        <View style={{ paddingHorizontal: 20, gap: 8, paddingBottom: 20 }}>
          {EXERCISES.map((ex) => (
            <TouchableOpacity key={ex.title} activeOpacity={0.85}>
              <View style={styles.exRow}>
                <View style={[styles.exIcon, { backgroundColor: ex.bg }]}>
                  <Text style={{ fontSize: 21 }}>{ex.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <T weight="600" size={11}>{ex.title}</T>
                  <Tiny style={{ marginTop: 4 }}>{ex.meta}</Tiny>
                </View>
                <Text style={{ color: colors.t3 }}>▶</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  pad: { paddingHorizontal: 20, paddingBottom: 12 },
  featured: { borderRadius: radius.r3, padding: 18, borderWidth: 1, borderColor: 'rgba(92,155,116,0.18)' },
  featTitle: { fontFamily: fonts.serif, fontSize: 19, marginBottom: 6, color: colors.t1 },
  breathCircle: {
    width: 78, height: 78, borderRadius: 39, backgroundColor: colors.sageBg,
    borderWidth: 2.5, borderColor: colors.sage, alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  breathLabel: { fontFamily: fonts.sansMedium, fontSize: 12, color: colors.sage },
  breathCount: { fontFamily: fonts.serif, fontSize: 32, color: colors.sage },
  exRow: {
    flexDirection: 'row', gap: 12, alignItems: 'center', paddingVertical: 13, paddingHorizontal: 15,
    backgroundColor: colors.surface, borderRadius: radius.r2, borderWidth: 1, borderColor: colors.border,
  },
  exIcon: { width: 46, height: 46, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
});
