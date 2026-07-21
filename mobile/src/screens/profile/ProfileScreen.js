import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StatusBar, BottomNav, Card, Pill, ButtonOutline, ProgressBar,
  Serif, Small, Tiny, Label, T, Row,
} from '../../components';
import { colors, gradients, radius, fonts } from '../../theme';
import { useAuth } from '../../context/AuthContext';

function MenuRow({ icon, label, right, onPress, first, last }) {
  return (
    <TouchableOpacity activeOpacity={onPress ? 0.7 : 1} onPress={onPress}>
      <View style={[styles.mrow, first && styles.mrowFirst, last && styles.mrowLast]}>
        <Text style={{ fontSize: 18 }}>{icon}</Text>
        <Small style={{ flex: 1 }}>{label}</Small>
        {right}
      </View>
    </TouchableOpacity>
  );
}

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  const signOut = async () => {
    await logout();
    navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar />
      <LinearGradient colors={gradients.hero} style={styles.header}>
        <LinearGradient colors={gradients.brand} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.avatar}>
          <Text style={{ fontSize: 31 }}>🌸</Text>
        </LinearGradient>
        <Serif style={{ fontSize: 20, marginBottom: 4 }}>{user?.name || 'Guest'}</Serif>
        <Small style={{ marginBottom: 10 }}>
          {user?.email ? `${user.email} · ` : ''}Patient · Member since Jan 2026
        </Small>
        <Row style={{ gap: 6, justifyContent: 'center' }}>
          <Pill tone="sage">5-day streak 🔥</Pill>
          <Pill tone="teal">12 sessions</Pill>
        </Row>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Wellness score */}
        <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12 }}>
          <Card style={{ alignItems: 'center' }}>
            <Tiny style={{ marginBottom: 8 }}>Wellness score</Tiny>
            <Serif style={{ fontSize: 50, color: colors.sage, lineHeight: 52 }}>72</Serif>
            <Small style={{ marginVertical: 6 }}>+8 points from last month 📈</Small>
            <ProgressBar pct={72} height={7} style={{ width: '100%' }} />
          </Card>
        </View>

        {/* Preferences — Therapy goals replaced with My records → Records */}
        <View style={{ paddingHorizontal: 20 }}>
          <Label style={{ marginBottom: 8 }}>Preferences</Label>
          <MenuRow
            first
            icon="📄"
            label="My records"
            right={<Text style={styles.chev}>›</Text>}
            onPress={() => navigation.navigate('Records')}
          />
          <MenuRow
            icon="🔔"
            label="Notifications"
            right={<Pill tone="sage" style={styles.tag} textStyle={{ fontSize: 10 }}>3 new</Pill>}
            onPress={() => navigation.navigate('Notifications')}
          />
          <MenuRow last icon="🔒" label="Privacy & data" right={<Text style={styles.chev}>›</Text>} onPress={() => {}} />
        </View>

        {/* Support */}
        <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
          <Label style={{ marginBottom: 8 }}>Support</Label>
          <MenuRow
            first
            icon="💚"
            label="NGO financial aid"
            right={<Pill tone="sage" style={styles.tag} textStyle={{ fontSize: 10 }}>Apply</Pill>}
            onPress={() => navigation.navigate('FinancialAid')}
          />
          <MenuRow icon="❓" label="Help & FAQ" right={<Text style={styles.chev}>›</Text>} onPress={() => {}} />
          <MenuRow last icon="⭐" label="Rate Psyrene" right={<Text style={styles.chev}>›</Text>} onPress={() => {}} />
        </View>

        <View style={{ paddingHorizontal: 20, paddingVertical: 14, paddingBottom: 28 }}>
          <ButtonOutline
            title="Sign out"
            onPress={signOut}
            style={{ borderColor: 'rgba(224,80,80,0.2)' }}
            textStyle={{ color: colors.danger }}
          />
        </View>
      </ScrollView>
      <BottomNav active="Profile" navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  header: { paddingHorizontal: 20, paddingTop: 26, paddingBottom: 22, alignItems: 'center' },
  avatar: {
    width: 70, height: 70, borderRadius: 35, alignItems: 'center', justifyContent: 'center',
    marginBottom: 11, borderWidth: 4, borderColor: 'rgba(255,255,255,0.8)',
  },
  mrow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 15, paddingHorizontal: 20, backgroundColor: colors.surface,
    borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 1, borderColor: colors.border,
  },
  mrowFirst: { borderTopLeftRadius: radius.r2, borderTopRightRadius: radius.r2 },
  mrowLast: { borderBottomWidth: 1, borderBottomLeftRadius: radius.r2, borderBottomRightRadius: radius.r2 },
  chev: { color: colors.t3, fontSize: 16 },
  tag: { paddingHorizontal: 8, paddingVertical: 2 },
});
