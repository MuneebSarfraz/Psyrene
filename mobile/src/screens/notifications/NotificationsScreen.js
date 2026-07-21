import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar, ScreenHeader, BottomNav, Label, Small, Tiny, T } from '../../components';
import { colors, fonts } from '../../theme';

const SEED = [
  { id: 'n1', group: 'New', read: false, icon: '📅', bg: colors.sageBg, title: 'Session reminder', text: 'Your session with Dr. Sarah is tomorrow at 4:00 PM.', time: '2 hours ago' },
  { id: 'n2', group: 'New', read: false, icon: '🏆', bg: colors.warmBg, title: 'New badge earned!', text: 'You\'ve earned the "5-Day Streak" badge. Keep going! 🔥', time: '5 hours ago' },
  { id: 'n3', group: 'New', read: false, icon: '😊', bg: colors.tealBg, title: 'Time for your check-in', text: "It's been 24 hours since your last mood log. How are you feeling?", time: '8 hours ago' },
  { id: 'e1', group: 'Earlier', read: true, icon: '📄', bg: colors.subtle, title: 'Session summary ready', text: 'Your AI-generated summary from the May 15 session is ready in Records.', time: '2 days ago' },
  { id: 'e2', group: 'Earlier', read: true, icon: '💚', bg: colors.subtle, title: 'NGO aid application update', text: 'Your application to Umang Foundation has been received and is under review.', time: '3 days ago' },
  { id: 'e3', group: 'Earlier', read: true, icon: '🌿', bg: colors.subtle, title: 'New exercise unlocked', text: 'You\'ve unlocked "Body Scan Meditation" after completing 5 check-ins.', time: '4 days ago' },
];

function NotifRow({ item, onClose }) {
  const unread = !item.read;
  return (
    <View style={[styles.notif, !unread && { opacity: 0.55 }]}>
      {unread ? <View style={styles.dot} /> : <View style={{ width: 8 }} />}
      <View style={[styles.icon, { backgroundColor: item.bg }]}>
        <Text style={{ fontSize: 19 }}>{item.icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <T weight="600" size={11} style={{ marginBottom: 4 }}>{item.title}</T>
        <Small style={{ lineHeight: 17 }}>{item.text}</Small>
        <Tiny style={{ marginTop: 4 }}>{item.time}</Tiny>
      </View>
      <TouchableOpacity style={styles.close} onPress={() => onClose(item.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Ionicons name="close" size={16} color={colors.t3} />
      </TouchableOpacity>
    </View>
  );
}

export default function NotificationsScreen({ navigation }) {
  const [items, setItems] = useState(SEED);

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const closeOne = (id) => setItems((prev) => prev.filter((n) => n.id !== id));

  const groupNew = items.filter((n) => n.group === 'New');
  const groupEarlier = items.filter((n) => n.group === 'Earlier');
  const hasUnread = items.some((n) => !n.read);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar />
      <ScreenHeader
        title="Notifications"
        onBack={() => navigation.goBack()}
        right={
          <TouchableOpacity onPress={markAllRead} disabled={!hasUnread}>
            <Small style={[styles.markRead, !hasUnread && { color: colors.t3 }]}>Mark all read</Small>
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {groupNew.length > 0 && <Label style={styles.group}>New</Label>}
        {groupNew.map((n) => <NotifRow key={n.id} item={n} onClose={closeOne} />)}
        {groupEarlier.length > 0 && <Label style={styles.group}>Earlier</Label>}
        {groupEarlier.map((n) => <NotifRow key={n.id} item={n} onClose={closeOne} />)}
        {items.length === 0 && (
          <View style={styles.emptyWrap}>
            <Text style={{ fontSize: 34, marginBottom: 10 }}>🔕</Text>
            <Small style={{ color: colors.t3 }}>You're all caught up.</Small>
          </View>
        )}
        <View style={{ height: 16 }} />
      </ScrollView>
      <BottomNav active="Profile" navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  markRead: { color: colors.sage, fontFamily: fonts.sansMedium },
  group: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  notif: {
    flexDirection: 'row', gap: 12, alignItems: 'flex-start',
    paddingVertical: 13, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.sage, marginTop: 5 },
  icon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  close: { padding: 2, marginTop: 2 },
  emptyWrap: { alignItems: 'center', justifyContent: 'center', paddingTop: 80 },
});
