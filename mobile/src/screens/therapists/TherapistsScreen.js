import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  StatusBar, ScreenHeader, BottomNav, DismissKeyboard, Input, Pill, Small, Tiny, T, Row, RowSB,
} from '../../components';
import { colors, shadow, radius, fonts } from '../../theme';

const FILTERS = ['All', 'Clinical', 'Counselling', 'Trauma'];
const THERAPISTS = [
  {
    id: 1, name: 'Dr. Sarah Ahmed', avatar: '👩‍⚕️', grad: ['#D4EBD9', '#C8DED0'],
    stars: 5, rating: '4.9 (128)', specialty: 'Clinical · Counselling · CBT',
    fee: 'PKR 2,500/hr', badge: 'Available today', badgeTone: 'teal',
  },
  {
    id: 2, name: 'Dr. Usman Malik', avatar: '🧑‍⚕️', grad: ['#E2D8EF', '#D8CCEB'],
    stars: 5, rating: '4.8 (95)', specialty: 'Trauma · PTSD · Mindfulness',
    fee: 'PKR 3,000/hr', badge: 'Next: Tomorrow', badgeTone: 'warm',
  },
  {
    id: 3, name: 'Dr. Amna Raza', avatar: '👩‍⚕️', grad: ['#D0E8EF', '#C4DCEB'],
    stars: 4, rating: '4.7 (73)', specialty: 'Counselling · Relationships · Self-worth',
    fee: 'PKR 2,000/hr', badge: 'NGO subsidy', badgeTone: 'lav',
  },
];

const Stars = ({ n }) => (
  <Text style={styles.stars}>{'★'.repeat(n) + '☆'.repeat(5 - n)}</Text>
);

export default function TherapistsScreen({ navigation }) {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const filtered = THERAPISTS.filter((t) => {
    const matchesFilter = filter === 'All' || t.specialty.toLowerCase().includes(filter.toLowerCase());
    const matchesQuery = !q || t.name.toLowerCase().includes(q) || t.specialty.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar />
      <ScreenHeader
        title="Find a Therapist"
        onBack={() => navigation.goBack()}
        right={
          <TouchableOpacity style={styles.bell} onPress={() => navigation.navigate('Notifications')}>
            <Text style={{ fontSize: 14 }}>🔔</Text>
          </TouchableOpacity>
        }
      />
      <DismissKeyboard>
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={15} color={colors.t3} style={styles.searchIcon} />
        <Input
          style={{ paddingLeft: 36 }}
          placeholder="Search by name or specialty…"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.filters}>
        {FILTERS.map((f) => (
          <Pill key={f} tone={filter === f ? 'sage' : 'muted'} onPress={() => setFilter(f)} style={{ paddingHorizontal: 13, paddingVertical: 5 }}>
            {f}
          </Pill>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={{ paddingHorizontal: 20, gap: 10, paddingBottom: 19 }}>
          {filtered.map((t) => (
            <TouchableOpacity key={t.id} activeOpacity={0.85} onPress={() => navigation.navigate('TherapistDetail', { therapist: t })}>
              <View style={styles.tc}>
                <LinearGradient colors={t.grad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.tcAvatar}>
                  <Text style={{ fontSize: 24 }}>{t.avatar}</Text>
                </LinearGradient>
                <View style={{ flex: 1 }}>
                  <RowSB style={{ marginBottom: 4, alignItems: 'flex-start' }}>
                    <T weight="600">{t.name}</T>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Stars n={t.stars} />
                      <Tiny>{t.rating}</Tiny>
                    </View>
                  </RowSB>
                  <Small style={{ marginBottom: 8 }}>{t.specialty}</Small>
                  <Row style={{ gap: 6, flexWrap: 'wrap' }}>
                    <Pill tone="sage" style={styles.smallPill} textStyle={{ fontSize: 10 }}>{t.fee}</Pill>
                    <Pill tone={t.badgeTone} style={styles.smallPill} textStyle={{ fontSize: 10 }}>{t.badge}</Pill>
                  </Row>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          {filtered.length === 0 && (
            <Small style={styles.empty}>No therapists match your search.</Small>
          )}
          <TouchableOpacity onPress={() => navigation.navigate('FinancialAid')}>
            <Small style={styles.aidLink}>
              💚 Need financial aid? <Text style={{ color: colors.sage, fontFamily: fonts.sansMedium }}>Apply for NGO support →</Text>
            </Small>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </DismissKeyboard>
      <BottomNav active="Therapists" navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  bell: {
    width: 34, height: 34, borderRadius: 17, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center',
  },
  searchWrap: { paddingHorizontal: 20, paddingBottom: 10, position: 'relative', justifyContent: 'center' },
  searchIcon: { position: 'absolute', left: 32, zIndex: 2 },
  filters: { flexDirection: 'row', gap: 6, paddingHorizontal: 20, paddingBottom: 12 },
  tc: {
    backgroundColor: colors.surface, borderRadius: radius.r3, padding: 15,
    borderWidth: 1, borderColor: colors.border, flexDirection: 'row', gap: 13,
    alignItems: 'flex-start', ...shadow.sh1,
  },
  tcAvatar: { width: 50, height: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  stars: { color: colors.star, fontSize: 12, letterSpacing: 1 },
  smallPill: { paddingHorizontal: 8, paddingVertical: 3 },
  empty: { textAlign: 'center', paddingVertical: 24, color: colors.t3 },
  aidLink: { textAlign: 'center', paddingVertical: 8, color: colors.t2 },
});
