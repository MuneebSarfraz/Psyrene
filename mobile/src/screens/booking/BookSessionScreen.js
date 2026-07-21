import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StatusBar, ScreenHeader, Card, CardSm, Button, Label, Small, T, Row, RowSB, Toast,
} from '../../components';
import { colors, radius, fonts } from '../../theme';

const TYPES = [
  { icon: '📹', label: 'Video call', key: 'video' },
  { icon: '🎧', label: 'Audio only', key: 'audio' },
  { icon: '💬', label: 'Text chat', key: 'text' },
];
const SLOTS = ['10:00 AM', '2:00 PM', '4:00 PM', '5:30 PM', '7:00 PM'];
const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
// leading blanks + 1..31 (May 2026 starts on a Friday → 5 blanks)
const CAL = [...Array(5).fill(null), ...Array.from({ length: 31 }, (_, i) => i + 1)];

export default function BookSessionScreen({ navigation, route }) {
  const t = route.params?.therapist || { name: 'Dr. Sarah Ahmed', avatar: '👩‍⚕️' };
  const [type, setType] = useState('video');
  const [slot, setSlot] = useState(1);
  const [selDay, setSelDay] = useState(23);
  const [confirmed, setConfirmed] = useState(false);

  const confirm = () => {
    // Video Call icon path also handled by session type = video button below
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar />
      <ScreenHeader title="Book a Session" onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Therapist strip */}
        <View style={styles.pad}>
          <CardSm>
            <Row style={{ gap: 12 }}>
              <LinearGradient colors={['#D4EBD9', '#C8DED0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.tIcon}>
                <Text style={{ fontSize: 21 }}>{t.avatar || '👩‍⚕️'}</Text>
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <T weight="600">{t.name}</T>
                <Small>PKR 2,500 / session</Small>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Therapists')}>
                <Text style={styles.change}>Change</Text>
              </TouchableOpacity>
            </Row>
          </CardSm>
        </View>

        {/* Session type — Video Call goes to Call Session */}
        <View style={styles.pad}>
          <T weight="600" style={{ marginBottom: 10 }}>Session type</T>
          <Row style={{ gap: 8 }}>
            {TYPES.map((ty) => {
              const on = type === ty.key;
              return (
                <TouchableOpacity
                  key={ty.key}
                  style={{ flex: 1 }}
                  onPress={() => {
                    setType(ty.key);
                    if (ty.key === 'video') navigation.navigate('CallSession');
                  }}
                >
                  <View style={[styles.typeCard, on && styles.typeCardOn]}>
                    <Text style={{ fontSize: 18, marginBottom: 4 }}>{ty.icon}</Text>
                    <Text style={[styles.typeText, on && { color: '#fff' }]}>{ty.label}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Row>
        </View>

        {/* Calendar */}
        <View style={styles.pad}>
          <Card>
            <RowSB style={{ marginBottom: 12 }}>
              <T weight="600">May 2026</T>
              <Row style={{ gap: 8 }}>
                <Text style={styles.navArrow}>‹</Text>
                <Text style={styles.navArrow}>›</Text>
              </Row>
            </RowSB>
            <View style={styles.calGrid}>
              {DAYS.map((d, i) => (
                <Text key={i} style={styles.calHead}>{d}</Text>
              ))}
            </View>
            <View style={styles.calGrid}>
              {CAL.map((d, i) => {
                if (d === null) return <View key={i} style={styles.calCell} />;
                const past = d < 21;
                const today = d === 21;
                const sel = d === selDay;
                return (
                  <TouchableOpacity key={i} style={styles.calCell} disabled={past} onPress={() => setSelDay(d)}>
                    <View style={[styles.calDay, today && styles.calToday, sel && styles.calSel]}>
                      <Text style={[styles.calText, past && { color: colors.t3 }, (today || sel) && { color: '#fff' }]}>{d}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Card>
        </View>

        {/* Times */}
        <View style={styles.pad}>
          <T weight="600" style={{ marginBottom: 10 }}>Available times — May {selDay}</T>
          <View style={styles.slotGrid}>
            {SLOTS.map((s, i) => {
              const on = i === slot;
              return (
                <TouchableOpacity key={s} style={[styles.slot, on && styles.slotOn]} onPress={() => setSlot(i)}>
                  <Text style={[styles.slotText, on && { color: colors.sage }]}>{s}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Summary */}
        <View style={styles.pad}>
          <View style={styles.summary}>
            <Label style={{ color: colors.sage, marginBottom: 8 }}>Session Summary</Label>
            <RowSB style={{ marginBottom: 6 }}>
              <Small>{t.name}</Small>
              <T weight="600" size={11}>May {selDay} · {SLOTS[slot]}</T>
            </RowSB>
            <RowSB style={{ marginBottom: 6 }}>
              <Small>{type === 'video' ? 'Video' : type === 'audio' ? 'Audio' : 'Text'} · 50 mins</Small>
              <T weight="600" size={11}>PKR 2,500</T>
            </RowSB>
            <View style={styles.hr} />
            <RowSB>
              <T weight="600" size={11}>Total</T>
              <T weight="600" size={15} color={colors.sage}>PKR 2,500</T>
            </RowSB>
          </View>
        </View>

        <View style={[styles.pad, { paddingBottom: 24 }]}>
          <Button title="Confirm booking →" onPress={confirm} />
        </View>
      </ScrollView>
      <Toast visible={confirmed} message="Booking confirmed" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  pad: { paddingHorizontal: 20, paddingBottom: 12 },
  tIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  change: { fontFamily: fonts.sansMedium, fontSize: 11, color: colors.sage },
  typeCard: {
    paddingVertical: 13, borderRadius: radius.r2, alignItems: 'center',
    backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.border,
  },
  typeCardOn: { backgroundColor: colors.sage, borderColor: colors.sage },
  typeText: { fontFamily: fonts.sansMedium, fontSize: 11, color: colors.t2 },
  navArrow: { fontSize: 16, color: colors.t2 },
  calGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  calHead: { width: `${100 / 7}%`, textAlign: 'center', fontFamily: fonts.sans, fontSize: 10, color: colors.t3, marginBottom: 8 },
  calCell: { width: `${100 / 7}%`, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' },
  calDay: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  calToday: { backgroundColor: colors.sage },
  calSel: { backgroundColor: colors.teal },
  calText: { fontFamily: fonts.sansMedium, fontSize: 12, color: colors.t2 },
  slotGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  slot: {
    width: '31%', paddingVertical: 10, backgroundColor: colors.subtle, borderRadius: radius.r1,
    borderWidth: 1.5, borderColor: colors.border, alignItems: 'center',
  },
  slotOn: { backgroundColor: colors.sageBg, borderColor: colors.sage },
  slotText: { fontFamily: fonts.sansMedium, fontSize: 12, color: colors.t2 },
  summary: {
    backgroundColor: colors.sageBg, borderRadius: radius.r3, padding: 16,
    borderWidth: 1, borderColor: 'rgba(92,155,116,0.2)',
  },
  hr: { height: 1, backgroundColor: 'rgba(92,155,116,0.2)', marginVertical: 10 },
});
