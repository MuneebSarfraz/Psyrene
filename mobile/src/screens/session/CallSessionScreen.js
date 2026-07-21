import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { StatusBar, Label } from '../../components';
import { colors, gradients, fonts } from '../../theme';

const fmt = (s) =>
  `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

const CONTROLS = [
  { icon: '🎙️', key: 'mic' },
  { icon: '📷', key: 'cam' },
  { icon: '📵', key: 'end', end: true },
  { icon: '💬', key: 'chat' },
  { icon: '⋯', key: 'more' },
];

export default function CallSessionScreen({ navigation }) {
  const [seconds, setSeconds] = useState(1124); // 00:18:44
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const onControl = (key) => {
    if (key === 'end') navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ExpoStatusBar style="light" />
      <StatusBar dark />
      {/* Top bar */}
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.endEarly}>← End early</Text>
        </TouchableOpacity>
        <View style={styles.livePill}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE · {fmt(seconds)}</Text>
        </View>
        <Text style={styles.more}>⋯</Text>
      </View>

      {/* Session stage */}
      <LinearGradient colors={gradients.session} style={styles.stage}>
        <View style={{ alignItems: 'center' }}>
          <Label style={{ color: 'rgba(255,255,255,0.35)', marginBottom: 14.5 }}>DR. SARAH AHMED</Label>
          <LinearGradient colors={gradients.brand} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.avatar}>
            <Text style={{ fontSize: 40 }}>👩‍⚕️</Text>
          </LinearGradient>
          <Text style={styles.status}>Session in progress…</Text>
        </View>

        {/* PIP self view */}
        <View style={styles.pipWrap}>
          <LinearGradient colors={['#2a3545', '#1a2535']} style={styles.pip}>
            <Text style={{ fontSize: 26 }}>🌸</Text>
          </LinearGradient>
        </View>

        {/* Controls */}
        <View style={styles.ctrlRow}>
          {CONTROLS.map((c) => (
            <TouchableOpacity key={c.key} style={[styles.ctrl, c.end && styles.ctrlEnd]} onPress={() => onControl(c.key)}>
              <Text style={{ fontSize: 20 }}>{c.icon}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0e1520' },
  topbar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 8,
  },
  endEarly: { color: 'rgba(255,255,255,0.4)', fontFamily: fonts.sans, fontSize: 11 },
  livePill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(224,80,80,0.15)', borderWidth: 1, borderColor: 'rgba(224,80,80,0.3)',
    borderRadius: 20, paddingHorizontal: 11, paddingVertical: 4,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.danger },
  liveText: { fontFamily: fonts.sansSemiBold, fontSize: 10, color: '#E08080' },
  more: { fontSize: 17, color: 'rgba(255,255,255,0.3)' },
  stage: {
    flex: 1, alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 30.5, paddingBottom: 26,
  },
  avatar: {
    width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center',
    marginTop: 30,
  },
  status: { fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 14, fontFamily: fonts.sans },
  pipWrap: { width: '100%', alignItems: 'flex-end' },
  pip: {
    width: 72, height: 96, borderRadius: 14, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.15)',
  },
  ctrlRow: { flexDirection: 'row', gap: 14, alignItems: 'center', marginTop: 20 },
  ctrl: {
    width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.15)',
  },
  ctrlEnd: { backgroundColor: colors.danger, borderColor: colors.danger },
});
